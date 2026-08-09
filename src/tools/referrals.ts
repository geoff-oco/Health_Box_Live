/**
 * Referral tools are primarily linked to referrer.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ToolInputError } from "../lib/redact";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { errorResult, jsonResult, runTool } from "./output";
import { dateRangeError, idShape, referralListShape } from "./schemas";

type Referral = components["schemas"]["ReferralResponseNoLinks"];

function summariseReferral(referral: Referral) {
  return {
    id: referral.id,
    referrerName: referral.name,
    referrerType: referral.referrerType ?? null,
    providerNumber: referral.providerNumber,
    startDate: referral.startDate,
    endDate: referral.endDate,
    clientId: referral.client?.id ?? null,
    isActive: referral.isActive,
  };
}

export function registerReferralTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_referrals",
    {
      title: "List referrals",
      description:
        "Lists referrals (who sent a client to the practice, e.g. a GP, and the dates the " +
        "referral is valid), paginated. Use it to find a client's referral (clientId), " +
        "referrals starting or expiring in a date range (startDateFrom/To, endDateFrom/To, " +
        "inclusive, YYYY-MM-DD - useful for 'referrals expiring soon'), or active referrals. " +
        "Returns JSON with: summary, items (id, referrerName, referrerType e.g. 'General " +
        "Practitioner', providerNumber, startDate, endDate, clientId, isActive), page, " +
        "pageSize, hasNextPage. Links to client records - fetch only what the task needs.",
      inputSchema: referralListShape,
    },
    async ({
      page,
      pageSize,
      clientId,
      startDateFrom,
      startDateTo,
      endDateFrom,
      endDateTo,
      isActive,
    }) =>
      runTool("list_referrals", async () => {
        const rangeProblem =
          dateRangeError(startDateFrom, startDateTo, "startDateFrom", "startDateTo") ??
          dateRangeError(endDateFrom, endDateTo, "endDateFrom", "endDateTo");
        if (rangeProblem !== null) {
          return errorResult(new ToolInputError(rangeProblem));
        }

        const result = await getClient().listResource<Referral>("/api/v1/referrals", {
          page,
          pageSize,
          clientId,
          startDateFrom,
          startDateTo,
          endDateFrom,
          endDateTo,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} referral(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map(summariseReferral),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "get_referral",
    {
      title: "Get a referral by ID",
      description:
        "Fetches one referral by its numeric Zanda ID (find IDs with list_referrals). " +
        "Returns JSON with: summary and referral (id, referrerName, referrerType, " +
        "providerNumber, startDate, endDate - the validity window, clientId, isActive). " +
        "Resolve clientId with get_client. Links to a client record - fetch only when the " +
        "task requires it.",
      inputSchema: idShape,
    },
    async ({ id }) =>
      runTool("get_referral", async () => {
        const referral = await getClient().getResource<Referral>(`/api/v1/referrals/${id}`);

        return jsonResult({
          summary: `Referral from ${referral.name}${
            referral.referrerType ? ` (${referral.referrerType})` : ""
          }, valid ${referral.startDate ?? "unknown"} to ${referral.endDate ?? "open-ended"}.`,
          referral: summariseReferral(referral),
        });
      }),
  );
}
