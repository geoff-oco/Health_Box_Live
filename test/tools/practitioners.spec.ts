import type { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import { EnvError } from "../../src/lib/env";
import { ZandaApiError } from "../../src/zanda/errors";
import { connectHarness, FakeZanda, pageOf, payloadOf } from "./harness";

const JANE = {
  id: 1,
  displayName: "Dr Jane Smith",
  legalName: "Jane Alexandra Smith",
  profession: "Psychologist",
  jobTitle: "Clinical Psychologist",
  emailAddress: "jane@clinic.test",
  mobileTelephone: "0400 000 000",
  npiNumber: "should-not-appear-in-list",
  taxId: "should-not-appear-anywhere",
  isActive: true,
  lastModified: "2026-07-01T00:00:00",
};

describe("practitioner tools", () => {
  let fake: FakeZanda;
  let client: Client;

  beforeEach(async () => {
    fake = new FakeZanda();
    client = await connectHarness(() => fake);
  });

  it("list_practitioners: happy path with summary-first compact items", async () => {
    fake.listHandler = () => pageOf([JANE], 1, 10, true);

    const result = await client.callTool({ name: "list_practitioners", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBeFalsy();
    expect(Object.keys(payload)[0]).toBe("summary");
    expect(payload.summary).toContain("1 practitioner");
    expect(payload.summary).toContain("more pages available");
    expect(payload.hasNextPage).toBe(true);
    const items = payload.items as Array<Record<string, unknown>>;
    expect(items[0]).toEqual({
      id: 1,
      displayName: "Dr Jane Smith",
      profession: "Psychologist",
      jobTitle: "Clinical Psychologist",
      emailAddress: "jane@clinic.test",
      isActive: true,
    });
    expect(JSON.stringify(items)).not.toContain("taxId");
  });

  it("list_practitioners: defaults page=1 pageSize=10 and passes filters through", async () => {
    fake.listHandler = () => pageOf([]);

    await client.callTool({
      name: "list_practitioners",
      arguments: { isActive: true, profession: "Psychologist" },
    });

    expect(fake.calls).toHaveLength(1);
    expect(fake.calls[0]).toMatchObject({
      kind: "list",
      path: "/api/v1/practitioners",
      query: { page: 1, pageSize: 10, isActive: true, profession: "Psychologist" },
    });
  });

  it("list_practitioners: rejects an out-of-range pageSize before Zanda is touched", async () => {
    const result = await client.callTool({
      name: "list_practitioners",
      arguments: { pageSize: 500 },
    });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0); // validation failed first
  });

  it("get_practitioner: happy path builds URL from the id", async () => {
    fake.getHandler = () => JANE;

    const result = await client.callTool({ name: "get_practitioner", arguments: { id: 1 } });
    const payload = payloadOf(result);

    expect(fake.calls[0]).toMatchObject({ kind: "get", path: "/api/v1/practitioners/1" });
    expect(payload.summary).toContain("Dr Jane Smith");
    expect((payload.practitioner as Record<string, unknown>).legalName).toBe(
      "Jane Alexandra Smith",
    );
  });

  it("get_practitioner: rejects a non-positive id", async () => {
    const result = await client.callTool({ name: "get_practitioner", arguments: { id: -5 } });

    expect(result.isError).toBe(true);
    const [block] = result.content as Array<{ text: string }>;
    expect(block?.text).toMatch(/validation error/i);
    expect(fake.calls).toHaveLength(0);
  });

  it("passes Zanda errors through as safe isError results", async () => {
    fake.getHandler = () => {
      throw new ZandaApiError("not_found", 404);
    };

    const result = await client.callTool({ name: "get_practitioner", arguments: { id: 999 } });
    const payload = payloadOf(result);

    expect(result.isError).toBe(true);
    expect(payload.error).toContain("No resource with that ID");
  });

  it("surfaces rate limiting as a friendly try-again error", async () => {
    fake.listHandler = () => {
      throw new ZandaApiError("rate_limited", 429);
    };

    const result = await client.callTool({ name: "list_practitioners", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBe(true);
    expect(payload.error).toMatch(/rate limiting.*try again/i);
  });

  it("reports missing Zanda config as a clean error (server still usable)", async () => {
    const result = await (
      await connectHarness(() => {
        throw new EnvError("ZANDA_API_KEY is not set. Set it in .dev.vars locally");
      })
    ).callTool({ name: "list_practitioners", arguments: {} });

    expect(result.isError).toBe(true);
    expect(payloadOf(result).error).toContain("ZANDA_API_KEY");
  });

  it("redacts unexpected errors instead of leaking their message", async () => {
    fake.listHandler = () => {
      throw new Error("connect failed at https://internal.example/secret?key=abc123");
    };

    const result = await client.callTool({ name: "list_practitioners", arguments: {} });
    const payload = payloadOf(result);

    expect(result.isError).toBe(true);
    expect(payload.error).not.toContain("abc123");
    expect(payload.error).toContain("unexpected internal error");
  });
});
