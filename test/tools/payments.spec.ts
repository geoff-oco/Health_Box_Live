import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const PAYMENT = {
  id: 77,
  isActive: true,
  lastModified: "2026-06-20T10:00:00",
  notes: "Paid at reception",
  paidBy: "Jane Citizen",
  receivedAt: "2026-06-20",
  total: "150.00", // Zanda may send money as strings
  client: { id: 42, clientNumber: 1042 },
  location: { id: 3, name: "Main Clinic" },
  method: { id: 2, name: "Credit Card" },
};

describe("payment tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_payments: happy path normalises money and flattens IDs", async () => {
    fake.listHandler = () => pageOf([PAYMENT]);

    const result = await client.callTool({ name: "list_payments", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 77,
      receivedAt: "2026-06-20",
      total: 150,
      method: "Credit Card",
      clientId: 42,
      locationId: 3,
      isActive: true,
    });
    expect(items[0]).not.toHaveProperty("paidBy");
  });

  it("list_payments: passes all filters through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_payments",
      arguments: {
        clientId: 42,
        methodId: 2,
        receivedAfter: "2026-06-01",
        receivedBefore: "2026-06-30",
        minAmount: 50,
        maxAmount: 200,
        isActive: true,
      },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/payments",
      query: {
        page: 1,
        pageSize: 10,
        clientId: 42,
        methodId: 2,
        receivedAfter: "2026-06-01",
        receivedBefore: "2026-06-30",
        minAmount: 50,
        maxAmount: 200,
        isActive: true,
      },
    });
  });

  it("rejects an inverted received-date range, naming the fields", async () => {
    const result = await client.callTool({
      name: "list_payments",
      arguments: { receivedAfter: "2026-07-01", receivedBefore: "2026-06-01" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("receivedAfter");
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects an inverted amount range before Zanda is touched", async () => {
    const result = await client.callTool({
      name: "list_payments",
      arguments: { minAmount: 300, maxAmount: 100 },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("minAmount");
    expect(fake.calls).toHaveLength(0);
  });

  it("get_payment: includes payer, notes, and embedded names", async () => {
    fake.getHandler = () => PAYMENT;

    const result = await client.callTool({ name: "get_payment", arguments: { id: 77 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/payments/77" });
    expect(payload.summary).toContain("150");
    expect(payload.summary).toContain("Credit Card");
    expect(payload.payment).toMatchObject({
      paidBy: "Jane Citizen",
      notes: "Paid at reception",
      clientNumber: 1042,
      methodId: 2,
      locationName: "Main Clinic",
    });
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_payments", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
