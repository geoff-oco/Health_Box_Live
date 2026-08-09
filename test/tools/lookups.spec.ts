import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

describe("lookup tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_lookup_values: maps each type to its Zanda path", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "payment-methods" },
    });
    await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "gender-identities", isActive: true },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/payment-methods",
      query: { page: 1, pageSize: 10 },
    });
    expect(fake.calls[1]).toMatchObject({
      kind: "list",
      path: "/api/v1/gender-identities",
      query: { isActive: true },
    });
  });

  it("list_lookup_values: passes extra fields through only when present", async () => {
    fake.listHandler = () =>
      pageOf([
        { id: 1, name: "Cash", isActive: true, isIntegrated: false },
        { id: 2, name: "Stripe", isActive: true, isIntegrated: true },
      ]);

    const result = await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "payment-methods" },
    });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    expect(payload.type).toBe("payment-methods");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({ id: 1, name: "Cash", isActive: true, isIntegrated: false });

    fake.listHandler = () => pageOf([{ id: 5, name: "VIP", isActive: true }]);
    const plain = payloadOf(
      await client.callTool({
        name: "list_lookup_values",
        arguments: { type: "client-classifications" },
      }),
    );
    expect((plain.items as Array<Record<string, unknown>>)[0]).toEqual({
      id: 5,
      name: "VIP",
      isActive: true,
    });
  });

  it("list_lookup_values: rejects an unknown type via schema validation", async () => {
    const result = await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "star-signs" },
    });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });

  it("list_custom_profile_fields: returns definitions with visible options only", async () => {
    fake.listHandler = () =>
      pageOf([
        {
          id: 21,
          isActive: true,
          name: "Funding type",
          type: "Select",
          options: [
            { value: "NDIS", isVisible: true },
            { value: "Private", isVisible: true },
            { value: "Legacy", isVisible: false },
          ],
          profileRoles: ["Client"],
        },
      ]);

    const result = await client.callTool({
      name: "list_custom_profile_fields",
      arguments: {},
    });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/custom-profile-fields",
    });
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 21,
      name: "Funding type",
      type: "Select",
      options: ["NDIS", "Private"],
      profileRoles: ["Client"],
      isActive: true,
    });
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "sexes" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
