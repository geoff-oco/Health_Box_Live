/**
 * A collection of our tools but santiised of sensitive pt data, like full
 * names, emails, addresses, etc
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import {
  dateRangeError,
  idShape,
  sanitisedAppointmentListShape,
  sanitisedPractitionerListShape,
} from "./schemas";

type Appointment = components["schemas"]["AppointmentResponseNoLinks"];
type Practitioner = components["schemas"]["PractitionerResponseNoLinks"];

/** Times and states only no client IDs. */
function sanitiseAppointment(a: Appointment) {
  return {
    id: a.id,
    date: a.date,
    startAt: a.startAt,
    endAt: a.endAt,
    attendanceState: a.attendanceState,
    clientCapacity: a.clientCapacity,
    clientCount: a.clients?.length ?? 0,
    practitionerId: a.practitioner?.id ?? null,
    locationId: a.location?.id ?? null,
    isActive: a.isActive,
  };
}

/** Directory basics only no email, mobile, legal name. */
function sanitisePractitioner(p: Practitioner) {
  return {
    id: p.id,
    displayName: p.displayName,
    profession: p.profession,
    jobTitle: p.jobTitle,
    isActive: p.isActive,
  };
}

export function registerSanitisedAppointmentTools(
  server: McpServer,
  getClient: () => ZandaReader,
): void {
  server.registerTool(
    "check_appointments",
    {
      title: "Check the appointment schedule (no client identities)",
      description:
        "Lists appointments at the health practice WITHOUT any client (patient) identities - " +
        "use it to check when the practice or a practitioner is busy or free, whether a " +
        "requested time clashes with an existing booking, or how full a day is. Filter by " +
        "date range (dateFrom/dateTo, inclusive, format YYYY-MM-DD; use the same day for " +
        "both to check one day), practitionerId, or locationId. Returns JSON with: summary, " +
        "items (id, date, startAt, endAt, attendanceState e.g. 'Confirmed'/'Cancelled', " +
        "clientCapacity, clientCount - the NUMBER of clients booked, practitionerId, " +
        "locationId, isActive), page, pageSize, hasNextPage. It never returns names or any " +
        "way to identify who an appointment is for - do not speculate about identities.",
      inputSchema: sanitisedAppointmentListShape,
    },
    async ({ page, pageSize, dateFrom, dateTo, practitionerId, locationId, isActive }) =>
      runTool("check_appointments", async () => {
        const rangeProblem = dateRangeError(dateFrom, dateTo, "dateFrom", "dateTo");
        if (rangeProblem !== null) {
          return errorResult(new ToolInputError(rangeProblem));
        }

        const result = await getClient().listResource<Appointment>("/api/v1/appointments", {
          page,
          pageSize,
          dateFrom,
          dateTo,
          practitionerId,
          locationId,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} appointment(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }. Client identities are not included.`,
          items: result.items.map(sanitiseAppointment),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );
}

export function registerSanitisedPractitionerTools(
  server: McpServer,
  getClient: () => ZandaReader,
): void {
  server.registerTool(
    "list_practitioners",
    {
      title: "List practitioners (directory info only)",
      description:
        "Lists practitioners (the clinicians/providers who deliver services) at the health " +
        "practice - directory information only. Use it to find a practitioner's ID for " +
        "check_appointments, or to answer 'who works here' and 'is there a psychologist'. " +
        "Supports pagination and an isActive filter. Returns JSON with: summary, items (id, " +
        "displayName, profession, jobTitle, isActive), page, pageSize, hasNextPage. Personal " +
        "contact details are not available on this connection.",
      inputSchema: sanitisedPractitionerListShape,
    },
    async ({ page, pageSize, isActive }) =>
      runTool("list_practitioners", async () => {
        const result = await getClient().listResource<Practitioner>("/api/v1/practitioners", {
          page,
          pageSize,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} practitioner(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(sanitisePractitioner),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_practitioner",
    {
      title: "Get a practitioner by ID (directory info only)",
      description:
        "Fetches one practitioner by their numeric Zanda ID (find IDs with " +
        "list_practitioners) - directory information only. Returns JSON with: summary and " +
        "practitioner (id, displayName, profession, jobTitle, isActive). Personal contact " +
        "details are not available on this connection.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_practitioner", async () => {
        const p = await getClient().getResource<Practitioner>(`/api/v1/practitioners/${id}`);

        return jsonResult({
          summary: `Practitioner ${p.displayName ?? `#${p.id}`}${
            p.profession ? ` (${p.profession})` : ""
          }${p.isActive === false ? " - inactive" : ""}.`,
          practitioner: sanitisePractitioner(p),
        });
      }),
  );
}
