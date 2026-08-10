/**
 * Clinic-day capacity analysis. Zanda's API does not expose a per-room/column
 * capacity, so this tool encodes the practice's own concurrency rules per
 * location and derives true availability and overbookings from the diary.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import { clinicAvailabilityShape } from "./schemas";

type Appointment = components["schemas"]["AppointmentResponseNoLinks"];
type Location = components["schemas"]["LocationResponseNoLinks"];

/** Higher-capacity clinics run at most 2 bookings across doctor columns */
export const DOUBLE_CAPACITY_LIMIT = 2;
/** Every other clinic runs one booking at a time across all columns */
export const DEFAULT_CONCURRENCY_LIMIT = 1;

/**
 * Higher-capacity clinics are identified by their location NAME so the rule
 * survives location IDs differing between demo and live Zanda accounts. Replace
 * this placeholder with the name(s) of your own two-column clinic(s).
 */
const DOUBLE_CAPACITY_NAME_PATTERN = /\byour[_ ]double[_ ]clinic\b/i;

export function concurrencyLimitForLocation(locationName: string | null | undefined): number {
  return DOUBLE_CAPACITY_NAME_PATTERN.test(locationName ?? "")
    ? DOUBLE_CAPACITY_LIMIT
    : DEFAULT_CONCURRENCY_LIMIT;
}

/**
 * Remove consideration of cancellations, etc
 */
const NON_OCCUPYING_STATES: ReadonlySet<string> = new Set([
  "Cancelled",
  "Late Cancellation",
  "Rescheduled",
]);

/**
 * Parses time between formats
 */
export function timeToMinutes(value: string | null | undefined): number | null {
  if (typeof value !== "string") {
    return null;
  }
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (match === null) {
    return null;
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) {
    return null;
  }
  return hours * 60 + minutes;
}

/** Output parse of time */
export function minutesToTime(totalMinutes: number): string {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Outlier check end at time doesnt clash with start at time.
 */
interface BookingInterval {
  start: number;
  end: number;
  appointment: Appointment;
}

export interface AvailableWindow {
  startMin: number;
  endMin: number;
  /** remaining capacity below the location's concurrency limit */
  remainingCapacity: number;
}

export interface OverbookedWindow {
  startMin: number;
  endMin: number;
  peakConcurrency: number;
  appointments: Appointment[];
}

export interface DayAnalysis {
  availableWindows: AvailableWindow[];
  overbookedWindows: OverbookedWindow[];
  /** Bookings that occupy diary time and entered the analysis. */
  occupying: number;
  cancelledOrInactive: number;
  /** Missing or inverted start/end times are excluded and reported honestly. */
  missingTimes: number;
}

/**
 * The clinic day checks against the rules analysing the clinics entire day.
 * The concurrency limit is per location: 2 across all doctor columns at a
 * two-column clinic, 1 everywhere else. Client-less diary blocks (lunch,
 * meetings) count as occupying just like a booking.
 */
export function analyseClinicDay(
  appointments: Appointment[],
  dayStartMin: number,
  dayEndMin: number,
  concurrencyLimit: number,
): DayAnalysis {
  const intervals: BookingInterval[] = [];
  let cancelledOrInactive = 0;
  let missingTimes = 0;

  for (const appointment of appointments) {
    if (
      appointment.isActive === false ||
      NON_OCCUPYING_STATES.has(appointment.attendanceState ?? "")
    ) {
      cancelledOrInactive++;
      continue;
    }
    const start = timeToMinutes(appointment.startAt);
    const end = timeToMinutes(appointment.endAt);
    if (start === null || end === null || end <= start) {
      missingTimes++;
      continue;
    }
    intervals.push({ start, end, appointment });
  }

  // Segment boundaries
  const boundarySet = new Set<number>([dayStartMin, dayEndMin]);
  for (const interval of intervals) {
    boundarySet.add(interval.start);
    boundarySet.add(interval.end);
  }
  const boundaries = [...boundarySet].sort((a, b) => a - b);

  const availableWindows: AvailableWindow[] = [];
  const overbookedWindows: OverbookedWindow[] = [];
  // The window currently being extended, with the interval objects already
  // inside it.
  let openOverbooked: (OverbookedWindow & { covering: Set<BookingInterval> }) | null = null;

  for (let i = 0; i + 1 < boundaries.length; i++) {
    const segStart = boundaries[i] as number;
    const segEnd = boundaries[i + 1] as number;
    const covering = intervals.filter((iv) => iv.start < segEnd && iv.end > segStart);
    const occupancy = covering.length;

    // Availability is only inside opening hours.
    const clipStart = Math.max(segStart, dayStartMin);
    const clipEnd = Math.min(segEnd, dayEndMin);
    if (clipStart < clipEnd && occupancy < concurrencyLimit) {
      const remaining = concurrencyLimit - occupancy;
      const last = availableWindows[availableWindows.length - 1];
      if (last !== undefined && last.endMin === clipStart && last.remainingCapacity === remaining) {
        last.endMin = clipEnd;
      } else {
        availableWindows.push({
          startMin: clipStart,
          endMin: clipEnd,
          remainingCapacity: remaining,
        });
      }
    }

    // Inform of existing overbookings.
    if (occupancy > concurrencyLimit) {
      if (openOverbooked !== null && openOverbooked.endMin === segStart) {
        openOverbooked.endMin = segEnd;
        openOverbooked.peakConcurrency = Math.max(openOverbooked.peakConcurrency, occupancy);
        for (const iv of covering) {
          if (!openOverbooked.covering.has(iv)) {
            openOverbooked.covering.add(iv);
            openOverbooked.appointments.push(iv.appointment);
          }
        }
      } else {
        const fresh: OverbookedWindow & { covering: Set<BookingInterval> } = {
          startMin: segStart,
          endMin: segEnd,
          peakConcurrency: occupancy,
          appointments: covering.map((iv) => iv.appointment),
          covering: new Set(covering),
        };
        openOverbooked = fresh;
        overbookedWindows.push(fresh);
      }
    } else if (openOverbooked !== null) {
      openOverbooked = null;
    }
  }

  return {
    availableWindows,
    overbookedWindows: overbookedWindows.map(
      ({ startMin, endMin, peakConcurrency, appointments: appts }) => ({
        startMin,
        endMin,
        peakConcurrency,
        appointments: appts,
      }),
    ),
    occupying: intervals.length,
    cancelledOrInactive,
    missingTimes,
  };
}

/**
 * Fetches every page of one clinic-day's appointments
 */
const PAGE_SIZE = 100; // Zandas documented maximum
const MAX_PAGES = 5;

async function fetchWholeDay(
  reader: ZandaReader,
  locationId: number,
  date: string,
): Promise<Appointment[]> {
  const all: Appointment[] = [];
  for (let page = 1; ; page++) {
    if (page > MAX_PAGES) {
      throw new ToolInputError(
        `More than ${MAX_PAGES * PAGE_SIZE} appointments on ${date} at location ` +
          `${locationId} - refusing to analyse a partial day. Check the locationId and date.`,
      );
    }
    const result = await reader.listResource<Appointment>("/api/v1/appointments", {
      page,
      pageSize: PAGE_SIZE,
      dateFrom: date,
      dateTo: date,
      locationId,
      isActive: true,
    });
    all.push(...result.items);
    if (!result.hasNextPage) {
      return all;
    }
  }
}

interface AvailabilityArgs {
  locationId: number;
  date: string;
  dayStart: string;
  dayEnd: string;
}

function buildAvailabilityHandler(
  getClient: () => ZandaReader,
  describeBooking: (a: Appointment) => Record<string, unknown>,
  summarySuffix: string,
) {
  return async ({ locationId, date, dayStart, dayEnd }: AvailabilityArgs) =>
    runTool("check_clinic_availability", async () => {
      const dayStartMin = timeToMinutes(dayStart);
      const dayEndMin = timeToMinutes(dayEnd);
      if (dayStartMin === null || dayEndMin === null || dayStartMin >= dayEndMin) {
        return errorResult(
          new ToolInputError(`dayStart (${dayStart}) must be before dayEnd (${dayEnd}).`),
        );
      }

      // The limit is decided by the location's name, so resolve it first.
      const location = await getClient().getResource<Location>(`/api/v1/locations/${locationId}`);
      const concurrencyLimit = concurrencyLimitForLocation(location.name);

      const appointments = await fetchWholeDay(getClient(), locationId, date);
      const analysis = analyseClinicDay(appointments, dayStartMin, dayEndMin, concurrencyLimit);

      const availableWindows = analysis.availableWindows.map((w) => ({
        start: minutesToTime(w.startMin),
        end: minutesToTime(w.endMin),
        remainingCapacity: w.remainingCapacity,
      }));
      const overbookedWindows = analysis.overbookedWindows.map((w) => ({
        start: minutesToTime(w.startMin),
        end: minutesToTime(w.endMin),
        concurrentBookings: w.peakConcurrency,
        bookings: w.appointments.map(describeBooking),
      }));

      const overbookedNote =
        overbookedWindows.length === 0
          ? "no overbooked periods"
          : `${overbookedWindows.length} OVERBOOKED period(s) needing staff attention`;

      return jsonResult({
        summary:
          `On ${date} at ${location.name} (location ${locationId}) between ${dayStart} and ` +
          `${dayEnd}: ${availableWindows.length} window(s) with capacity for a new booking; ` +
          `${overbookedNote} (this location's limit: ${concurrencyLimit} concurrent ` +
          `booking(s)).${summarySuffix}`,
        date,
        locationId,
        locationName: location.name,
        dayWindow: { start: dayStart, end: dayEnd },
        concurrencyLimit,
        availableWindows,
        overbookedWindows,
        bookingsConsidered: analysis.occupying,
        bookingsExcluded: {
          cancelledOrInactive: analysis.cancelledOrInactive,
          missingTimes: analysis.missingTimes,
        },
      });
    });
}

const DESCRIPTION_COMMON =
  "Analyses one clinic's (location's) whole day across ALL practitioners' columns at once " +
  "and reports (a) the time windows where a new appointment can truly be booked and (b) any " +
  "overbooked periods. The practice rule depends on the location: at a two-column clinic at " +
  "most 2 appointments may run at the same moment across the whole clinic (one " +
  "practitioner may run 2 at once, or two practitioners 1 each; a 3rd concurrent booking " +
  "is an error); at EVERY other location only 1 appointment may run at a time across all " +
  "practitioners' columns. Staff diary blocks with no clients (e.g. lunch - one nurse " +
  "unavailable - or meetings) occupy a slot exactly like a booking. Longer appointments " +
  "block their entire duration; cancelled/rescheduled bookings do not count; a group " +
  "session counts as 1 booking. Requires locationId (from list_locations) and date " +
  "(YYYY-MM-DD); optional dayStart/dayEnd bound the bookable day (default 08:00-18:00). " +
  "Returns JSON with: summary, locationName, concurrencyLimit (this location's limit), " +
  "availableWindows (start, end, remainingCapacity - how many new bookings fit), " +
  "overbookedWindows (start, end, concurrentBookings, bookings";

export function registerAvailabilityTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "check_clinic_availability",
    {
      title: "Find true availability and overbookings at a clinic",
      description:
        `${DESCRIPTION_COMMON} - each with id, startAt, endAt, attendanceState, ` +
        "practitionerId, clientIds, groupName so staff can fix the error), " +
        "bookingsConsidered, bookingsExcluded. Use list_appointments for raw schedules; use " +
        "this to find when a clinic can take a new booking or to audit a day for mistakes.",
      inputSchema: clinicAvailabilityShape,
    },
    buildAvailabilityHandler(
      getClient,
      (a) => ({
        id: a.id,
        startAt: a.startAt,
        endAt: a.endAt,
        attendanceState: a.attendanceState,
        practitionerId: a.practitioner?.id ?? null,
        clientIds: a.clients?.map((c) => c.id) ?? [],
        groupName: a.groupName ?? null,
      }),
      "",
    ),
  );
}

export function registerSanitisedAvailabilityTools(
  server: McpServer,
  getClient: () => ZandaReader,
): void {
  server.registerTool(
    "check_clinic_availability",
    {
      title: "Find true availability and overbookings at a clinic (no client identities)",
      description:
        `${DESCRIPTION_COMMON} - each with id, startAt, endAt, attendanceState, ` +
        "practitionerId and clientCount, the NUMBER of clients booked), " +
        "bookingsConsidered, bookingsExcluded. It never returns names or any way to " +
        "identify who a booking is for - do not speculate about identities. Use it to " +
        "offer callers genuinely free times or to flag that a period looks overbooked.",
      inputSchema: clinicAvailabilityShape,
    },
    buildAvailabilityHandler(
      getClient,
      (a) => ({
        id: a.id,
        startAt: a.startAt,
        endAt: a.endAt,
        attendanceState: a.attendanceState,
        practitionerId: a.practitioner?.id ?? null,
        clientCount: a.clients?.length ?? 0,
      }),
      " Client identities are not included.",
    ),
  );
}
