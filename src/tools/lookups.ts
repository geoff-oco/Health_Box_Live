/**
 * Lookup toolsfor smal reference lists like marketing our own customs, genders, etc.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ZandaReader } from "../zanda/client";
import type { components } from "../zanda/types";
import { jsonResult, runTool } from "./output";
import { customProfileFieldListShape, type LookupType, lookupListShape } from "./schemas";

/**
 * The common shape all nine lookup lists share. payment-methods and
 * pronouns carry a few extra fields; the summariser passes the useful
 * ones through when present.
 */
interface LookupValue {
  id?: number | string;
  name: string;
  isActive: boolean;
  isIntegrated?: boolean;
}

type CustomProfileField = components["schemas"]["CustomProfileFieldResponseNoLinks"];

const LOOKUP_PATHS: Record<LookupType, string> = {
  "client-classifications": "/api/v1/client-classifications",
  "custom-categories": "/api/v1/custom-categories",
  "custom-statuses": "/api/v1/custom-statuses",
  "marketing-sources": "/api/v1/marketing-sources",
  "payment-methods": "/api/v1/payment-methods",
  sexes: "/api/v1/sexes",
  genders: "/api/v1/genders",
  "gender-identities": "/api/v1/gender-identities",
  pronouns: "/api/v1/pronouns",
};

function summariseLookupValue(value: LookupValue) {
  return {
    id: value.id,
    name: value.name,
    isActive: value.isActive,
    // Only payment-methods and pronouns have this, ill omit it elsewhere
    ...(value.isIntegrated !== undefined ? { isIntegrated: value.isIntegrated } : {}),
  };
}

export function registerLookupTools(server: McpServer, getClient: () => ZandaReader): void {
  server.registerTool(
    "list_lookup_values",
    {
      title: "List reference/lookup values",
      description:
        "Lists one of the practice's reference lists, chosen with `type`: " +
        "'client-classifications', 'custom-categories', 'custom-statuses', " +
        "'marketing-sources', 'payment-methods', 'sexes', 'genders', 'gender-identities', " +
        "or 'pronouns'. Use it to translate an ID from another tool into a name (e.g. a " +
        "payment's methodId) or to see what values exist before filtering. Returns JSON " +
        "with: summary, items (id, name, isActive; payment-methods also get isIntegrated - " +
        "true means processed by a provider like Stripe/Tyro), page, pageSize, hasNextPage. " +
        "These are practice configuration lists - no client (patient) data.",
      inputSchema: lookupListShape,
    },
    async ({ type, page, pageSize, isActive }) =>
      runTool("list_lookup_values", async () => {
        const result = await getClient().listResource<LookupValue>(LOOKUP_PATHS[type], {
          page,
          pageSize,
          isActive,
        });

        return jsonResult({
          summary: `Found ${result.items.length} ${type} value(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          type,
          items: result.items.map(summariseLookupValue),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );

  server.registerTool(
    "list_custom_profile_fields",
    {
      title: "List custom profile fields",
      description:
        "Lists the custom fields this practice has added to its profile forms (for clients, " +
        "referrers, contacts, third parties). Use it to learn what extra information the " +
        "practice records and what values a choice field allows. Returns JSON with: " +
        "summary, items (id, name, type - one of Input/TextArea/Select/MultiSelect/Toggle/" +
        "Numeric/Date, options - the selectable values for choice fields, profileRoles - " +
        "which profile kinds use the field, isActive), page, pageSize, hasNextPage. This is " +
        "the field DEFINITIONS only, never a client's answers.",
      inputSchema: customProfileFieldListShape,
    },
    async ({ page, pageSize, isActive }) =>
      runTool("list_custom_profile_fields", async () => {
        const result = await getClient().listResource<CustomProfileField>(
          "/api/v1/custom-profile-fields",
          { page, pageSize, isActive },
        );

        return jsonResult({
          summary: `Found ${result.items.length} custom profile field(s) on page ${result.page}${
            result.hasNextPage ? "; more pages available" : "; no more pages"
          }.`,
          items: result.items.map((field) => ({
            id: field.id,
            name: field.name,
            type: field.type,
            options: field.options.filter((o) => o.isVisible).map((o) => o.value),
            profileRoles: field.profileRoles,
            isActive: field.isActive,
          })),
          page: result.page,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
        });
      }),
  );
}
