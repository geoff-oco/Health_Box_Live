import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const INSURER = {
  id: 9,
  isActive: true,
  lastModified: "2026-03-01T09:00:00",
  name: "Medicare Australia",
  scheme: "Medicare (Aust)",
};

describe("insurer tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_insurers: happy path with compact items", async () => {
    fake.listHandler = () => pageOf([INSURER]);

    const result = await client.callTool({ name: "list_insurers", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 9,
      name: "Medicare Australia",
      scheme: "Medicare (Aust)",
      isActive: true,
    });
  });

  it("list_insurers: passes the isActive filter through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({ name: "list_insurers", arguments: { isActive: false } });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/insurers",
      query: { page: 1, pageSize: 10, isActive: false },
    });
  });

  it("get_insurer: summary names the insurer and scheme", async () => {
    fake.getHandler = () => INSURER;

    const result = await client.callTool({ name: "get_insurer", arguments: { id: 9 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/insurers/9" });
    expect(payload.summary).toContain("Medicare Australia");
    expect(payload.summary).toContain("Medicare (Aust)");
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_insurers", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
