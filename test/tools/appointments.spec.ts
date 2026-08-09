import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const APPOINTMENT = {
  id: 501,
  attendanceState: "Confirmed",
  clientCapacity: "Client Appointment",
  date: "2026-07-08",
  startAt: "09:00:00",
  endAt: "09:50:00",
  flag: null,
  groupName: null,
  isActive: true,
  lastModified: "2026-07-01T10:00:00",
  location: { id: 3 },
  practitioner: { id: 7 },
  clients: [{ id: 42 }],
  invoices: [{ id: 900 }],
  resources: null,
};

describe("appointment tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_appointments: happy path with flattened IDs", async () => {
    fake.listHandler = () => pageOf([APPOINTMENT]);

    const result = await client.callTool({ name: "list_appointments", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toMatchObject({
      id: 501,
      date: "2026-07-08",
      startAt: "09:00:00",
      attendanceState: "Confirmed",
      practitionerId: 7,
      locationId: 3,
      clientIds: [42],
    });
  });

  it("list_appointments: passes date range and filters to Zanda", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_appointments",
      arguments: { dateFrom: "2026-07-01", dateTo: "2026-07-31", practitionerId: 7 },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/appointments",
      query: {
        page: 1,
        pageSize: 10,
        dateFrom: "2026-07-01",
        dateTo: "2026-07-31",
        practitionerId: 7,
      },
    });
  });

  it("accepts datetime-precision bounds", async () => {
    fake.listHandler = () => pageOf([]);

    const result = await client.callTool({
      name: "list_appointments",
      arguments: { dateFrom: "2026-07-08T09:00:00" },
    });

    expect(result.isError).toBeFalsy();
  });

  it.each([
    ["wrong format", "08/07/2026"],
    ["timezone suffix", "2026-07-08T09:00:00Z"],
    ["impossible date", "2026-02-30"],
  ])("rejects a %s date before Zanda is touched", async (_label, bad) => {
    const result = await client.callTool({
      name: "list_appointments",
      arguments: { dateFrom: bad },
    });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects dateFrom after dateTo with a clear message", async () => {
    const result = await client.callTool({
      name: "list_appointments",
      arguments: { dateFrom: "2026-08-01", dateTo: "2026-07-01" },
    });
    const payload = payloadOf(result);

    expect(result.isError).toBe(true);
    expect(payload.error).toContain("dateFrom");
    expect(payload.error).toContain("must not be after");
    expect(fake.calls).toHaveLength(0);
  });

  it("get_appointment: happy path includes invoice IDs", async () => {
    fake.getHandler = () => APPOINTMENT;

    const result = await client.callTool({ name: "get_appointment", arguments: { id: 501 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/appointments/501" });
    expect(payload.summary).toContain("2026-07-08");
    expect(payload.summary).toContain("Confirmed");
    expect((payload.appointment as Record<string, unknown>).invoiceIds).toEqual([900]);
  });

  it("passes Zanda errors through safely", async () => {
    fake.getHandler = () => {
      throw new ZandaApiError("not_found", 404);
    };

    const result = await client.callTool({ name: "get_appointment", arguments: { id: 1 } });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("No resource with that ID");
  });
});
