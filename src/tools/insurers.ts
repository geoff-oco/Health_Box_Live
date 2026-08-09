/**
 * Client insurer details tools.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { idShape, insurerListShape } from "./schemas";

type Insurer = components["schemas"]["InsurerResponseNoLinks"];

function summariseInsurer(insurer: Insurer) {
  return {
    id: insurer.id,
    name: insurer.name,
    scheme: insurer.scheme ?? null,
    isActive: insurer.isActive,
  };
}

export function registerInsurerTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_insurers",
    {
      title: "List insurers",
      description:
        "Lists the insurers and funding schemes the health practice bills (e.g. Medicare, " +
        "DVA, NDIS, private funds), paginated. Use it to resolve an insurer ID from an " +
        "invoice or to answer 'which insurers/schemes does the practice work with'. Returns " +
        "JSON with: summary, items (id, name, scheme e.g. 'Medicare (Aust)'/'NDIS'/" +
        "'Standard', isActive), page, pageSize, hasNextPage. Contains no client data.",
      inputSchema: insurerListShape,
    },
    async ({ page, pageSize, isActive }) =>
      runTool("list_insurers", async () => {
        const result = await getClient().listResource<Insurer>("/api/v1/insurers", {
          page,
          pageSize,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} insurer(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseInsurer),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_insurer",
    {
      title: "Get an insurer by ID",
      description:
        "Fetches one insurer by its numeric Zanda ID (find IDs with list_insurers). Returns " +
        "JSON with: summary and insurer (id, name, scheme, isActive). Contains no client " +
        "data.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_insurer", async () => {
        const insurer = await getClient().getResource<Insurer>(`/api/v1/insurers/${id}`);

        return jsonResult({
          summary: `Insurer ${insurer.name}${insurer.scheme ? ` (${insurer.scheme})` : ""}${
            insurer.isActive ? "" : " - inactive"
          }.`,
          insurer: summariseInsurer(insurer),
        });
      }),
  );
}
