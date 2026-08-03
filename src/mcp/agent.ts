import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { getZandaConfig } from "../lib/env";
import { SERVER_NAME, SERVER_VERSION } from "../tools/server-info";
import { ZandaClient, type ZandaReader } from "../zanda/client";
import { registerSanitisedTools } from "./register-sanitised-tools";
import { registerAllTools } from "./register-tools";

/**
 * The MCP agent for the server. Each connected client session gets its own
 * instance, backed by a durable Object.
 *
 * The ZandaClient is created on first call that needs it
 */
export class ZandaMcpAgent extends McpAgent<Env> {
  server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  #zandaClient: ZandaReader | undefined;

  async init(): Promise<void> {
    registerAllTools(this.server, () => {
      this.#zandaClient ??= new ZandaClient(getZandaConfig(this.env));
      return this.#zandaClient;
    });
  }

  /**
   * Disable resumability, default event store may hold private info,
   * storee in durable object until response complete.
   */
  protected override getEventStore(): undefined {
    return undefined;
  }
}

/**
 * The sanitised agent, can never hold patient information.
 */
export class SanitisedZandaMcpAgent extends McpAgent<Env> {
  server = new McpServer({
    name: `${SERVER_NAME}-sanitised`,
    version: SERVER_VERSION,
  });

  #zandaClient: ZandaReader | undefined;

  async init(): Promise<void> {
    registerSanitisedTools(this.server, () => {
      this.#zandaClient ??= new ZandaClient(getZandaConfig(this.env));
      return this.#zandaClient;
    });
  }

  /** Same no data at rest guarantee as ZandaMcpAgent */
  protected override getEventStore(): undefined {
    return undefined;
  }
}
