import type { BearerToken, TokenScope } from "../lib/env";

export type AuthResult =
  | { ok: true; tokenName: string; scope: TokenScope }
  | { ok: false; reason: "missing-header" | "not-bearer" | "unknown-token" };

const encoder = new TextEncoder();

/**
 * Compares a candidate token against an expected token in constant time.
 */
async function tokensEqual(candidate: string, expected: string): Promise<boolean> {
  const [candidateDigest, expectedDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  // timingSafeEqual for a constant time comparison.
  return crypto.subtle.timingSafeEqual(candidateDigest, expectedDigest);
}

/**
 * Validates the bearer header against named tokens.
 */
export async function authenticateBearer(
  request: Request,
  bearerTokens: ReadonlyMap<string, BearerToken>,
): Promise<AuthResult> {
  const header = request.headers.get("Authorization");
  if (header === null) {
    return { ok: false, reason: "missing-header" };
  }

  const match = header.match(/^Bearer\s+(.+)$/i);
  if (match?.[1] === undefined) {
    return { ok: false, reason: "not-bearer" };
  }
  const candidate = match[1].trim();

  let matched: { name: string; scope: TokenScope } | null = null;
  for (const [name, { token, scope }] of bearerTokens) {
    if (await tokensEqual(candidate, token)) {
      matched = { name, scope };
    }
  }

  return matched !== null
    ? { ok: true, tokenName: matched.name, scope: matched.scope }
    : { ok: false, reason: "unknown-token" };
}

/**
 * 403 when a valid token asks outsie scope
 */
export function forbiddenResponse(): Response {
  return Response.json(
    {
      error: "forbidden",
      message:
        "This token is limited to the sanitised endpoint. Connect to /mcp/sanitised instead.",
    },
    { status: 403 },
  );
}

/**
 * Any failed authentication goes with uniform 401
 */
export function unauthorizedResponse(): Response {
  return Response.json(
    {
      error: "unauthorized",
      message: "A valid 'Authorization: Bearer <token>' header is required.",
    },
    {
      status: 401,
      headers: { "WWW-Authenticate": 'Bearer realm="mcp"' },
    },
  );
}
