import { describe, expect, it, vi } from "vitest";
import { type Page, ZandaClient } from "../../src/zanda/client";
import { ZandaApiError } from "../../src/zanda/errors";

const API_KEY = "test-zanda-key-never-logged";
const BASE_URL = "https://zanda.test";

interface Practitioner {
  id: number;
  firstName: string;
  lastName: string;
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/vnd.zandaapi+json", ...headers },
  });
}

function clientWithResponses(...responses: Response[]) {
  const fetchImpl = vi.fn(async () => {
    const next = responses.shift();
    if (next === undefined) {
      throw new Error("test made more requests than scripted responses");
    }
    return next;
  });
  const client = new ZandaClient({
    apiKey: API_KEY,
    baseUrl: BASE_URL,
    fetchImpl: fetchImpl as unknown as typeof fetch,
    retryOptions: { sleep: () => Promise.resolve() }, // no real waiting
  });
  return { client, fetchImpl };
}

describe("ZandaClient requests", () => {
  it("sends the API key, lightweight media type, and correct URL", async () => {
    const { client, fetchImpl } = clientWithResponses(
      jsonResponse({ data: { id: 1, firstName: "Jane", lastName: "Smith" } }),
    );

    await client.getResource<Practitioner>("/api/v1/practitioners/1");

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://zanda.test/api/v1/practitioners/1");
    const headers = init.headers as Record<string, string>;
    expect(headers["X-API-KEY"]).toBe(API_KEY);
    expect(headers.Accept).toBe("application/vnd.zandaapi+json");
    expect(init.method).toBe("GET");
  });

  it("widens bare-date filters to Zanda's required datetime format", async () => {
    const { client, fetchImpl } = clientWithResponses(
      jsonResponse({ items: [], page: 1, pageSize: 100, hasNextPage: false }),
    );

    await client.listResource("/api/v1/appointments", {
      dateFrom: "2026-07-20",
      dateTo: "2026-07-20",
      modifiedSince: "2026-07-01",
    });

    const [url] = fetchImpl.mock.calls[0] as unknown as [string];
    const params = new URL(url).searchParams;
    expect(params.get("dateFrom")).toBe("2026-07-20T00:00:00");
    expect(params.get("dateTo")).toBe("2026-07-20T23:59:59");
    expect(params.get("modifiedSince")).toBe("2026-07-01T00:00:00");
  });

  it("passes full datetimes through untouched", async () => {
    const { client, fetchImpl } = clientWithResponses(
      jsonResponse({ items: [], page: 1, pageSize: 100, hasNextPage: false }),
    );

    await client.listResource("/api/v1/appointments", { dateFrom: "2026-07-20T09:30:00" });

    const [url] = fetchImpl.mock.calls[0] as unknown as [string];
    expect(new URL(url).searchParams.get("dateFrom")).toBe("2026-07-20T09:30:00");
  });

  it("sends X-Time-Zone only when a timezone is configured", async () => {
    const withTz = clientWithResponses(jsonResponse({ data: { id: 1 } }));
    const clientTz = new ZandaClient({
      apiKey: API_KEY,
      baseUrl: BASE_URL,
      timeZone: "Australia/Perth",
      fetchImpl: withTz.fetchImpl as unknown as typeof fetch,
    });
    await clientTz.getResource("/api/v1/practitioners/1");
    const [, initTz] = withTz.fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect((initTz.headers as Record<string, string>)["X-Time-Zone"]).toBe("Australia/Perth");

    const { client, fetchImpl } = clientWithResponses(jsonResponse({ data: { id: 1 } }));
    await client.getResource("/api/v1/practitioners/1");
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.headers as Record<string, string>).not.toHaveProperty("X-Time-Zone");
  });

  it("serialises query params and omits undefined ones", async () => {
    const { client, fetchImpl } = clientWithResponses(
      jsonResponse({ items: [], page: 1, pageSize: 10, hasNextPage: false }),
    );

    await client.listResource("/api/v1/practitioners", {
      isActive: true,
      page: 2,
      profession: undefined,
    });

    const [url] = fetchImpl.mock.calls[0] as unknown as [string];
    expect(url).toContain("isActive=true");
    expect(url).toContain("page=2");
    expect(url).not.toContain("profession");
  });

  it("tolerates a trailing slash in the configured base URL", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse({ data: { id: 1 } }));
    const client = new ZandaClient({
      apiKey: API_KEY,
      baseUrl: "https://zanda.test///",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });

    await client.getResource("/api/v1/locations/1");

    const [url] = fetchImpl.mock.calls[0] as unknown as [string];
    expect(url).toBe("https://zanda.test/api/v1/locations/1");
  });
});

describe("ZandaClient envelope unwrapping", () => {
  it("unwraps the single-resource data envelope", async () => {
    const { client } = clientWithResponses(
      jsonResponse({ data: { id: 7, firstName: "Alex", lastName: "Chen" } }),
    );

    const practitioner = await client.getResource<Practitioner>("/api/v1/practitioners/7");

    expect(practitioner).toEqual({ id: 7, firstName: "Alex", lastName: "Chen" });
  });

  it("unwraps collection items and normalises page numbers", async () => {
    const { client } = clientWithResponses(
      jsonResponse({
        items: [
          { data: { id: 1, firstName: "A", lastName: "A" } },
          { data: { id: 2, firstName: "B", lastName: "B" } },
        ],
        page: "2", // Zanda may send these as strings
        pageSize: "10",
        hasNextPage: true,
      }),
    );

    const page = await client.listResource<Practitioner>("/api/v1/practitioners");

    expect(page.items.map((p) => p.id)).toEqual([1, 2]);
    expect(page.page).toBe(2);
    expect(page.pageSize).toBe(10);
    expect(page.hasNextPage).toBe(true);
  });

  it("throws 'unexpected' if the body is not JSON", async () => {
    const { client } = clientWithResponses(new Response("<html>gateway</html>", { status: 200 }));

    await expect(client.getResource("/api/v1/practitioners/1")).rejects.toMatchObject({
      kind: "unexpected",
    });
  });
});

describe("ZandaClient error mapping", () => {
  it.each([
    [400, "bad_request"],
    [401, "unauthorized"],
    [403, "forbidden"],
    [404, "not_found"],
    [500, "server_error"],
    [503, "server_error"],
  ])("maps HTTP %i to kind '%s'", async (status, kind) => {
    const { client } = clientWithResponses(jsonResponse({ title: "problem" }, status));

    await expect(client.getResource("/api/v1/practitioners/1")).rejects.toMatchObject({
      kind,
      status,
    });
  });

  it("maps an exhausted 429 to 'rate_limited'", async () => {
    const rateLimited = () => jsonResponse({ title: "Too Many Requests" }, 429);
    const { client, fetchImpl } = clientWithResponses(
      rateLimited(),
      rateLimited(),
      rateLimited(),
      rateLimited(),
    );

    await expect(client.getResource("/api/v1/practitioners/1")).rejects.toMatchObject({
      kind: "rate_limited",
      status: 429,
    });
    expect(fetchImpl).toHaveBeenCalledTimes(4);
  });

  it("recovers when a retry succeeds", async () => {
    const { client, fetchImpl } = clientWithResponses(
      jsonResponse({ title: "Too Many Requests" }, 429, { "Retry-After": "1" }),
      jsonResponse({ data: { id: 5, firstName: "R", lastName: "L" } }),
    );

    const practitioner = await client.getResource<Practitioner>("/api/v1/practitioners/5");

    expect(practitioner.id).toBe(5);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("captures Zanda's problem details for logs but keeps the message generic", async () => {
    const { client } = clientWithResponses(
      jsonResponse(
        {
          title: "One or more validation errors occurred.",
          errors: { dateFrom: ["The value '20-07-2026' is not valid."] },
        },
        400,
      ),
    );

    try {
      await client.getResource("/api/v1/appointments");
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ZandaApiError);
      const zandaError = error as ZandaApiError;
      expect(zandaError.zandaDetail).toBe(
        "One or more validation errors occurred. | dateFrom: The value '20-07-2026' is not valid.",
      );
      // The client-facing message stays the trusted generic sentence.
      expect(zandaError.message).not.toContain("dateFrom");
    }
  });

  it("tolerates non-JSON error bodies (zandaDetail stays null)", async () => {
    const { client } = clientWithResponses(
      new Response("<html>403 Forbidden</html>", { status: 403 }),
    );

    await expect(client.getResource("/api/v1/locations/1")).rejects.toMatchObject({
      kind: "forbidden",
      zandaDetail: null,
    });
  });

  it("error messages never contain the API key", async () => {
    const { client } = clientWithResponses(jsonResponse({ title: "nope" }, 401));

    try {
      await client.getResource("/api/v1/practitioners/1");
      expect.unreachable("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ZandaApiError);
      expect((error as Error).message).not.toContain(API_KEY);
      expect((error as Error).stack ?? "").not.toContain(API_KEY);
    }
  });
});

describe("ZandaClient pagination helper", () => {
  function pageResponse(ids: number[], page: number, hasNextPage: boolean): Response {
    return jsonResponse({
      items: ids.map((id) => ({ data: { id, firstName: `P${id}`, lastName: "X" } })),
      page,
      pageSize: 2,
      hasNextPage,
    });
  }

  it("walks pages until hasNextPage is false", async () => {
    const { client, fetchImpl } = clientWithResponses(
      pageResponse([1, 2], 1, true),
      pageResponse([3, 4], 2, true),
      pageResponse([5], 3, false),
    );

    const pages: Page<Practitioner>[] = [];
    for await (const page of client.pages<Practitioner>("/api/v1/practitioners")) {
      pages.push(page);
    }

    expect(pages.map((p) => p.items.map((i) => i.id))).toEqual([[1, 2], [3, 4], [5]]);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    // Consecutive page params were requested.
    const urls = (fetchImpl.mock.calls as unknown as [string][]).map(([u]) => u);
    expect(urls[0]).toContain("page=1");
    expect(urls[1]).toContain("page=2");
    expect(urls[2]).toContain("page=3");
  });

  it("stops at maxPages even if Zanda reports more", async () => {
    const { client, fetchImpl } = clientWithResponses(
      pageResponse([1], 1, true),
      pageResponse([2], 2, true),
      pageResponse([3], 3, true),
    );

    const seen: number[][] = [];
    for await (const page of client.pages<Practitioner>("/api/v1/practitioners", {}, 3)) {
      seen.push(page.items.map((i) => i.id));
    }

    expect(seen).toEqual([[1], [2], [3]]);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });
});
