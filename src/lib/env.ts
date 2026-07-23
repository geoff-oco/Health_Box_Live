/**
 * Test env values here and throw early error
 */

/** Thrown when required configuration is missing or malformed. */
export class EnvError extends Error {
  override name = "EnvError";
}

/**
 * Set token restrictions. "full" tokens may use both /mcp and
 * /mcp/sanitised; "sanitised" tokens may ONLY use /mcp/sanitised.
 */
export type TokenScope = "full" | "sanitised";

/** Create bearer token interface including what it can touch */
export interface BearerToken {
  token: string;
  scope: TokenScope;
}

/** Validated configuration derived from the Worker's environment. */
export interface AppConfig {
  /** Named bearer tokens MCP clients may present */
  bearerTokens: ReadonlyMap<string, BearerToken>;
  /** Origins allowed to make browser (CORS) requests. Empty means CORS off. */
  corsAllowedOrigins: readonly string[];
}

/** Token names like voiceflow or claude */
const TOKEN_NAME_PATTERN = /^[a-zA-Z0-9_-]+$/;

/**
 * Parser for bearer tokens secret from worker.
 */
export function parseBearerTokens(raw: string): Map<string, BearerToken> {
  const tokens = new Map<string, BearerToken>();

  for (const pair of raw.split(",")) {
    const trimmed = pair.trim();
    if (trimmed === "") {
      throw new EnvError(
        "MCP_BEARER_TOKENS contains an empty entry - expected comma-separated name:token pairs",
      );
    }

    const colon = trimmed.indexOf(":");
    if (colon === -1) {
      throw new EnvError(
        "MCP_BEARER_TOKENS has an entry without a ':' - expected comma-separated name:token pairs",
      );
    }

    const name = trimmed.slice(0, colon).trim();
    let scope: TokenScope = "full";
    let token = trimmed.slice(colon + 1).trim();

    for (const candidate of ["full", "sanitised"] as const) {
      if (token.startsWith(`${candidate}:`)) {
        scope = candidate;
        token = token.slice(candidate.length + 1).trim();
        break;
      }
    }

    if (!TOKEN_NAME_PATTERN.test(name)) {
      throw new EnvError(
        "MCP_BEARER_TOKENS has an invalid token name - use letters, digits, '-' and '_' only",
      );
    }
    if (token === "") {
      throw new EnvError(`MCP_BEARER_TOKENS entry "${name}" has an empty token`);
    }
    if (tokens.has(name)) {
      throw new EnvError(`MCP_BEARER_TOKENS has a duplicate token name "${name}"`);
    }

    tokens.set(name, { token, scope });
  }

  return tokens;
}

/**
 * Parses the allowed origins from CORS.
 */
export function parseCorsAllowedOrigins(raw: string | undefined): string[] {
  if (raw === undefined || raw.trim() === "") {
    return [];
  }

  return raw.split(",").map((entry) => {
    const origin = entry.trim();
    // origin is scheme://host[:port]
    if (!/^https?:\/\/[^\s/]+$/.test(origin)) {
      throw new EnvError(
        `CORS_ALLOWED_ORIGINS contains "${origin}" - expected origins like https://app.example.com (no path or trailing slash)`,
      );
    }
    return origin;
  });
}

/**
 * Validate generated secrets from wrangler
 */
export interface RawEnv {
  MCP_BEARER_TOKENS?: string;
  CORS_ALLOWED_ORIGINS?: string;
  ZANDA_API_KEY?: string;
  ZANDA_BASE_URL?: string;
  ZANDA_TIME_ZONE?: string;
}

/** Credentials/config for talking to the Zanda API */
export interface ZandaConfig {
  apiKey: string;
  baseUrl: string;
  /** IANA timezone date filters are interpreted in; undefined means UTC. */
  timeZone?: string;
}

/**
 * Validates the Zanda-side configuration.
 */
export function getZandaConfig(env: RawEnv): ZandaConfig {
  const apiKey = env.ZANDA_API_KEY?.trim();
  if (apiKey === undefined || apiKey === "") {
    throw new EnvError(
      "ZANDA_API_KEY is not set. Set it in .dev.vars locally or with " +
        "'wrangler secret put ZANDA_API_KEY' in production",
    );
  }

  const baseUrl = env.ZANDA_BASE_URL?.trim().replace(/\/+$/, "");
  if (baseUrl === undefined || baseUrl === "") {
    throw new EnvError(
      "ZANDA_BASE_URL is not set. Use your region's origin, e.g. " +
        "https://zandaapi.zandahealth.com (AU), https://zandaapi.us.zandahealth.com (US), " +
        "https://zandaapi.uk.zandahealth.com (UK)",
    );
  }
  // Origin only, the client appends the /api/v1/... paths itself
  if (!/^https?:\/\/[^\s/]+$/.test(baseUrl)) {
    throw new EnvError(
      "ZANDA_BASE_URL must be an origin with no path, e.g. " +
        "https://zandaapi.zandahealth.com - the /api/v1 part is added automatically",
    );
  }

  const timeZone = env.ZANDA_TIME_ZONE?.trim();
  if (timeZone !== undefined && timeZone !== "") {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone });
    } catch {
      throw new EnvError(
        `ZANDA_TIME_ZONE "${timeZone}" is not a valid IANA timezone - ` +
          'use a name like "Australia/Perth"',
      );
    }
    return { apiKey, baseUrl, timeZone };
  }

  return { apiKey, baseUrl };
}

/**
 * Reads and validates all configuration the Worker currently needs.
 * Throws EnvError if anything is wrong.
 */
export function getConfig(env: RawEnv): AppConfig {
  const rawTokens = env.MCP_BEARER_TOKENS;
  if (rawTokens === undefined || rawTokens.trim() === "") {
    throw new EnvError(
      "MCP_BEARER_TOKENS is not set - the MCP endpoint cannot accept any client. " +
        "Set it in .dev.vars locally or with 'wrangler secret put MCP_BEARER_TOKENS' in production",
    );
  }

  return {
    bearerTokens: parseBearerTokens(rawTokens),
    corsAllowedOrigins: parseCorsAllowedOrigins(env.CORS_ALLOWED_ORIGINS),
  };
}
