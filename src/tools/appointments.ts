/**
 * list and get appointments from zanda API.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import { appointmentListShape, dateRangeError, idShape } from "./schemas";

type Appointment = components["schemas"]["AppointmentResponseNoLinks"];

/** Compact list shape: when, what state, and the IDs to dig deeper. */
function summariseAppointment(a: Appointment) {
  return {
    id: a.id,
    date: a.date,
    startAt: a.startAt,
    endAt: a.endAt,
    attendanceState: a.attendanceState,
    clientCapacity: a.clientCapacity,
    practitionerId: a.practitioner?.id ?? null,
    locationId: a.location?.id ?? null,
    clientIds: a.clients?.map((c) => c.id) ?? [],
    groupName: a.groupName ?? null,
    isActive: a.isActive,
  };
}

export function registerAppointmentTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_appointments",
    {
      title: "List appointments",
      description:
        "Lists appointments at the health practice, newest-first paginated. Use it to see a " +
        "schedule for a day or range (dateFrom/dateTo, inclusive, compared against the " +
        "appointment start time), or to find appointments for one client, practitioner, or " +
        "location. Returns JSON with: summary, items (id, date, startAt, endAt, " +
        "attendanceState e.g. 'Confirmed'/'Cancelled'/'Completed', clientCapacity, " +
        "practitionerId, locationId, clientIds, groupName, isActive), page, pageSize, " +
        "hasNextPage. IDs are numeric, resolve names via get_practitioner/get_client.",
      inputSchema: appointmentListShape,
    },
    async ({ page, pageSize, dateFrom, dateTo, clientId, practitionerId, locationId, isActive }) =>
      runTool("list_appointments", async () => {
        const rangeProblem = dateRangeError(dateFrom, dateTo, "dateFrom", "dateTo");
        if (rangeProblem !== null) {
          return errorResult(new ToolInputError(rangeProblem));
        }

        const result = await getClient().listResource<Appointment>("/api/v1/appointments", {
          page,
          pageSize,
          dateFrom,
          dateTo,
          clientId,
          practitionerId,
          locationId,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} appointment(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseAppointment),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_appointment",
    {
      title: "Get an appointment by ID",
      description:
        "Fetches one appointment by its numeric Zanda ID (find IDs with list_appointments). " +
        "Returns JSON with: summary and appointment (id, date, startAt, endAt, " +
        "attendanceState, clientCapacity, flag, groupName, practitionerId, locationId, " +
        "clientIds, invoiceIds, isActive). Resolve the IDs with get_practitioner, get_client, " +
        "or get_invoice.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_appointment", async () => {
        const a = await getClient().getResource<Appointment>(`/api/v1/appointments/${id}`);

        return jsonResult({
          summary: `Appointment on ${a.date} ${a.startAt}-${a.endAt} (${a.attendanceState})${
            a.groupName ? ` - group: ${a.groupName}` : ""
          }.`,
          appointment: {
            ...summariseAppointment(a),
            flag: a.flag ?? null,
            invoiceIds: a.invoices?.map((invoice) => invoice.id) ?? [],
          },
        });
      }),
  );
}
