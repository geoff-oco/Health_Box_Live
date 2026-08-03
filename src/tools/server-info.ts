/**
 * connection check for user quick validation.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonResult } from "./output";

export const SERVER_NAME = "zanda-mcp-server";
export const SERVER_VERSION = "0.1.0";

export function registerServerInfoTool(server: McpServer): void {
  server.registerTool(
    "server_info",
    {
      title: "Server information",
      description:
        "Returns the name, version, and status of this MCP server. " +
        "Use it to confirm the connection is working. " +
        "It takes no input and touches no external data.",
      inputSchema: {},
    },
    async () =>
      jsonResult({
        name: SERVER_NAME,
        version: SERVER_VERSION,
        message:
          "Zanda MCP server is running. Available tool domains: practitioners, clients, " +
          "appointments, and invoices - each has a list_* and get_* tool.",
      }),
  );
}
