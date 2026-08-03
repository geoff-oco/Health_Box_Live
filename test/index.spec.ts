import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("/health", () => {
  it("responds with status ok", async () => {
    const response = await SELF.fetch("https://example.com/health");

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });
});

describe("unknown routes", () => {
  it("responds with 404", async () => {
    const response = await SELF.fetch("https://example.com/nope");

    expect(response.status).toBe(404);
  });
});
