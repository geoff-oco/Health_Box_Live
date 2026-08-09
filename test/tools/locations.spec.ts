import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const LOCATION = {
  id: 3,
  name: "Main Clinic",
  city: "Sydney",
  state: "NSW",
  postalCode: "2000",
  streetAddress: "1 Example St",
  serviceModality: "In Person",
  isActive: true,
  lastModified: "2026-06-01T09:00:00",
};

describe("location tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_locations: happy path with compact summary-first items", async () => {
    fake.listHandler = () => pageOf([LOCATION]);

    const result = await client.callTool({ name: "list_locations", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 3,
      name: "Main Clinic",
      serviceModality: "In Person",
      city: "Sydney",
      state: "NSW",
      isActive: true,
    });
    // The list keeps the street address for get_location only.
    expect(items[0]).not.toHaveProperty("streetAddress");
  });

  it("list_locations: passes filters and pagination through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_locations",
      arguments: { isActive: true, page: 2, pageSize: 5 },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/locations",
      query: { page: 2, pageSize: 5, isActive: true },
    });
  });

  it("get_location: includes the full practice address", async () => {
    fake.getHandler = () => LOCATION;

    const result = await client.callTool({ name: "get_location", arguments: { id: 3 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/locations/3" });
    expect(payload.summary).toContain("Main Clinic");
    expect(payload.location).toMatchObject({
      streetAddress: "1 Example St",
      postalCode: "2000",
    });
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_locations", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
