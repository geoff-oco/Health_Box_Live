/**
 * Location tools for clinics
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { idShape, locationListShape } from "./schemas";

type Location = components["schemas"]["LocationResponseNoLinks"];

/** list shape basics */
function summariseLocation(location: Location) {
  return {
    id: location.id,
    name: location.name,
    serviceModality: location.serviceModality,
    city: location.city ?? null,
    state: location.state ?? null,
    isActive: location.isActive,
  };
}

export function registerLocationTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_locations",
    {
      title: "List practice locations",
      description:
        "Lists the health practice's locations (rooms, clinics, telehealth), paginated. Use " +
        "it to resolve a locationId from appointments, invoices, or payments into a name, or " +
        "to see where the practice operates. Returns JSON with: summary, items (id, name, " +
        "serviceModality e.g. 'In Person'/'Telehealth Video Call'/'Phone', city, state, " +
        "isActive), page, pageSize, hasNextPage. Contains no client (patient) data.",
      inputSchema: locationListShape,
    },
    async ({ page, pageSize, isActive }) =>
      runTool("list_locations", async () => {
        const result = await getClient().listResource<Location>("/api/v1/locations", {
          page,
          pageSize,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} location(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseLocation),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_location",
    {
      title: "Get a practice location by ID",
      description:
        "Fetches one practice location by its numeric Zanda ID (find IDs with " +
        "list_locations, or from an appointment/invoice/payment's locationId). Returns JSON " +
        "with: summary and location (id, name, serviceModality, streetAddress, city, state, " +
        "postalCode, isActive). This is the practice's own address, not a client's.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_location", async () => {
        const location = await getClient().getResource<Location>(`/api/v1/locations/${id}`);

        return jsonResult({
          summary: `Location ${location.name} (${location.serviceModality})${
            location.isActive ? "" : " - inactive"
          }.`,
          location: {
            ...summariseLocation(location),
            streetAddress: location.streetAddress ?? null,
            postalCode: location.postalCode ?? null,
          },
        });
      }),
  );
}
