import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, connectSanitisedHarness, FakeZanda, pageOf, payloadOf } from "./harness";

function booking(
  id: number,
  startAt: string,
  endAt: string,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    id,
    date: "2026-07-15",
    startAt,
    endAt,
    attendanceState: "Confirmed",
    isActive: true,
    practitioner: { id: 7 },
    location: { id: 3 },
    clients: [{ id: 900 + id }],
    ...extra,
  };
}

/** Location 3 is the two-column clinic (limit 2); location 5 is any other clinic (limit 1). */
const ARGS = { locationId: 3, date: "2026-07-15" };
const OTHER_ARGS = { locationId: 5, date: "2026-07-15" };

function locationHandler(path: string): unknown {
  if (path === "/api/v1/locations/3") {
    return { id: 3, name: "Your Double Clinic", serviceModality: "In Person", isActive: true };
  }
  if (path === "/api/v1/locations/5") {
    return { id: 5, name: "Other Clinic", serviceModality: "In Person", isActive: true };
  }
  throw new Error(`no location scripted for ${path}`);
}

function windows(payload: Record<string, unknown>): Array<Record<string, unknown>> {
  return payload.availableWindows as Array<Record<string, unknown>>;
}

function overbooked(payload: Record<string, unknown>): Array<Record<string, unknown>> {
  return payload.overbookedWindows as Array<Record<string, unknown>>;
}

describe("check_clinic_availability (full catalogue)", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    fake.getHandler = locationHandler;
    client = await connectHarness(() => fake);
  });

  async function analyse(args: Record<string, unknown> = ARGS) {
    return await client.callTool({ name: "check_clinic_availability", arguments: args });
  }

  it("empty day at the two-column clinic: the whole window is available at capacity 2", async () => {
    fake.listHandler = () => pageOf([]);

    const payload = payloadOf(await analyse());

    expect(Object.keys(payload)[0]).toBe("summary");
    expect(payload.locationName).toBe("Your Double Clinic");
    expect(payload.concurrencyLimit).toBe(2);
    expect(windows(payload)).toEqual([{ start: "08:00", end: "18:00", remainingCapacity: 2 }]);
    expect(overbooked(payload)).toEqual([]);
    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/locations/3" });
    expect(fake.calls[1]).toMatchObject({
      kind: "list",
      path: "/api/v1/appointments",
      query: {
        page: 1,
        pageSize: 100,
        dateFrom: "2026-07-15",
        dateTo: "2026-07-15",
        locationId: 3,
        isActive: true,
      },
    });
  });

  it("one booking leaves capacity 1 during its span, 2 elsewhere", async () => {
    fake.listHandler = () => pageOf([booking(1, "09:00:00", "10:00:00")]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "09:00", end: "10:00", remainingCapacity: 1 },
      { start: "10:00", end: "18:00", remainingCapacity: 2 },
    ]);
    expect(payload.bookingsConsidered).toBe(1);
  });

  it("two concurrent bookings close the clinic for that time - however they are spread", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "09:00:00", "10:00:00", { practitioner: { id: 7 } }),
        booking(2, "09:00:00", "10:00:00", { practitioner: { id: 8 } }),
      ]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "10:00", end: "18:00", remainingCapacity: 2 },
    ]);
    expect(overbooked(payload)).toEqual([]);
  });

  it("any other location allows only 1 booking at a time across all columns", async () => {
    fake.listHandler = () => pageOf([booking(1, "09:00:00", "10:00:00")]);

    const payload = payloadOf(await analyse(OTHER_ARGS));

    expect(payload.locationName).toBe("Other Clinic");
    expect(payload.concurrencyLimit).toBe(1);
    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 1 },
      { start: "10:00", end: "18:00", remainingCapacity: 1 },
    ]);
    expect(overbooked(payload)).toEqual([]);
  });

  it("a second concurrent booking at a single-column location is overbooked", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "09:00:00", "10:00:00"),
        booking(2, "09:30:00", "10:30:00", { practitioner: { id: 8 } }),
      ]);

    const payload = payloadOf(await analyse(OTHER_ARGS));

    expect(overbooked(payload)).toHaveLength(1);
    expect(overbooked(payload)[0]).toMatchObject({
      start: "09:30",
      end: "10:00",
      concurrentBookings: 2,
    });
  });

  it("a lunch block with no clients still occupies a slot (nurse unavailable)", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "12:00:00", "13:00:00", {
          attendanceState: "Undetermined",
          clients: [],
          flag: "Lunch",
        }),
      ]);

    const payload = payloadOf(await analyse(OTHER_ARGS));

    // Limit 1 elsewhere: lunch closes the clinic for that hour.
    expect(windows(payload)).toEqual([
      { start: "08:00", end: "12:00", remainingCapacity: 1 },
      { start: "13:00", end: "18:00", remainingCapacity: 1 },
    ]);
    expect(payload.bookingsConsidered).toBe(1);
  });

  it("at the two-column clinic a lunch block drops capacity from 2 to 1, not to 0", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "12:00:00", "13:00:00", { attendanceState: "Undetermined", clients: [] }),
      ]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "12:00", remainingCapacity: 2 },
      { start: "12:00", end: "13:00", remainingCapacity: 1 },
      { start: "13:00", end: "18:00", remainingCapacity: 2 },
    ]);
  });

  it("a third concurrent booking is flagged overbooked, with full details to fix it", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "09:00:00", "10:00:00"),
        booking(2, "09:00:00", "10:00:00", { practitioner: { id: 8 } }),
        booking(3, "09:30:00", "10:30:00", { practitioner: { id: 9 } }),
      ]);

    const payload = payloadOf(await analyse());

    const over = overbooked(payload);
    expect(over).toHaveLength(1);
    expect(over[0]).toMatchObject({ start: "09:30", end: "10:00", concurrentBookings: 3 });
    const bookings = over[0]?.bookings as Array<Record<string, unknown>>;
    expect(bookings).toHaveLength(3);
    expect(bookings.map((b) => b.id).sort()).toEqual([1, 2, 3]);
    expect(bookings[0]).toHaveProperty("clientIds");
    expect(bookings[0]).toHaveProperty("practitionerId");
    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "10:00", end: "10:30", remainingCapacity: 1 },
      { start: "10:30", end: "18:00", remainingCapacity: 2 },
    ]);
    expect(payload.summary).toContain("OVERBOOKED");
  });

  it("longer appointments block their entire duration", async () => {
    fake.listHandler = () =>
      pageOf([booking(1, "08:00:00", "12:00:00"), booking(2, "09:00:00", "09:30:00")]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 1 },
      { start: "09:30", end: "12:00", remainingCapacity: 1 },
      { start: "12:00", end: "18:00", remainingCapacity: 2 },
    ]);
  });

  it("back-to-back bookings never stack: a 10:00 end meets a 10:00 start", async () => {
    fake.listHandler = () =>
      pageOf([booking(1, "09:00:00", "10:00:00"), booking(2, "10:00:00", "11:00:00")]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "09:00", end: "11:00", remainingCapacity: 1 },
      { start: "11:00", end: "18:00", remainingCapacity: 2 },
    ]);
  });

  it("cancelled, rescheduled and inactive bookings free their slot", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "09:00:00", "10:00:00"),
        booking(2, "09:00:00", "10:00:00", { attendanceState: "Cancelled" }),
        booking(3, "09:00:00", "10:00:00", { attendanceState: "Late Cancellation" }),
        booking(4, "09:00:00", "10:00:00", { attendanceState: "Rescheduled" }),
        booking(5, "09:00:00", "10:00:00", { isActive: false }),
      ]);

    const payload = payloadOf(await analyse());

    expect(windows(payload)).toContainEqual({
      start: "09:00",
      end: "10:00",
      remainingCapacity: 1,
    });
    expect(overbooked(payload)).toEqual([]);
    expect(payload.bookingsConsidered).toBe(1);
    expect(payload.bookingsExcluded).toEqual({ cancelledOrInactive: 4, missingTimes: 0 });
  });

  it("bookings with missing or inverted times are excluded and reported", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "09:00:00", "10:00:00", { startAt: null }),
        booking(2, "10:00:00", "09:00:00"),
      ]);

    const payload = payloadOf(await analyse());

    expect(payload.bookingsExcluded).toEqual({ cancelledOrInactive: 0, missingTimes: 2 });
    expect(windows(payload)).toEqual([{ start: "08:00", end: "18:00", remainingCapacity: 2 }]);
  });

  it("overbookings outside opening hours are still reported", async () => {
    fake.listHandler = () =>
      pageOf([
        booking(1, "07:00:00", "07:30:00"),
        booking(2, "07:00:00", "07:30:00"),
        booking(3, "07:00:00", "07:30:00"),
      ]);

    const payload = payloadOf(await analyse());

    expect(overbooked(payload)).toHaveLength(1);
    expect(overbooked(payload)[0]).toMatchObject({ start: "07:00", end: "07:30" });
    // ...but availability stays inside the day window.
    expect(windows(payload)).toEqual([{ start: "08:00", end: "18:00", remainingCapacity: 2 }]);
  });

  it("respects a custom day window", async () => {
    fake.listHandler = () => pageOf([]);

    const payload = payloadOf(await analyse({ ...ARGS, dayStart: "07:30", dayEnd: "20:00" }));

    expect(windows(payload)).toEqual([{ start: "07:30", end: "20:00", remainingCapacity: 2 }]);
  });

  it("fetches every page before analysing", async () => {
    fake.listHandler = (_path, query) =>
      query?.page === 1
        ? pageOf([booking(1, "09:00:00", "10:00:00")], 1, 100, true)
        : pageOf([booking(2, "09:00:00", "10:00:00")], 2, 100, false);

    const payload = payloadOf(await analyse());

    const listCalls = fake.calls.filter((c) => c.kind === "list");
    expect(listCalls).toHaveLength(2);
    expect(listCalls.map((c) => c.query?.page)).toEqual([1, 2]);
    expect(payload.bookingsConsidered).toBe(2);
    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "10:00", end: "18:00", remainingCapacity: 2 },
    ]);
  });

  it("refuses to analyse a truncated day rather than report wrong availability", async () => {
    fake.listHandler = () => pageOf([booking(1, "09:00:00", "10:00:00")], 1, 100, true);

    const result = await analyse();

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("partial day");
    expect(fake.calls.filter((c) => c.kind === "list")).toHaveLength(5);
  });

  it("rejects a day window that ends before it starts, before any Zanda call", async () => {
    const result = await analyse({ ...ARGS, dayStart: "18:00", dayEnd: "08:00" });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("dayStart");
    expect(fake.calls).toHaveLength(0);
  });

  it("rejects calendar-impossible dates at the schema", async () => {
    const result = await analyse({ locationId: 3, date: "2026-02-30" });

    expect(result.isError).toBe(true);
    expect(fake.calls).toHaveLength(0);
  });

  it("passes Zanda errors through safely", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await analyse();

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toMatch(/rate limiting/i);
  });
});

describe("check_clinic_availability (sanitised catalogue)", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    fake.getHandler = locationHandler;
    client = await connectSanitisedHarness(() => fake);
  });

  it("reports overbooked periods with counts, never identities", async () => {
    const identityRich = (id: number) =>
      booking(id, "09:00:00", "10:00:00", {
        practitioner: { id: 6 + id },
        clients: [{ id: 42 }, { id: 43 }],
        groupName: "Smith family session",
        flag: "VIP",
      });
    fake.listHandler = () => pageOf([identityRich(1), identityRich(2), identityRich(3)]);

    const result = await client.callTool({
      name: "check_clinic_availability",
      arguments: ARGS,
    });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    const over = overbooked(payload);
    expect(over).toHaveLength(1);
    const bookings = over[0]?.bookings as Array<Record<string, unknown>>;
    expect(bookings[0]).toMatchObject({ clientCount: 2 });
    expect(payload.summary).toContain("identities");
    const serialised = JSON.stringify(payload);
    expect(serialised).not.toContain("clientIds");
    expect(serialised).not.toContain("groupName");
    expect(serialised).not.toContain("Smith");
    expect(serialised).not.toContain("42");
  });

  it("availability windows are identical to the full tool's", async () => {
    fake.listHandler = () => pageOf([booking(1, "09:00:00", "10:00:00")]);

    const payload = payloadOf(
      await client.callTool({ name: "check_clinic_availability", arguments: ARGS }),
    );

    expect(windows(payload)).toEqual([
      { start: "08:00", end: "09:00", remainingCapacity: 2 },
      { start: "09:00", end: "10:00", remainingCapacity: 1 },
      { start: "10:00", end: "18:00", remainingCapacity: 2 },
    ]);
  });
});
