import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectSanitisedHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const APPOINTMENT = {
  id: 501,
  date: "2026-07-10",
  startAt: "15:00:00",
  endAt: "16:00:00",
  attendanceState: "Confirmed",
  clientCapacity: "Group Appointment",
  flag: "VIP",
  groupName: "Smith family session",
  isActive: true,
  practitioner: { id: 7 },
  location: { id: 3 },
  clients: [{ id: 42 }, { id: 43 }, { id: 44 }],
  invoices: [{ id: 900 }],
};

const PRACTITIONER = {
  id: 7,
  displayName: "Dr Sarah Chen",
  emailAddress: "sarah@example.com",
  isActive: true,
  jobTitle: "Senior Psychologist",
  legalName: "Sarah Michelle Chen",
  mobileTelephone: "0400 000 000",
  profession: "Psychologist",
  taxId: "12345",
};

describe("sanitised catalogue", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectSanitisedHarness(() => fake);
  });

  it("exposes exactly the sanitised tool set - no client/invoice/payment tools", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name).sort();

    expect(names).toEqual([
      "check_appointments",
      "check_clinic_availability",
      "get_billable_item",
      "get_insurer",
      "get_location",
      "get_practitioner",
      "list_billable_items",
      "list_custom_profile_fields",
      "list_insurers",
      "list_locations",
      "list_lookup_values",
      "list_practitioners",
      "server_info",
    ]);
  });

  it("check_appointments: returns times and a count, never identities", async () => {
    fake.listHandler = () => pageOf([APPOINTMENT]);

    const result = await client.callTool({ name: "check_appointments", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 501,
      date: "2026-07-10",
      startAt: "15:00:00",
      endAt: "16:00:00",
      attendanceState: "Confirmed",
      clientCapacity: "Group Appointment",
      clientCount: 3,
      practitionerId: 7,
      locationId: 3,
      isActive: true,
    });

    const serialised = JSON.stringify(payload);
    expect(serialised).not.toContain("Smith");
    expect(serialised).not.toContain("clientIds");
    expect(serialised).not.toContain("groupName");
    expect(serialised).not.toContain("42");
  });

  it("check_appointments: passes date range and filters, has no clientId param", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "check_appointments",
      arguments: { dateFrom: "2026-07-10", dateTo: "2026-07-10", practitionerId: 7 },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/appointments",
      query: { dateFrom: "2026-07-10", dateTo: "2026-07-10", practitionerId: 7 },
    });

    await client.callTool({ name: "check_appointments", arguments: { clientId: 42 } });
    for (const call of fake.calls) {
      expect(call.query ?? {}).not.toHaveProperty("clientId");
    }
  });

  it("check_appointments: rejects an inverted date range", async () => {
    const result = await client.callTool({
      name: "check_appointments",
      arguments: { dateFrom: "2026-07-11", dateTo: "2026-07-10" },
    });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("dateFrom");
    expect(fake.calls).toHaveLength(0);
  });

  it("practitioner tools: directory fields only, no contact details", async () => {
    fake.listHandler = () => pageOf([PRACTITIONER]);
    fake.getHandler = () => PRACTITIONER;

    const list = payloadOf(await client.callTool({ name: "list_practitioners", arguments: {} }));
    const get = payloadOf(
      await client.callTool({ name: "get_practitioner", arguments: { id: 7 } }),
    );

    const expected = {
      id: 7,
      displayName: "Dr Sarah Chen",
      profession: "Psychologist",
      jobTitle: "Senior Psychologist",
      isActive: true,
    };
    expect((list.items as Array<Record<string, unknown>>)[0]).toEqual(expected);
    expect(get.practitioner).toEqual(expected);
    for (const leaked of ["sarah@example.com", "0400", "Michelle", "12345"]) {
      expect(JSON.stringify(list)).not.toContain(leaked);
      expect(JSON.stringify(get)).not.toContain(leaked);
    }
  });

  it("reused PII-free tools still work unchanged on this catalogue", async () => {
    fake.listHandler = () => pageOf([{ id: 1, name: "Cash", isActive: true }]);

    const result = await client.callTool({
      name: "list_lookup_values",
      arguments: { type: "payment-methods" },
    });

    expect(result.isError).toBeFalsy();
    expect(fake.calls[0]).toMatchObject({ path: "/api/v1/payment-methods" });
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "check_appointments", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});
