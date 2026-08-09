/**
 * List and get billable items such as different kinds of Tx or consultation.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { billableItemListShape, idShape } from "./schemas";

type BillableItem = components["schemas"]["BillableItemResponseNoLinks"];

function money(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** simplify shae of list to what it is and what it costs. */
function summariseBillableItem(item: BillableItem) {
  return {
    id: item.id,
    name: item.name,
    code: item.code ?? null,
    category: item.category ?? null,
    price: money(item.price),
    durationMinutes: item.duration ?? null,
    isActive: item.isActive,
  };
}

export function registerBillableItemTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_billable_items",
    {
      title: "List billable items (services & products)",
      description:
        "Lists the health practice's billable items - the services (e.g. 'Initial " +
        "Consultation', with a duration) and products it charges for, paginated. Use it to " +
        "answer 'what services do you offer', 'how much does X cost', or 'how long is a " +
        "session'. Returns JSON with: summary, items (id, name, code, category, price, " +
        "durationMinutes - null for products, isActive), page, pageSize, hasNextPage. " +
        "Prices are in the practice's currency. Contains no client (patient) data.",
      inputSchema: billableItemListShape,
    },
    async ({ page, pageSize, isActive }) =>
      runTool("list_billable_items", async () => {
        const result = await getClient().listResource<BillableItem>("/api/v1/billable-items", {
          page,
          pageSize,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} billable item(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseBillableItem),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_billable_item",
    {
      title: "Get a billable item by ID",
      description:
        "Fetches one billable item (service or product) by its numeric Zanda ID (find IDs " +
        "with list_billable_items). Returns JSON with: summary and item (the list fields " +
        "plus description, deposit, isTaxable, isAvailableAllLocations, locations - where " +
        "it's offered if not everywhere, and modifiers). Contains no client (patient) data.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_billable_item", async () => {
        const item = await getClient().getResource<BillableItem>(`/api/v1/billable-items/${id}`);
        const compact = summariseBillableItem(item);

        return jsonResult({
          summary: `${item.name}${compact.price !== null ? ` - ${compact.price}` : ""}${
            compact.durationMinutes !== null ? ` (${compact.durationMinutes} min)` : ""
          }${item.isActive ? "" : " - inactive"}.`,
          item: {
            ...compact,
            description: item.description ?? null,
            deposit: money(item.deposit),
            isTaxable: item.isTaxable,
            isAvailableAllLocations: item.isAvailableAllLocations,
            locations: item.locations?.map((l) => ({ id: l.id, name: l.name })) ?? [],
            modifiers: item.modifiers ?? [],
          },
        });
      }),
  );
}
