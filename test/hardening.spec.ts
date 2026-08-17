import { createExecutionContext, SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import worker from "../src/index";

describe("/mcp hardening", () => {
  it("refuses oversized bodies with 413 before any processing", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: "Bearer test-token-claude",
        "Content-Length": String(200 * 1024),
      },
      body: "x".repeat(200 * 1024),
    });

    expect(response.status).toBe(413);
    const body = await response.json<{ error: string }>();
    expect(body.error).toBe("payload_too_large");
  });

  it("refuses non-MCP methods with 405 and an Allow header", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "PUT",
      headers: { Authorization: "Bearer test-token-claude" },
      body: "{}",
    });

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toContain("POST");
  });

  it("still admits a normal-sized authenticated request", async () => {
    const response = await SELF.fetch("https://example.com/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        Authorization: "Bearer test-token-claude",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "hardening-test", version: "0.0.0" },
        },
      }),
    });

    expect(response.status).toBe(200);
  });
});

describe("misconfiguration responses stay generic (no detail pre-auth)", () => {
  it("a broken env yields 500 with no variable names in the body", async () => {
    const response = await worker.fetch(
      new Request("https://example.com/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      }),
      {} as Env,
      createExecutionContext(),
    );

    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toContain("server_misconfigured");
    expect(text).not.toMatch(/MCP_BEARER_TOKENS|ZANDA_API_KEY|CORS_ALLOWED_ORIGINS|dev\.vars/);
  });
});
