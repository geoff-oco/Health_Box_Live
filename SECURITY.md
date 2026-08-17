# Security

This server sits between AI platforms and a health practice's Zanda data, so it is designed so
that every security property is enforced in one place and pinned by a test. This document explains
the model, what the server does and does not store, and the runbooks for rotating and revoking
access.

Every tool is **read-only** — there is no tool that can create, update or delete data in Zanda.

## Reporting a vulnerability

Please report suspected vulnerabilities privately rather than opening a public issue. Open a
[GitHub security advisory](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
on this repository, or contact the maintainer directly. Please allow reasonable time for a fix
before any public disclosure.

## The two-credential model

There are two completely separate kinds of credential, and they never mix:

1. **The Zanda API key** (`ZANDA_API_KEY`) — the practice's master key to its own data. It is set
   as a Cloudflare secret, attached to outbound requests as the `X-API-Key` header in exactly one
   file (`src/zanda/client.ts`), and is **never** logged and **never** returned to a client. No
   layer above `src/zanda/` has access to it.
2. **Client bearer tokens** (`MCP_BEARER_TOKENS`) — one named token per AI platform that connects
   to this server. Clients present them as `Authorization: Bearer <token>`. They are validated in
   `src/auth/bearer.ts` with a constant-time comparison. A client only ever holds its own token; it
   never sees the Zanda key.

The consequence: a compromised or misbehaving client can be cut off by revoking its one token,
without touching the Zanda key or any other client.

## Scopes: full vs sanitised

Each bearer token has a scope, written as `name:scope:token` (scope defaults to `full`):

| Scope | Endpoint | What it can see |
|---|---|---|
| `full` | `/mcp` | The complete read-only catalogue, including client (patient) identity fields. |
| `sanitised` | `/mcp/sanitised` | The same tools, but client identities are never returned. |

The sanitised endpoint is served by a separate Durable Object class (`SanitisedZandaMcpAgent`) that
registers only the sanitised tool variants. It can answer "when is there a free appointment?",
"what does this service cost?", or "who are the practitioners?" but never returns a client's name,
ID, contact details or group/session names. Give public-facing agents (phone/voice bots, website
widgets) a `sanitised` token so they physically cannot request identifying data. A dedicated
tripwire test (`test/tools/sanitised.spec.ts`) fails if any identifying field ever appears in
sanitised output.

A `full` token may use either endpoint; a `sanitised` token may use only `/mcp/sanitised`.

## What the server itself stores

**Nothing about clients, at rest.**

- **No KV, no database of practice data.** The server holds no cache or store of Zanda records.
- **The MCP event store is disabled.** The `agents` SDK's stream-resumability event store would
  transiently buffer response payloads (which could include client data) inside the Durable
  Object. Both agents override `getEventStore()` to return `undefined`
  (`src/mcp/agent.ts`), so no response payload is ever persisted.
- **Durable Objects hold protocol bookkeeping only** — the MCP handshake/session state needed to
  route a stateful session, never business data.

## Logging

Logs contain no personal data. There are a small number of `console.*` sites, and each logs only
non-identifying operational fields — the **token name** (e.g. `claude`, a label, not a secret),
HTTP method, status code, and timing, e.g.:

```
client=claude method=POST status=200 ms=142
```

Token *values*, the Zanda key, request bodies, and any client (patient) data are never logged.

## Errors never leak internals

Errors exit through three layers so an internal detail can't reach a client:

- `src/zanda/errors.ts` — fixed, safe messages for known Zanda failure modes.
- `src/lib/redact.ts` — a whitelist that lets only known-safe error types through and genericises
  everything else.
- `src/index.ts` — any unhandled error becomes a generic `500`.

## Request hardening

Handled in `src/index.ts` before any tool runs:

- **Bearer required** — missing/unknown token → `401`; wrong scope for the endpoint → `403`.
- **Method allowlist** — only `POST`, `GET`, `DELETE`, `OPTIONS`; anything else → `405`.
- **Body size cap** — request bodies over 100 KB → `413`.
- **CORS off by default** — browser CORS is only enabled if `CORS_ALLOWED_ORIGINS` is set; server-
  to-server clients never need it.

Transport is HTTPS end to end (Cloudflare in front of the Worker; the Worker to Zanda over TLS).

## Secrets management

- Production secrets are set with `wrangler secret put` and are write-only via the Cloudflare API —
  they cannot be read back, including by CI.
- `.dev.vars` (local development values) is gitignored and must never be committed. Only
  `.dev.vars.example`, with empty placeholders, is in the repo.
- The deploy workflow uses a single `CLOUDFLARE_API_TOKEN` GitHub secret scoped to
  **Account → Workers Scripts → Edit** and nothing else — it can deploy a Worker and cannot read
  secrets or touch zones.

## Runbooks

### Revoke one platform's access
`npx wrangler secret put MCP_BEARER_TOKENS` and paste the list *without* that platform's
`name:token` pair. Effective within seconds; every other platform keeps working.

### Rotate a single client token
Generate a new random token (`openssl rand -hex 32`), replace that platform's value in
`MCP_BEARER_TOKENS` via `npx wrangler secret put MCP_BEARER_TOKENS`, then update the token in that
platform's connector settings.

### Rotate the Zanda API key
Generate a new key in Zanda, run `npx wrangler secret put ZANDA_API_KEY`, then revoke the old key
in Zanda. Clients are unaffected — their bearer tokens don't change.

### Suspected compromise
1. Revoke the affected client token(s) immediately (above).
2. If the Zanda key may be exposed, rotate it (above) — this is the master credential.
3. Review Cloudflare Workers logs (**Workers → your worker → Logs**) for the offending token name,
   method, status and timing. Logs contain no client data, but the token name and traffic pattern
   show which platform and when.

## Security invariants (enforced, not aspirational)

| Invariant | Enforced by |
|---|---|
| Zanda key attached in exactly one place | `src/zanda/client.ts`; grep `fetch(` to audit |
| Clients never see Zanda credentials | Two-credential model; layers above `zanda/` have no key access |
| Every tool input validated before Zanda | Zod shapes run by the MCP SDK; cross-field checks in handlers |
| No personal data in logs | `console.*` sites log only name/method/status/timing; `src/lib/redact.ts` for errors |
| No personal data at rest | No KV; event store disabled in `src/mcp/agent.ts` |
| Sanitised endpoint never returns identities | Separate agent + sanitised tool variants; `test/tools/sanitised.spec.ts` tripwire |
| Errors can't leak internals | Fixed messages (`src/zanda/errors.ts`) + whitelist (`src/lib/redact.ts`) + generic 500 (`src/index.ts`) |
| Read-only only | No create/update/delete tool exists in `src/tools/` |

Each invariant is pinned by tests — see `test/`, notably `test/hardening.spec.ts`,
`test/redact.spec.ts`, and the tripwire tests in `test/tools/`.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how these map onto the code's layers.
