/**
 * Client-safe errors for the Zanda API layer.
 */

export type ZandaErrorKind =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limited"
  | "server_error"
  | "unexpected";

/** RFC 7807 problem body sent by Zanda. */
export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  status?: number | string | null;
  detail?: string | null;
  instance?: string | null;
  /** ASP.NET validation problems: field name -> message(s). */
  errors?: Record<string, unknown> | null;
}

const MESSAGES: Record<ZandaErrorKind, string> = {
  bad_request: "Zanda rejected the request as invalid. Check the filter and pagination values.",
  unauthorized:
    "Zanda rejected the server's API key. The practice needs to check ZANDA_API_KEY is current.",
  forbidden: "The server's Zanda API key does not have permission for this resource.",
  not_found: "No resource with that ID exists in Zanda.",
  rate_limited: "Zanda is rate limiting requests right now. Wait a moment and try again.",
  server_error: "Zanda had an internal problem serving this request. Try again shortly.",
  unexpected: "Unexpected response from Zanda.",
};

export class ZandaApiError extends Error {
  override name = "ZandaApiError";
  readonly kind: ZandaErrorKind;
  readonly status: number;
  /**
   * Zanda's own explanation of the failure (problem title/detail/field
   * errors). LOG PATH ONLY - never part of `message`, so it is never shown
   * to MCP clients.
   */
  readonly zandaDetail: string | null;

  constructor(kind: ZandaErrorKind, status: number, zandaDetail: string | null = null) {
    super(MESSAGES[kind]);
    this.kind = kind;
    this.status = status;
    this.zandaDetail = zandaDetail;
  }
}

function kindForStatus(status: number): ZandaErrorKind {
  switch (status) {
    case 400:
      return "bad_request";
    case 401:
      return "unauthorized";
    case 403:
      return "forbidden";
    case 404:
      return "not_found";
    case 429:
      return "rate_limited";
    default:
      return status >= 500 ? "server_error" : "unexpected";
  }
}

const MAX_DETAIL_LENGTH = 500;

/** Flattens a problem body into one bounded log line, or null if empty. */
export function detailFromProblem(problem: ProblemDetails | null | undefined): string | null {
  if (problem === null || problem === undefined) {
    return null;
  }
  const parts: string[] = [];
  if (typeof problem.title === "string" && problem.title !== "") {
    parts.push(problem.title);
  }
  if (typeof problem.detail === "string" && problem.detail !== "") {
    parts.push(problem.detail);
  }
  if (typeof problem.errors === "object" && problem.errors !== null) {
    for (const [field, messages] of Object.entries(problem.errors)) {
      const text = Array.isArray(messages) ? messages.join("; ") : String(messages);
      parts.push(`${field}: ${text}`);
    }
  }
  const joined = parts.join(" | ").replace(/\s+/g, " ").trim();
  return joined === "" ? null : joined.slice(0, MAX_DETAIL_LENGTH);
}

/**
 * Maps a failed Zanda response to a typed error.
 */
export function errorFromStatus(status: number, problem?: ProblemDetails | null): ZandaApiError {
  return new ZandaApiError(kindForStatus(status), status, detailFromProblem(problem));
}
