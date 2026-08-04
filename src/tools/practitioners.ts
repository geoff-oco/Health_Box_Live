/**
 * Look up practitioners on Zanda
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { idShape, practitionerListShape } from "./schemas";

type Practitioner = components["schemas"]["PractitionerResponseNoLinks"];

function summarisePractitioner(p: Practitioner) {
  return {
    id: p.id,
    displayName: p.displayName,
    profession: p.profession,
    jobTitle: p.jobTitle,
    emailAddress: p.emailAddress,
    isActive: p.isActive,
  };
}

export function registerPractitionerTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_practitioners",
    {
      title: "List practitioners",
      description:
        "Lists practitioners (the clinicians/providers who deliver services) at the health " +
        "practice. Use it to find a practitioner's ID, see who works at the practice, or " +
        "check whether someone is active. Supports optional exact-match filters and " +
        "pagination. Returns JSON with: summary (human-readable one-liner), items (array of " +
        "practitioners: id, displayName, profession, jobTitle, emailAddress, isActive), " +
        "page, pageSize, and hasNextPage (true means ask for the next page if more are needed).",
      inputSchema: practitionerListShape,
    },
    async ({ page, pageSize, isActive, profession, jobTitle, emailAddress }) =>
      runTool("list_practitioners", async () => {
        const result = await getClient().listResource<Practitioner>("/api/v1/practitioners", {
          page,
          pageSize,
          isActive,
          profession,
          jobTitle,
          emailAddress,
        });

        return jsonResult({
          summary: `Found ${result.items.length} practitioner(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summarisePractitioner),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_practitioner",
    {
      title: "Get a practitioner by ID",
      description:
        "Fetches full details of one practitioner by their numeric Zanda ID (get the ID from " +
        "list_practitioners first if you only have a name). Returns JSON with: summary and " +
        "practitioner (id, displayName, legalName, profession, jobTitle, emailAddress, " +
        "mobileTelephone, isActive, lastModified).",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_practitioner", async () => {
        const p = await getClient().getResource<Practitioner>(`/api/v1/practitioners/${id}`);

        return jsonResult({
          summary: `Practitioner ${p.displayName ?? `#${p.id}`}${
            p.profession ? ` (${p.profession})` : ""
          }${p.isActive === false ? " - inactive" : ""}.`,
          practitioner: {
            id: p.id,
            displayName: p.displayName,
            legalName: p.legalName,
            profession: p.profession,
            jobTitle: p.jobTitle,
            emailAddress: p.emailAddress,
            mobileTelephone: p.mobileTelephone,
            isActive: p.isActive,
            lastModified: p.lastModified,
          },
        });
      }),
  );
}
