/**
 * Register the tools for the MCP server, has all of it.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAppointmentTools } from "../tools/appointments";
import { registerAvailabilityTools } from "../tools/availability";
import { registerBillableItemTools } from "../tools/billable-items";
import { registerClientTools } from "../tools/clients";
import { registerInsurerTools } from "../tools/insurers";
import { registerInvoiceTools } from "../tools/invoices";
import { registerLocationTools } from "../tools/locations";
import { registerLookupTools } from "../tools/lookups";
import { registerPaymentTools } from "../tools/payments";
import { registerPractitionerTools } from "../tools/practitioners";
import { registerReferralTools } from "../tools/referrals";
import { registerServerInfoTool } from "../tools/server-info";
import type { ZandaReader } from "../zanda/client";

export function registerAllTools(server: McpServer, getClient: () => ZandaReader): void {
  registerServerInfoTool(server);
  registerPractitionerTools(server, getClient);
  registerClientTools(server, getClient);
  registerAppointmentTools(server, getClient);
  registerInvoiceTools(server, getClient);
  // Coverage sweep - every remaining Zanda GET endpoint.
  registerLocationTools(server, getClient);
  registerPaymentTools(server, getClient);
  registerBillableItemTools(server, getClient);
  registerReferralTools(server, getClient);
  registerInsurerTools(server, getClient);
  registerLookupTools(server, getClient);
  // Clinic-level capacity analysis (availability + overbookings).
  registerAvailabilityTools(server, getClient);
}
