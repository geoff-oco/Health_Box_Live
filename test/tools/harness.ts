/**
 * a real MCP client/server pair connected
 * in-memory, with the Zanda layer replaced by a scripted fake.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { registerSanitisedTools } from "../../src/mcp/register-sanitised-tools";
import { registerAllTools } from "../../src/mcp/register-tools";
import type { Page, QueryParams, ZandaReader } from "../../src/zanda/client";

export interface FakeCall {
  kind: "get" | "list";
  path: string;
  query: QueryParams | undefined;
}

/** A ZandaReader whose answers are scripted and whose calls are recorded. */
export class FakeZanda implements ZandaReader {
  calls: FakeCall[] = [];
  getHandler: (path: string) => unknown = () => {
    throw new Error("no get scripted");
  };
  listHandler: (path: string, query?: QueryParams) => Page<unknown> = () => {
    throw new Error("no list scripted");
  };

  async getResource<T>(path: string, query?: QueryParams): Promise<T> {
    this.calls.push({ kind: "get", path, query });
    return this.getHandler(path) as T;
  }

  async listResource<T>(path: string, query?: QueryParams): Promise<Page<T>> {
    this.calls.push({ kind: "list", path, query });
    return this.listHandler(path, query) as Page<T>;
  }
}

/** Connects a real MCP client to a server whose tools use the fake. */
export async function connectHarness(
  getClient: () => ZandaReader,
  register: (server: McpServer, getClient: () => ZandaReader) => void = registerAllTools,
): Promise<Client> {
  const server = new McpServer({ name: "test-server", version: "0.0.0" });
  register(server, getClient);

  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test-client", version: "0.0.0" });
  await Promise.all([
    server.connect(serverTransport as Transport),
    client.connect(clientTransport as Transport),
  ]);
  return client;
}

/** mcp/sanitised catalogue registered. */
export function connectSanitisedHarness(getClient: () => ZandaReader): Promise<Client> {
  return connectHarness(getClient, registerSanitisedTools);
}

export function payloadOf(result: unknown): Record<string, unknown> {
  const content = (result as { content: Array<{ type: string; text: string }> }).content;
  if (content.length !== 1 || content[0]?.type !== "text") {
    throw new Error("expected exactly one text content block");
  }
  return JSON.parse(content[0].text) as Record<string, unknown>;
}

export function pageOf<T>(items: T[], page = 1, pageSize = 10, hasNextPage = false): Page<T> {
  return { items, page, pageSize, hasNextPage };
}
