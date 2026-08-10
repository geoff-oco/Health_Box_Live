/**
 * Simple catalogue of the tools only the sanitised mcp will use, have gotten rid of clients etc, to remove that info.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerSanitisedAvailabilityTools } from "../tools/availability";
import { registerBillableItemTools } from "../tools/billable-items";
import { registerInsurerTools } from "../tools/insurers";
import { registerLocationTools } from "../tools/locations";
import { registerLookupTools } from "../tools/lookups";
import {
  registerSanitisedAppointmentTools,
  registerSanitisedPractitionerTools,
} from "../tools/sanitised";
import { registerServerInfoTool } from "../tools/server-info";
import type { ZandaReader } from "../zanda/client";

export function registerSanitisedTools(server: McpServer, getClient: () => ZandaReader): void {
  registerServerInfoTool(server);
  registerSanitisedAppointmentTools(server, getClient);
  registerSanitisedPractitionerTools(server, getClient);
  registerSanitisedAvailabilityTools(server, getClient);
  registerLocationTools(server, getClient);
  registerBillableItemTools(server, getClient);
  registerInsurerTools(server, getClient);
  registerLookupTools(server, getClient);
}
