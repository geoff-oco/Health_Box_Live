import { describe, expect, it } from "vitest";
import { EnvError, getConfig, parseBearerTokens, parseCorsAllowedOrigins } from "../src/lib/env";

describe("parseBearerTokens", () => {
  it("parses a single name:token pair, defaulting to full scope", () => {
    const tokens = parseBearerTokens("voiceflow:abc123");

    expect(tokens.size).toBe(1);
    expect(tokens.get("voiceflow")).toEqual({ token: "abc123", scope: "full" });
  });

  it("parses multiple pairs and tolerates surrounding whitespace", () => {
    const tokens = parseBearerTokens(" voiceflow:abc123 , claude:def456 ");

    expect(tokens.size).toBe(2);
    expect(tokens.get("voiceflow")).toEqual({ token: "abc123", scope: "full" });
    expect(tokens.get("claude")).toEqual({ token: "def456", scope: "full" });
  });

  it("parses explicit scopes in name:scope:token entries", () => {
    const tokens = parseBearerTokens("voiceflow:sanitised:abc123,claude:full:def456");

    expect(tokens.get("voiceflow")).toEqual({ token: "abc123", scope: "sanitised" });
    expect(tokens.get("claude")).toEqual({ token: "def456", scope: "full" });
  });

  it("keeps colons inside the token value (a non-scope word is not a scope)", () => {
    const tokens = parseBearerTokens("scripts:top:secret:value");

    expect(tokens.get("scripts")).toEqual({ token: "top:secret:value", scope: "full" });
  });

  it("recognises a scope only as the exact first segment after the name", () => {
    const tokens = parseBearerTokens("kiosk:sanitized:abc123");

    expect(tokens.get("kiosk")).toEqual({ token: "sanitized:abc123", scope: "full" });
  });

  it.each([
    ["empty entry", "voiceflow:abc123,,claude:def456"],
    ["missing colon", "voiceflow-abc123"],
    ["empty name", ":abc123"],
    ["name with invalid characters", "voice flow:abc123"],
    ["empty token", "voiceflow:"],
    ["a scope with an empty token", "voiceflow:sanitised:"],
    ["duplicate name", "voiceflow:abc,voiceflow:def"],
  ])("rejects %s", (_label, raw) => {
    expect(() => parseBearerTokens(raw)).toThrow(EnvError);
  });

  it("never includes a token value in its error messages", () => {
    try {
      parseBearerTokens("voiceflow:supersecret,voiceflow:supersecret");
      expect.unreachable("should have thrown");
    } catch (error) {
      expect((error as Error).message).not.toContain("supersecret");
    }
  });
});

describe("parseCorsAllowedOrigins", () => {
  it("returns [] (CORS off) when unset or blank", () => {
    expect(parseCorsAllowedOrigins(undefined)).toEqual([]);
    expect(parseCorsAllowedOrigins("")).toEqual([]);
    expect(parseCorsAllowedOrigins("   ")).toEqual([]);
  });

  it("parses a comma-separated origin list", () => {
    expect(parseCorsAllowedOrigins("https://a.example.com, http://localhost:5173")).toEqual([
      "https://a.example.com",
      "http://localhost:5173",
    ]);
  });

  it.each([
    ["a path", "https://a.example.com/app"],
    ["a trailing slash", "https://a.example.com/"],
    ["a bare hostname", "a.example.com"],
  ])("rejects an origin with %s", (_label, raw) => {
    expect(() => parseCorsAllowedOrigins(raw)).toThrow(EnvError);
  });
});

describe("getConfig", () => {
  it("fails fast when MCP_BEARER_TOKENS is missing or empty", () => {
    expect(() => getConfig({})).toThrow(EnvError);
    expect(() => getConfig({ MCP_BEARER_TOKENS: "  " })).toThrow(EnvError);
  });

  it("returns validated config when everything is set", () => {
    const config = getConfig({
      MCP_BEARER_TOKENS: "claude:tok1",
      CORS_ALLOWED_ORIGINS: "https://a.example.com",
    });

    expect(config.bearerTokens.get("claude")).toEqual({ token: "tok1", scope: "full" });
    expect(config.corsAllowedOrigins).toEqual(["https://a.example.com"]);
  });
});
