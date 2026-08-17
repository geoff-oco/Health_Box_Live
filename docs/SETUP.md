# Setup guide

This guide takes a practice from nothing to a live, private MCP server connected to your AI
platforms. It is written for a practice manager or IT support person — no programming needed,
just careful copy-and-paste in a terminal.

**What you're setting up:** your own private copy of this server, running in *your* Cloudflare
account, using *your* Zanda API key. No health data ever flows through anyone else's
infrastructure — the server is a locked pass-through between your AI platforms and your Zanda
account.

**You will need:**

- A computer with [Node.js](https://nodejs.org) 22 or newer installed (`node --version` to check)
- A free [Cloudflare account](https://dash.cloudflare.com/sign-up) (the free Workers tier is enough)
- Admin access to your Zanda account (to generate an API key)
- About 30 minutes

---

## Part 1 — Deploy the server

### 1. Get the code

```bash
git clone https://github.com/REPLACE-WITH-YOUR-FORK/zanda-mcp-server.git
cd zanda-mcp-server
npm install
```

### 2. Log wrangler into your Cloudflare account

```bash
npx wrangler login
```

A browser window opens; approve the access request. (Wrangler is Cloudflare's official
command-line tool — it's already installed by `npm install`.)

### 3. Generate your Zanda API key

In Zanda: **Settings → API → Generate key**. The key is shown **once** — copy it now and keep
it somewhere safe (a password manager). Treat it like a master key to your practice data.

### 4. Create your client access tokens

Each AI platform gets its own named token so you can revoke one without breaking the others.
Generate one long random token per platform you plan to connect:

```bash
openssl rand -hex 32
```

(Run it once per platform. On Windows without openssl, use PowerShell:
`-join ((1..64) | ForEach-Object { '{0:x}' -f (Get-Random -Max 16) })`.)

Write them down as `name:token` pairs, e.g.:

```
voiceflow:4f3c8a...e91,claude:b77d01...c42
```

Names can be anything short (letters/digits/dashes) that tells you *who* uses that token.

**Optional — sanitised scope for public-facing agents.** If a platform's agent talks to the
public (a phone/voice bot, a website widget), give its token the `sanitised` scope by writing
the entry as `name:sanitised:token`:

```
voiceflow:sanitised:4f3c8a...e91,claude:b77d01...c42
```

A sanitised token can only use the `/mcp/sanitised` endpoint, which can check the schedule,
prices, and staff directory but never sees client (patient) names or IDs — see
[SECURITY.md](../SECURITY.md). Tokens without a scope have full access to `/mcp`. Note the
spelling `sanitised` — a misspelled scope word is treated as part of the token and that
client will fail to authenticate.

### 5. Set the three secrets

Each command prompts you to paste a value (input is hidden):

```bash
npx wrangler secret put ZANDA_API_KEY
npx wrangler secret put ZANDA_BASE_URL
npx wrangler secret put MCP_BEARER_TOKENS
```

- `ZANDA_API_KEY` — the key from step 3.
- `ZANDA_BASE_URL` — your region's API origin, **no path**:
  - Australia: `https://zandaapi.zandahealth.com`
  - United States: `https://zandaapi.us.zandahealth.com`
  - United Kingdom: `https://zandaapi.uk.zandahealth.com`
- `MCP_BEARER_TOKENS` — the full comma-separated `name:token` list from step 4.

Secrets are write-only: neither the dashboard nor the API can read them back. To change one,
run `secret put` again.

### 6. Deploy

```bash
npx wrangler deploy
```

The output ends with your server's address, e.g.
`https://zanda-mcp-server.<your-subdomain>.workers.dev`. Your MCP endpoint is that address plus
`/mcp`.

### 7. Verify it's alive

Open `https://zanda-mcp-server.<your-subdomain>.workers.dev/health` in a browser. You should
see `{"status":"ok"}`. (This page is public and reveals nothing; everything else requires a
token.)

---

## Part 2 — Automatic deployments (optional, for forks on GitHub)

With this set up, any change merged to your fork's `main` branch is tested and deployed
automatically.

1. In Cloudflare: **My Profile → API Tokens → Create Token → Create Custom Token** with exactly
   one permission: **Account → Workers Scripts → Edit**, scoped to your account. This minimal
   scope means the token can deploy Workers and do *nothing else* — it cannot read your
   secrets, touch DNS, or see other products.
2. In your GitHub fork: **Settings → Secrets and variables → Actions → New repository secret**,
   name `CLOUDFLARE_API_TOKEN`, paste the token.
3. (Optional) Add a repository **variable** `WORKER_HEALTH_URL` set to your `/health` URL to
   enable the post-deploy smoke test.

The `.github/workflows/deploy.yml` workflow does the rest: on every push to `main` it lints,
type-checks, tests, and only then deploys.

---

## Part 3 — Connecting your AI platform

Every platform needs the same two facts:

- **Server URL:** `https://zanda-mcp-server.<your-subdomain>.workers.dev/mcp`
  (or `.../mcp/sanitised` for a `sanitised`-scope token — a sanitised token gets 403 on `/mcp`)
- **Auth header:** `Authorization: Bearer <that platform's token>`

### Voiceflow

1. In your Voiceflow agent, add an **Agent step**, open its tools, and choose
   **MCP tool → Create MCP tool**.
2. Server URL: your `/mcp` URL from above — or your `/mcp/sanitised` URL if this agent talks
   to the public and you gave it a `sanitised`-scope token (Part 1, step 4).
3. Add a custom header: name `Authorization`, value `Bearer <the voiceflow token>` —
   the word `Bearer`, a space, then the token.
4. Voiceflow fetches the tool list automatically. Add the tools you want the agent to use
   (start with `server_info`, `list_practitioners`, and `list_appointments` — or
   `check_appointments` on the sanitised endpoint).
5. Voiceflow shows each tool's description to its LLM — the descriptions are written to be
   self-explanatory, but you can add your own usage notes per tool in Voiceflow.

**Verify:** in Voiceflow's test console, ask the agent something like "check the connection to
the practice server" (it should call `server_info` and report name/version), then "list our
practitioners". If you get "ZANDA_API_KEY is not set", Part 1 step 5 needs re-doing; if tools
never appear, re-check the URL ends in `/mcp` and the header starts with `Bearer `.

### Claude Desktop / claude.ai

1. Claude Desktop: **Settings → Connectors → Add custom connector**. claude.ai (web, paid
   plans): **Settings → Connectors → Add custom connector**.
2. Remote server URL: your `/mcp` URL.
3. Where the connector setup offers advanced options / custom headers, add
   `Authorization: Bearer <the claude token>`.
4. Save; Claude lists the server's tools under the connector.

**Verify:** in a new Claude chat, enable the connector and ask "use server_info to check the
practice server connection". You should get the server name and version back. Then try "who
are our practitioners?".

### Any other client / custom script

The generic recipe, for anything that speaks MCP:

- Transport: **Streamable HTTP**
- Endpoint: your `/mcp` URL
- Header on every request: `Authorization: Bearer <that client's token>`
- Protocol flow: `initialize` → (server returns an `mcp-session-id` header; echo it back on
  every subsequent request) → `tools/list` → `tools/call`

**Verify** with the MCP Inspector from any machine:

```bash
npx @modelcontextprotocol/inspector --cli https://YOUR-WORKER-URL/mcp \
  --transport http \
  --header "Authorization: Bearer YOUR-TOKEN" \
  --method tools/list
```

Expect a JSON list of the server's read-only tools (the full `/mcp` catalogue lists more than
the sanitised `/mcp/sanitised` one). A `401` means the token/header is wrong; a hang or HTML
error usually means the URL is missing `/mcp`.

---

## Rotating or revoking access

Short version (full runbooks in [SECURITY.md](../SECURITY.md)):

- **Revoke one platform:** `npx wrangler secret put MCP_BEARER_TOKENS` and paste the list
  *without* that platform's pair. Effective within seconds; other platforms unaffected.
- **Rotate the Zanda key:** generate a new key in Zanda, `npx wrangler secret put
  ZANDA_API_KEY`, then revoke the old key in Zanda.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `/health` fails in a browser | Deploy didn't finish — rerun `npx wrangler deploy` |
| Everything returns 401 | Header must be exactly `Authorization: Bearer <token>`; check for a missing `Bearer ` prefix or a stray space/newline in the token |
| Tool calls return "ZANDA_API_KEY is not set" | Secrets not set in *this* Cloudflare account — Part 1 step 5 |
| Tool calls return "Zanda rejected the server's API key" | Key was mistyped or revoked — rotate it (above) |
| "server_misconfigured" errors | A secret has the wrong format — check `MCP_BEARER_TOKENS` is `name:token,name:token` and `ZANDA_BASE_URL` has no path. Details appear in **Workers → your worker → Logs** in the Cloudflare dashboard |
| Slow or "rate limited" replies | Zanda's API limits (100 requests/minute per key) — the server retries automatically; heavy use across many platforms shares one limit |
