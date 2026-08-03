import { SELF } from "cloudflare:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import type { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

function createTestClient(path = "/mcp", token = "test-token-claude") {
  const transport = new StreamableHTTPClientTransport(new URL(`https://example.com${path}`), {
    fetch: (url, init) => SELF.fetch(String(url), init),
    requestInit: { headers: { Authorization: `Bearer ${token}` } },
  });
  const client = new Client({ name: "test-client", version: "0.0.0" });
  return { client, transport };
}

describe("MCP server at /mcp", () => {
  let client: Client;
  let transport: StreamableHTTPClientTransport;

  beforeEach(async () => {
    ({ client, transport } = createTestClient());
    await client.connect(transport as Transport);
  });

  afterEach(async () => {
    await transport.close();
  });

  it("completes the MCP handshake and reports its identity", () => {
    const serverInfo = client.getServerVersion();

    expect(serverInfo?.name).toBe("zanda-mcp-server");
    expect(serverInfo?.version).toBe("0.1.0");
  });

  it("lists the full tool catalogue", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name).sort();

    expect(names).toEqual([
      "check_clinic_availability",
      "get_appointment",
      "get_billable_item",
      "get_client",
      "get_insurer",
      "get_invoice",
      "get_location",
      "get_payment",
      "get_practitioner",
      "get_referral",
      "list_appointments",
      "list_billable_items",
      "list_clients",
      "list_custom_profile_fields",
      "list_insurers",
      "list_invoices",
      "list_locations",
      "list_lookup_values",
      "list_payments",
      "list_practitioners",
      "list_referrals",
      "server_info",
    ]);
    for (const tool of tools) {
      expect(tool.description?.length ?? 0).toBeGreaterThan(80);
    }
  });

  it("reports Zanda tools as unconfigured without breaking the session", async () => {
    const result = await client.callTool({ name: "list_practitioners", arguments: {} });
    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ type: string; text: string }>;
    expect(block?.text).toContain("ZANDA_API_KEY");

    const info = await client.callTool({ name: "server_info", arguments: {} });
    expect(info.isError).toBeFalsy();
  });

  it("calls server_info and gets structured JSON back", async () => {
    const result = await client.callTool({ name: "server_info", arguments: {} });

    const content = result.content as Array<{ type: string; text: string }>;
    expect(content).toHaveLength(1);
    expect(content[0]?.type).toBe("text");

    const payload = JSON.parse(content[0]?.text ?? "");
    expect(payload).toMatchObject({
      name: "zanda-mcp-server",
      version: "0.1.0",
    });
    expect(payload.message).toContain("running");
  });
});

describe("MCP server at /mcp/sanitised", () => {
  let client: Client;
  let transport: StreamableHTTPClientTransport;

  beforeEach(async () => {
    ({ client, transport } = createTestClient("/mcp/sanitised", "test-token-kiosk"));
    await client.connect(transport as Transport);
  });

  afterEach(async () => {
    await transport.close();
  });

  it("identifies itself as the sanitised server", () => {
    expect(client.getServerVersion()?.name).toBe("zanda-mcp-server-sanitised");
  });

  it("lists only the sanitised catalogue - no client/invoice/payment tools", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name).sort();

    expect(names).toEqual([
      "check_appointments",
      "check_clinic_availability",
      "get_billable_item",
      "get_insurer",
      "get_location",
      "get_practitioner",
      "list_billable_items",
      "list_custom_profile_fields",
      "list_insurers",
      "list_locations",
      "list_lookup_values",
      "list_practitioners",
      "server_info",
    ]);
    for (const tool of tools) {
      expect(tool.description?.length ?? 0).toBeGreaterThan(80);
    }
  });
});

describe("/mcp transport rules", () => {
  it("rejects a plain GET: unauthenticated requests hit the auth gate first", async () => {
    const response = await SELF.fetch("https://example.com/mcp");

    expect(response.status).toBe(401);
  });
});
