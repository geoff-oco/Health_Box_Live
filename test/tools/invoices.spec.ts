import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const INVOICE = {
  id: 900,
  emailedAt: null,
  invoiceDate: "2026-06-15",
  invoiceDueDate: "2026-07-15",
  invoiceNumber: "INV-0042",
  isActive: true,
  lastModified: "2026-06-15T12:00:00",
  payableBy: "Client",
  totalCharges: "180.00", // Zanda may send money as strings
  totalPayments: "80.00",
  totalTax: "16.36",
  appointment: { id: 501 },
  location: { id: 3 },
  providedBy: { id: 7 },
  providedTo: { id: 42 },
  referral: null,
  insurers: null,
  invoiceItems: [{ id: 1 }, { id: 2 }],
  invoicePayments: [{ id: 10 }],
};

describe("invoice tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_invoices: happy path normalises money to numbers", async () => {
    fake.listHandler = () => pageOf([INVOICE]);

    const result = await client.callTool({ name: "list_invoices", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toMatchObject({
      id: 900,
      invoiceNumber: "INV-0042",
      totalCharges: 180,
      totalPayments: 80,
      amountOutstanding: 100,
      clientId: 42,
      practitionerId: 7,
    });
  });

  it("list_invoices: passes both date ranges and filters through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_invoices",
      arguments: {
        isPaid: false,
        clientId: 42,
        invoiceDateFrom: "2026-06-01",
        invoiceDateTo: "2026-06-30",
        dueDateFrom: "2026-07-01",
        dueDateTo: "2026-07-31",
      },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/invoices",
      query: {
        page: 1,
        pageSize: 10,
        isPaid: false,
        clientId: 42,
        invoiceDateFrom: "2026-06-01",
        invoiceDateTo: "2026-06-30",
        dueDateFrom: "2026-07-01",
        dueDateTo: "2026-07-31",
      },
    });
  });

  it("rejects an inverted invoice-date range, naming the fields", async () => {
    const result = await client.callTool({
      name: "list_invoices",
      arguments: { invoiceDateFrom: "2026-07-01", invoiceDateTo: "2026-06-01" },
    });
    const payload = payloadOf(result);

    expect(result.isError).toBe(true);
    expect(payload.error).toContain("invoiceDateFrom");
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects an inverted due-date range independently", async () => {
    const result = await client.callTool({
      name: "list_invoices",
      arguments: { dueDateFrom: "2026-08-01", dueDateTo: "2026-07-01" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("dueDateFrom");
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects a malformed date via schema validation", async () => {
    const result = await client.callTool({
      name: "list_invoices",
      arguments: { invoiceDateFrom: "June 1st" },
    });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });

  it("get_invoice: happy path with counts and computed outstanding", async () => {
    fake.getHandler = () => INVOICE;

    const result = await client.callTool({ name: "get_invoice", arguments: { id: 900 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/invoices/900" });
    expect(payload.summary).toContain("INV-0042");
    expect(payload.summary).toContain("100 outstanding");
    const inv = payload.invoice as Record<string, unknown>;
    expect(inv.itemCount).toBe(2);
    expect(inv.paymentCount).toBe(1);
    expect(inv.appointmentId).toBe(501);
    expect(inv.totalTax).toBeCloseTo(16.36);
  });

  it("get_invoice: fully paid summary reads 'fully paid'", async () => {
    fake.getHandler = () => ({ ...INVOICE, totalPayments: "180.00" });

    const result = await client.callTool({ name: "get_invoice", arguments: { id: 900 } });

    expect(payloadOf(result).summary).toContain("fully paid");
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_invoices", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
