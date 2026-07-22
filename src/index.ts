import { authenticateBearer, forbiddenResponse, unauthorizedResponse } from "./auth/bearer";
import { applyCorsPolicy, handlePreflight } from "./lib/cors";
import { EnvError, getConfig, type TokenScope } from "./lib/env";
import { SanitisedZandaMcpAgent, ZandaMcpAgent } from "./mcp/agent";

const MCP_ENDPOINTS: ReadonlyMap<
  string,
  { handler: ReturnType<typeof ZandaMcpAgent.serve>; allowedScopes: readonly TokenScope[] }
> = new Map([
  [
    "/mcp",
    {
      handler: ZandaMcpAgent.serve("/mcp", { binding: "MCP_OBJECT" }),
      allowedScopes: ["full"] as const,
    },
  ],
  [
    "/mcp/sanitised",
    {
      handler: SanitisedZandaMcpAgent.serve("/mcp/sanitised", { binding: "MCP_SANITISED_OBJECT" }),
      allowedScopes: ["full", "sanitised"] as const,
    },
  ],
]);

const MAX_MCP_BODY_BYTES = 100 * 1024;

const ALLOWED_MCP_METHODS = new Set(["POST", "GET", "DELETE", "OPTIONS"]);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/health") {
      return Response.json({ status: "ok" });
    }

    const endpoint = MCP_ENDPOINTS.get(pathname);
    if (endpoint !== undefined) {
      let config: ReturnType<typeof getConfig>;
      try {
        config = getConfig(env);
      } catch (error) {
        const detail = error instanceof EnvError ? error.message : String(error);
        console.error(`config error: ${detail}`);
        return Response.json(
          {
            error: "server_misconfigured",
            message: "The server is not configured correctly. Contact the administrator.",
          },
          { status: 500 },
        );
      }

      if (!ALLOWED_MCP_METHODS.has(request.method)) {
        return Response.json(
          { error: "method_not_allowed", message: "Method not allowed on this endpoint." },
          { status: 405, headers: { Allow: "POST, GET, DELETE, OPTIONS" } },
        );
      }

      const declaredLength = Number(request.headers.get("Content-Length") ?? "0");
      if (declaredLength > MAX_MCP_BODY_BYTES) {
        return Response.json(
          { error: "payload_too_large", message: "Request body exceeds the allowed size." },
          { status: 413 },
        );
      }

      if (request.method === "OPTIONS") {
        return handlePreflight(request, config.corsAllowedOrigins);
      }

      const auth = await authenticateBearer(request, config.bearerTokens);
      if (!auth.ok) {
        console.warn(`mcp auth failed: ${auth.reason}`);
        return unauthorizedResponse();
      }

      if (!endpoint.allowedScopes.includes(auth.scope)) {
        console.warn(`mcp scope denied: client=${auth.tokenName} path=${pathname}`);
        return forbiddenResponse();
      }

      const started = Date.now();
      const response = await endpoint.handler.fetch(request, env, ctx);

      console.log(
        `mcp request client=${auth.tokenName} path=${pathname} method=${request.method} status=${response.status} ms=${Date.now() - started}`,
      );

      return applyCorsPolicy(response, request.headers.get("Origin"), config.corsAllowedOrigins);
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

export { SanitisedZandaMcpAgent, ZandaMcpAgent };
