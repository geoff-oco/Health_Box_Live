import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { authenticateBearer, unauthorizedResponse } from "../src/auth/bearer";

import type { BearerToken } from "../src/lib/env";

const TOKENS = new Map<string, BearerToken>([
  ["voiceflow", { token: "test-token-voiceflow", scope: "sanitised" }],
  ["claude", { token: "test-token-claude", scope: "full" }],
]);

function requestWithAuth(header?: string): Request {
  return new Request("https://example.com/mcp", {
    method: "POST",
    headers: header === undefined ? {} : { Authorization: header },
  });
}

describe("authenticateBearer (unit)", () => {
  it("accepts each configured token and reports its name and scope", async () => {
    const voiceflow = await authenticateBearer(
      requestWithAuth("Bearer test-token-voiceflow"),
      TOKENS,
    );
    const claude = await authenticateBearer(requestWithAuth("Bearer test-token-claude"), TOKENS);

    expect(voiceflow).toEqual({ ok: true, tokenName: "voiceflow", scope: "sanitised" });
    expect(claude).toEqual({ ok: true, tokenName: "claude", scope: "full" });
  });

  it("rejects a missing Authorization header", async () => {
    const result = await authenticateBearer(requestWithAuth(), TOKENS);

    expect(result).toEqual({ ok: false, reason: "missing-header" });
  });

  it("rejects non-Bearer schemes", async () => {
    const result = await authenticateBearer(requestWithAuth("Basic dXNlcjpwdw=="), TOKENS);

    expect(result).toEqual({ ok: false, reason: "not-bearer" });
  });

  it("rejects an unknown token", async () => {
    const result = await authenticateBearer(requestWithAuth("Bearer wrong-token"), TOKENS);

    expect(result).toEqual({ ok: false, reason: "unknown-token" });
  });

  it("rejects a token that is a prefix of a real token", async () => {
    const result = await authenticateBearer(requestWithAuth("Bearer test-token"), TOKENS);

    expect(result).toEqual({ ok: false, reason: "unknown-token" });
  });

  it("accepts case-insensitive scheme and extra whitespace", async () => {
    const result = await authenticateBearer(requestWithAuth("bearer   test-token-claude"), TOKENS);

    expect(result).toEqual({ ok: true, tokenName: "claude", scope: "full" });
  });

  it("revoking one name blocks only that name", async () => {
    const revoked = new Map(TOKENS);
    revoked.delete("voiceflow");

    const voiceflow = await authenticateBearer(
      requestWithAuth("Bearer test-token-voiceflow"),
      revoked,
    );
    const claude = await authenticateBearer(requestWithAuth("Bearer test-token-claude"), revoked);

    expect(voiceflow.ok).toBe(false);
    expect(claude).toEqual({ ok: true, tokenName: "claude", scope: "full" });
  });
});

describe("unauthorizedResponse", () => {
  it("is a clean 401 JSON body with a WWW-Authenticate header", async () => {
    const response = unauthorizedResponse();

    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toContain("Bearer");
    const body = await response.json<{ error: string }>();
    expect(body.error).toBe("unauthorized");
  });
});

describe("/mcp gate (integration)", () => {
  const initializeBody = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "auth-test", version: "0.0.0" },
    },
  });

  function post(headers: Record<string, string>, path = "/mcp"): Promise<Response> {
    return SELF.fetch(`https://example.com${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        ...headers,
      },
      body: initializeBody,
    });
  }

  it("returns 401 without a token", async () => {
    const response = await post({});

    expect(response.status).toBe(401);
    const body = await response.json<{ error: string }>();
    expect(body.error).toBe("unauthorized");
  });

  it("returns 401 with a wrong token", async () => {
    const response = await post({ Authorization: "Bearer nope" });

    expect(response.status).toBe(401);
  });

  it("lets each configured platform token through", async () => {
    const voiceflow = await post({ Authorization: "Bearer test-token-voiceflow" });
    const claude = await post({ Authorization: "Bearer test-token-claude" });

    expect(voiceflow.status).toBe(200);
    expect(claude.status).toBe(200);
  });

  it("keeps /health public", async () => {
    const response = await SELF.fetch("https://example.com/health");

    expect(response.status).toBe(200);
  });
});

describe("scope gate (integration)", () => {
  const post = (path: string, token: string) =>
    SELF.fetch(`https://example.com${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "scope-test", version: "0.0.0" },
        },
      }),
    });

  it("blocks a sanitised token from /mcp with a helpful 403", async () => {
    const response = await post("/mcp", "test-token-kiosk");

    expect(response.status).toBe(403);
    const body = await response.json<{ error: string; message: string }>();
    expect(body.error).toBe("forbidden");
    expect(body.message).toContain("/mcp/sanitised");
  });

  it("lets a sanitised token into /mcp/sanitised", async () => {
    const response = await post("/mcp/sanitised", "test-token-kiosk");

    expect(response.status).toBe(200);
  });

  it("lets a full token into both endpoints", async () => {
    const full = await post("/mcp", "test-token-claude");
    const sanitised = await post("/mcp/sanitised", "test-token-claude");

    expect(full.status).toBe(200);
    expect(sanitised.status).toBe(200);
  });

  it("still 401s an unknown token on the sanitised endpoint", async () => {
    const response = await post("/mcp/sanitised", "nope");

    expect(response.status).toBe(401);
  });
});

describe("/mcp CORS policy (integration)", () => {
  it("preflight from an allowed origin gets CORS headers", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "OPTIONS",
      headers: {
        Origin: "https://allowed.example.com",
        "Access-Control-Request-Method": "POST",
      },
    });

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://allowed.example.com");
    expect(response.headers.get("Access-Control-Allow-Headers")).toContain("Authorization");
  });

  it("preflight from a non-allowed origin gets no CORS headers", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "OPTIONS",
      headers: {
        Origin: "https://evil.example.com",
        "Access-Control-Request-Method": "POST",
      },
    });

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("strips the SDK's permissive CORS headers from real responses", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: "Bearer test-token-claude",
        Origin: "https://evil.example.com",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "cors-test", version: "0.0.0" },
        },
      }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("reflects an allowed origin on real responses", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: "Bearer test-token-claude",
        Origin: "https://allowed.example.com",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "cors-test", version: "0.0.0" },
        },
      }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://allowed.example.com");
  });
});
