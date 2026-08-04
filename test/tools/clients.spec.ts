import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const ALEX = {
  id: 42,
  firstName: "Alex",
  lastName: "Nguyen",
  preferredName: "Al",
  dateOfBirth: "1990-05-04",
  emailAddress: "alex@example.test",
  mobileTelephone: "0411 111 111",
  homeTelephone: null,
  streetAddress: "1 Example St",
  city: "Sydney",
  state: "NSW",
  postalCode: "2000",
  country: "Australia",
  alertNote: "clinical alert - must not appear in tool output",
  isActive: true,
  isArchived: false,
  dateAdded: "2025-01-15",
  primaryPractitioner: { id: 7 },
};

describe("client tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_clients: happy path, compact items, summary first", async () => {
    fake.listHandler = () => pageOf([ALEX], 1, 10, false);

    const result = await client.callTool({ name: "list_clients", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    expect(payload.summary).toContain("1 client");
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 42,
      firstName: "Alex",
      lastName: "Nguyen",
      preferredName: "Al",
      emailAddress: "alex@example.test",
      mobileTelephone: "0411 111 111",
      isActive: true,
      isArchived: false,
    });
    // The clinical alert note must never appear in list output.
    expect(JSON.stringify(payload)).not.toContain("clinical alert");
  });

  it("list_clients: hits the client-profiles path with defaults and filters", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_clients",
      arguments: { isArchived: false, primaryPractitionerId: 7, page: 2 },
    });

    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/client-profiles",
      query: { page: 2, pageSize: 10, isArchived: false, primaryPractitionerId: 7 },
    });
  });

  it("list_clients: rejects a bad primaryPractitionerId before Zanda is touched", async () => {
    const result = await client.callTool({
      name: "list_clients",
      arguments: { primaryPractitionerId: 0 },
    });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });

  it("get_client: happy path with curated fields and practitioner id", async () => {
    fake.getHandler = () => ALEX;

    const result = await client.callTool({ name: "get_client", arguments: { id: 42 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/client-profiles/42" });
    expect(payload.summary).toContain("Alex Nguyen");
    expect(payload.summary).toContain("goes by Al");
    const c = payload.client as Record<string, unknown>;
    expect(c.primaryPractitionerId).toBe(7);
    expect(c.dateOfBirth).toBe("1990-05-04");
    expect(JSON.stringify(payload)).not.toContain("alertNote");
  });

  it("get_client: passes not_found through as a safe error", async () => {
    fake.getHandler = () => {
      throw new ZandaApiError("not_found", 404);
    };

    const result = await client.callTool({ name: "get_client", arguments: { id: 12345 } });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("No resource with that ID");
  });

  it("get_client: validation rejects a string id", async () => {
    const result = await client.callTool({ name: "get_client", arguments: { id: "42" } });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });
});
