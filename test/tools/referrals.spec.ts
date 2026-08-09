import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const REFERRAL = {
  id: 55,
  endDate: "2026-12-31",
  isActive: true,
  lastModified: "2026-01-10T09:00:00",
  name: "Dr Sarah Reference",
  providerNumber: "1234567A",
  referrerType: "General Practitioner",
  startDate: "2026-01-01",
  client: { id: 42 },
};

describe("referral tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_referrals: happy path with flattened client ID", async () => {
    fake.listHandler = () => pageOf([REFERRAL]);

    const result = await client.callTool({ name: "list_referrals", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 55,
      referrerName: "Dr Sarah Reference",
      referrerType: "General Practitioner",
      providerNumber: "1234567A",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      clientId: 42,
      isActive: true,
    });
  });

  it("list_referrals: passes both date ranges and filters through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_referrals",
      arguments: {
        clientId: 42,
        startDateFrom: "2026-01-01",
        startDateTo: "2026-06-30",
        endDateFrom: "2026-07-01",
        endDateTo: "2026-12-31",
        isActive: true,
      },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/referrals",
      query: {
        page: 1,
        pageSize: 10,
        clientId: 42,
        startDateFrom: "2026-01-01",
        startDateTo: "2026-06-30",
        endDateFrom: "2026-07-01",
        endDateTo: "2026-12-31",
        isActive: true,
      },
    });
  });

  it("rejects an inverted start-date range, naming the fields", async () => {
    const result = await client.callTool({
      name: "list_referrals",
      arguments: { startDateFrom: "2026-06-01", startDateTo: "2026-01-01" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("startDateFrom");
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects an inverted end-date range independently", async () => {
    const result = await client.callTool({
      name: "list_referrals",
      arguments: { endDateFrom: "2026-12-01", endDateTo: "2026-07-01" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("endDateFrom");
    expect(fake.calls).toHaveLength(0);
  });

  it("get_referral: summary names the referrer and validity window", async () => {
    fake.getHandler = () => REFERRAL;

    const result = await client.callTool({ name: "get_referral", arguments: { id: 55 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/referrals/55" });
    expect(payload.summary).toContain("Dr Sarah Reference");
    expect(payload.summary).toContain("2026-12-31");
    expect(payload.referral).toMatchObject({ clientId: 42, providerNumber: "1234567A" });
  });

  it("get_referral: an open-ended referral reads 'open-ended'", async () => {
    fake.getHandler = () => ({ ...REFERRAL, endDate: null });

    const result = await client.callTool({ name: "get_referral", arguments: { id: 55 } });

    expect(payloadOf(result).summary).toContain("open-ended");
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_referrals", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
