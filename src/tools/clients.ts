/**
 * Ctools for listing a getting client data, nothing too private
 * and nothing here is stored even temporarily
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { clientListShape, idShape } from "./schemas";

type ClientProfile = components["schemas"]["ClientProfileResponseNoLinks"];

/** simplify shape of list to identity, contact, status, nothing clinical such as conditions */
function summariseClient(c: ClientProfile) {
  return {
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    preferredName: c.preferredName,
    emailAddress: c.emailAddress,
    mobileTelephone: c.mobileTelephone,
    isActive: c.isActive,
    isArchived: c.isArchived,
  };
}

export function registerClientTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_clients",
    {
      title: "List clients",
      description:
        "Lists clients (patients; Zanda calls them 'client profiles') of the health practice. " +
        "Use it to find a client's ID by browsing/filtering, or to see recent or active " +
        "clients. Supports pagination and optional filters (active, archived, primary " +
        "practitioner). Returns JSON with: summary, items (array of clients: id, firstName, " +
        "lastName, preferredName, emailAddress, mobileTelephone, isActive, isArchived), page, " +
        "pageSize, and hasNextPage (true means more pages exist). Contains personal data - " +
        "only request what the user's task actually needs.",
      inputSchema: clientListShape,
    },
    async ({ page, pageSize, isActive, isArchived, primaryPractitionerId }) =>
      runTool("list_clients", async () => {
        const result = await getClient().listResource<ClientProfile>("/api/v1/client-profiles", {
          page,
          pageSize,
          isActive,
          isArchived,
          primaryPractitionerId,
        });

        return jsonResult({
          summary: `Found ${result.items.length} client(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseClient),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_client",
    {
      title: "Get a client by ID",
      description:
        "Fetches one client's (patient's) profile by their numeric Zanda ID (find the ID with " +
        "list_clients first if needed). Returns JSON with: summary and client (identity, " +
        "contact details, address, date of birth, status, and primaryPractitionerId - pass " +
        "that to get_practitioner for the practitioner's name). Does not include appointments " +
        "or invoices - use the appointment/invoice " +
        "tools for those. Contains personal data - fetch only when the task requires it.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_client", async () => {
        const c = await getClient().getResource<ClientProfile>(`/api/v1/client-profiles/${id}`);

        const displayName = [c.firstName, c.lastName].filter(Boolean).join(" ") || `#${c.id}`;

        return jsonResult({
          summary: `Client ${displayName}${c.preferredName ? ` (goes by ${c.preferredName})` : ""}${
            c.isArchived ? " - archived" : c.isActive === false ? " - inactive" : ""
          }.`,
          client: {
            id: c.id,
            firstName: c.firstName,
            lastName: c.lastName,
            preferredName: c.preferredName,
            dateOfBirth: c.dateOfBirth,
            emailAddress: c.emailAddress,
            mobileTelephone: c.mobileTelephone,
            homeTelephone: c.homeTelephone,
            streetAddress: c.streetAddress,
            city: c.city,
            state: c.state,
            postalCode: c.postalCode,
            country: c.country,
            isActive: c.isActive,
            isArchived: c.isArchived,
            dateAdded: c.dateAdded,
            // For full practitioner, see practitioner tools
            primaryPractitionerId: c.primaryPractitioner ? c.primaryPractitioner.id : null,
          },
        });
      }),
  );
}
