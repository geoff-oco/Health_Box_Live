/**
 * Set up CORS for any browser based client interaction
 */

const CORS_RESPONSE_HEADERS = [
  "Access-Control-Allow-Origin",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Credentials",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
];

function isAllowed(origin: string | null, allowedOrigins: readonly string[]): origin is string {
  return origin !== null && allowedOrigins.includes(origin);
}

/**
 * CORS preflight no bearer, expecting 204 with options
 */
export function handlePreflight(request: Request, allowedOrigins: readonly string[]): Response {
  const origin = request.headers.get("Origin");
  if (!isAllowed(origin, allowedOrigins)) {
    return new Response(null, { status: 204 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Accept, Authorization, mcp-session-id, mcp-protocol-version",
      "Access-Control-Expose-Headers": "mcp-session-id",
      "Access-Control-Max-Age": "86400",
      // share headers with cache
      Vary: "Origin",
    },
  });
}

/**
 * Rewrite response's CORS headers to match OUR policy with body stream intact
 */
export function applyCorsPolicy(
  response: Response,
  requestOrigin: string | null,
  allowedOrigins: readonly string[],
): Response {
  const rewritten = new Response(response.body, response);

  for (const header of CORS_RESPONSE_HEADERS) {
    rewritten.headers.delete(header);
  }

  if (isAllowed(requestOrigin, allowedOrigins)) {
    rewritten.headers.set("Access-Control-Allow-Origin", requestOrigin);
    rewritten.headers.set("Access-Control-Expose-Headers", "mcp-session-id");
    rewritten.headers.append("Vary", "Origin");
  }

  return rewritten;
}
