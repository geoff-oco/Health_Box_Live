import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const SERVICE = {
  id: 11,
  category: "Consultations",
  code: "INIT",
  cost: null,
  deposit: "20.00",
  description: "First appointment with assessment",
  duration: 60,
  isActive: true,
  isAvailableAllLocations: false,
  isTaxable: false,
  lastModified: "2026-05-01T08:00:00",
  name: "Initial Consultation",
  price: "180.00", // Zanda may send money as strings
  locations: [{ id: 3, name: "Main Clinic" }],
  modifiers: ["Telehealth"],
};

describe("billable item tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_billable_items: happy path normalises price to a number", async () => {
    fake.listHandler = () => pageOf([SERVICE]);

    const result = await client.callTool({ name: "list_billable_items", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 11,
      name: "Initial Consultation",
      code: "INIT",
      category: "Consultations",
      price: 180,
      durationMinutes: 60,
      isActive: true,
    });
  });

  it("list_billable_items: passes the isActive filter through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({ name: "list_billable_items", arguments: { isActive: true } });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/billable-items",
      query: { page: 1, pageSize: 10, isActive: true },
    });
  });

  it("get_billable_item: includes description, deposit, and locations", async () => {
    fake.getHandler = () => SERVICE;

    const result = await client.callTool({ name: "get_billable_item", arguments: { id: 11 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/billable-items/11" });
    expect(payload.summary).toContain("Initial Consultation");
    expect(payload.summary).toContain("60 min");
    expect(payload.item).toMatchObject({
      description: "First appointment with assessment",
      deposit: 20,
      isTaxable: false,
      isAvailableAllLocations: false,
      locations: [{ id: 3, name: "Main Clinic" }],
      modifiers: ["Telehealth"],
    });
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_billable_items", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
