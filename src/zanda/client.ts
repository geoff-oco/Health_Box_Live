/**
 * The Zanda API client the only file that can actually fetch from Zanda.
 */

import { errorFromStatus, type ProblemDetails, ZandaApiError } from "./errors";
import { fetchWithRetryOn429, type RetryOptions } from "./rate-limit";

/** lightweight payloads */
const ZANDA_MEDIA_TYPE = "application/vnd.zandaapi+json";

/** Anything undefined is omitted from the URL */
export type QueryParams = Record<string, string | number | boolean | undefined>;

/** Best-effort parse of an error body as problem details; null if not JSON. */
async function problemFromResponse(response: Response): Promise<ProblemDetails | null> {
  try {
    const body: unknown = await response.json();
    return typeof body === "object" && body !== null ? (body as ProblemDetails) : null;
  } catch {
    return null;
  }
}

export interface Page<T> {
  items: T[];
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

interface SingleEnvelope<T> {
  data: T;
}

interface PagedEnvelope<T> {
  items: SingleEnvelope<T>[];
  page: number | string;
  pageSize: number | string;
  hasNextPage: boolean;
}

/**
 * Read only surface
 */
export interface ZandaReader {
  getResource<T>(path: string, query?: QueryParams): Promise<T>;
  listResource<T>(path: string, query?: QueryParams): Promise<Page<T>>;
}

export interface ZandaClientOptions {
  /** Practice API key, never logged. */
  apiKey: string;
  /** Regional origin */
  baseUrl: string;
  /**
   * IANA timezone (e.g. "Australia/Perth") sent as X-Time-Zone. Zanda
   * interprets date filters in this timezone; omitted means UTC, which
   * shifts day boundaries away from the practice's local day.
   */
  timeZone?: string;
  /** Injectable for tests and defaults to the global fetch. */
  fetchImpl?: typeof fetch;
  retryOptions?: RetryOptions;
}

/**
 * Zanda rejects bare dates in its date filters ("'2026-07-20' is not a valid
 * datetime. Expected format: yyyy-MM-ddTHH:mm:ss"), so bare-date values are
 * widened here to cover that whole local day: *From/modifiedSince from
 * midnight, *To to end of day.
 */
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function normaliseDateParam(key: string, value: string): string {
  if (!DATE_ONLY_PATTERN.test(value)) {
    return value;
  }
  return key.endsWith("To") ? `${value}T23:59:59` : `${value}T00:00:00`;
}

const DATE_PARAM_KEYS: ReadonlySet<string> = new Set(["dateFrom", "dateTo", "modifiedSince"]);

export class ZandaClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeZone: string | undefined;
  private readonly fetchImpl: typeof fetch;
  private readonly retryOptions: RetryOptions;

  constructor(options: ZandaClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.timeZone = options.timeZone;
    this.fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);
    this.retryOptions = options.retryOptions ?? {};
  }

  /** GET a single resource and unwrap data. */
  async getResource<T>(path: string, query?: QueryParams): Promise<T> {
    const envelope = await this.request<SingleEnvelope<T>>(path, query);
    return envelope.data;
  }

  /** GET one page of a collection, unwrapped. */
  async listResource<T>(path: string, query?: QueryParams): Promise<Page<T>> {
    const envelope = await this.request<PagedEnvelope<T>>(path, query);
    return {
      items: envelope.items.map((item) => item.data),
      page: Number(envelope.page),
      pageSize: Number(envelope.pageSize),
      hasNextPage: envelope.hasNextPage,
    };
  }

  /**
   * Pagination helper which yields page after page until Zanda reports no more
   */
  async *pages<T>(path: string, query: QueryParams = {}, maxPages = 10): AsyncGenerator<Page<T>> {
    let pageNumber = typeof query.page === "number" ? query.page : 1;

    for (let fetched = 0; fetched < maxPages; fetched++) {
      const page = await this.listResource<T>(path, { ...query, page: pageNumber });
      yield page;
      if (!page.hasNextPage) {
        return;
      }
      pageNumber++;
    }
  }

  private async request<T>(path: string, query?: QueryParams): Promise<T> {
    const url = this.buildUrl(path, query);

    const response = await fetchWithRetryOn429(
      () =>
        this.fetchImpl(url, {
          method: "GET",
          headers: {
            "X-API-KEY": this.apiKey,
            Accept: ZANDA_MEDIA_TYPE,
            ...(this.timeZone !== undefined ? { "X-Time-Zone": this.timeZone } : {}),
          },
        }),
      this.retryOptions,
    );

    if (!response.ok) {
      throw errorFromStatus(response.status, await problemFromResponse(response));
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new ZandaApiError("unexpected", response.status);
    }
  }

  private buildUrl(path: string, query?: QueryParams): string {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== undefined) {
        const serialised = String(value);
        url.searchParams.set(
          key,
          DATE_PARAM_KEYS.has(key) ? normaliseDateParam(key, serialised) : serialised,
        );
      }
    }
    return url.toString();
  }
}
