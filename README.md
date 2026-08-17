# Zanda MCP Server

A remote [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server that exposes the
[Zanda Health](https://zandahealth.com) Public API as a set of **read-only** tools, hosted on
Cloudflare Workers. It lets AI platforms (Voiceflow, Claude, custom clients) answer questions
about a health practice's diary, clients, billing and availability without ever touching the
practice's Zanda credentials.

Everything the server does is read-only. There is no tool that can create, update or delete data
in Zanda.

## Why

Zanda's API is a good fit for automation, but wiring an AI assistant straight to it means handing
out the practice's API key and hoping each client behaves. This server sits in between:

- The Zanda API key lives in exactly one place (`src/zanda/client.ts`) and never leaves the Worker.
- Clients authenticate with their own named bearer tokens, which can be revoked one at a time.
- A **sanitised** endpoint strips client identities entirely, so a public-facing bot can still
  answer "when is there a free appointment?" without ever seeing who is booked.

## Features

- **Read-only tool catalogue** over the Zanda Public API: practitioners, clients, appointments,
  invoices, payments, locations, billable items, referrals, insurers and reference lookups.
- **Clinic capacity analysis** (`check_clinic_availability`) — reads a whole day across every
  practitioner column and reports true bookable windows and overbooked periods, applying
  per-location concurrency rules the Zanda API doesn't model itself.
- **Two credential model** — client bearer tokens are completely separate from the Zanda API key.
- **Full and sanitised catalogues** — `/mcp` returns curated data; `/mcp/sanitised` never returns
  names or anything that identifies who a booking is for.
- **Hardened by default** — method/size checks, constant-time bearer comparison, CORS off unless
  configured, fixed/whitelisted error messages, and no personal data in logs or at rest.
- **Typed end to end** — request/response types are generated from Zanda's OpenAPI spec.

## Architecture

A single Cloudflare Worker with a strict one-directional dependency rule:

```
index.ts → auth → mcp → tools → zanda
```

`src/zanda/client.ts` is the only file allowed to call `fetch()` to the outside world, so the API
key is attached in one auditable place. Each MCP session's protocol state lives in its own Durable
Object. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full diagram, the dependency rule,
and the security invariants (each pinned by a test).

## Quick start

```bash
npm install
cp .dev.vars.example .dev.vars   # then fill in the values (see below)
npm run dev                      # wrangler dev on http://localhost:8787
```

Configure `.dev.vars`:

```
ZANDA_API_KEY=your-zanda-api-key
ZANDA_BASE_URL=https://zandaapi.zandahealth.com
MCP_BEARER_TOKENS=voiceflow:dev-token-voiceflow-1111,claude:dev-token-claude-2222
ZANDA_TIME_ZONE=Australia/Perth   # optional; matches your Zanda account timezone
```

`MCP_BEARER_TOKENS` is a comma-separated list of `name:token` (or `name:scope:token`, where scope
is `full` or `sanitised`). Names appear in the audit log; tokens are the secrets clients present as
`Authorization: Bearer <token>`.

Check it's alive:

```bash
curl http://localhost:8787/health          # {"status":"ok"}
```

## Endpoints

| Path | Scope | Returns |
|---|---|---|
| `/mcp` | `full` tokens | Full curated tool catalogue |
| `/mcp/sanitised` | `full` or `sanitised` tokens | Same tools, no client identities |
| `/health` | — | Liveness probe |

## Scripts

```bash
npm run dev         # local dev server (wrangler)
npm run deploy      # deploy to Cloudflare Workers
npm test            # run the vitest suite
npm run test:watch  # watch mode
npm run lint        # biome check
npm run typecheck   # tsc --noEmit
npm run zanda:spec  # refresh the OpenAPI spec from Zanda
npm run zanda:types # regenerate src/zanda/types.ts from the spec
```

## Testing

```bash
npm test
```

The suite covers auth, env parsing, error redaction, request hardening, and every tool — including
tripwire tests that fail if client-identifying data ever leaks into output or logs.

## Deployment

Deploys to Cloudflare Workers with Wrangler. Set the runtime secrets (never commit them):

```bash
npx wrangler secret put ZANDA_API_KEY
npx wrangler secret put MCP_BEARER_TOKENS
npm run deploy
```

See [docs/SETUP.md](docs/SETUP.md) for a step-by-step guide written for a practice manager, and
[docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) for connecting specific AI platforms.

## Security

The whole design is oriented around keeping the practice's data safe: a two-credential model that
keeps the Zanda key out of clients' hands, a sanitised endpoint that never returns client
identities, no personal data in logs or at rest, and revocable per-client tokens. See
[SECURITY.md](SECURITY.md) for the model, what the server stores, and the rotate/revoke runbooks.

## Project layout

```
src/
  index.ts          routing, health, method/size checks, audit log
  auth/bearer.ts    named bearer tokens, constant-time comparison
  lib/              env (typed, fail-fast), cors, redact (error whitelist)
  mcp/              McpAgent + tool registration (full and sanitised)
  tools/            per-resource tool schemas, handlers and output shaping
  zanda/            the only fetch(); rate-limit, errors, generated types
test/               one spec per layer/tool, plus hardening tripwires
docs/               ARCHITECTURE, SETUP, COMPATIBILITY
SECURITY.md         threat model, data handling, rotate/revoke runbooks
openapi/            the Zanda OpenAPI spec types are generated from
```

## License

[MIT](LICENSE)
