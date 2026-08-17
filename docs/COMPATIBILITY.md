# Client compatibility checklist

The server's promise is "any MCP client" — this checklist makes that testable. Four checks per
client:

- **Connects** — completes the MCP initialize handshake
- **Lists tools** — retrieves the 9-tool catalogue
- **Calls a tool** — `server_info` succeeds (no Zanda key needed)
- **Rejects bad auth** — a wrong/missing token is refused (401 / connection error), *not* let through

## Status

| Client | Connects | Lists tools | Calls tool | Rejects bad auth | Last verified |
|---|---|---|---|---|---|
| MCP Inspector (CLI) | ✅ | ✅ | ✅ | ✅ | 2026-07-07, local dev |
| Python script (stdlib) | ✅ | ✅ | ✅ | ✅ | 2026-07-07, local dev |
| Claude Desktop / claude.ai | ⬜ | ⬜ | ⬜ | ⬜ | *run manually — see below* |
| Voiceflow | ⬜ | ⬜ | ⬜ | ⬜ | *run manually — see below* |

The Inspector and Python rows are re-verifiable in two minutes at any time (instructions
below). The Claude and Voiceflow rows require accounts/workspaces, so the practice developer
runs them manually against the deployed server and ticks them off (edit this file, add the
date).

## How to run each check

All examples assume local dev (`npx wrangler dev`, tokens from `.dev.vars`); for the deployed
server substitute `https://<worker>.workers.dev/mcp` and a production token.

### MCP Inspector (CLI)

```bash
# connects + lists tools
npx @modelcontextprotocol/inspector --cli http://127.0.0.1:8787/mcp \
  --transport http --header "Authorization: Bearer dev-token-claude-2222" \
  --method tools/list

# calls a tool
npx @modelcontextprotocol/inspector --cli http://127.0.0.1:8787/mcp \
  --transport http --header "Authorization: Bearer dev-token-claude-2222" \
  --method tools/call --tool-name server_info

# rejects bad auth (expect an error mentioning 401)
npx @modelcontextprotocol/inspector --cli http://127.0.0.1:8787/mcp \
  --transport http --header "Authorization: Bearer wrong" \
  --method tools/list
```

### Python script

```bash
# connects + lists tools + calls a tool (exit code 0)
python scripts/example-client.py --token dev-token-claude-2222

# rejects bad auth (expect the 401 message and exit code 1)
python scripts/example-client.py --token wrong
```

### Claude Desktop / claude.ai (manual)

Follow [SETUP.md — Connecting your AI platform → Claude](./SETUP.md#claude-desktop--claudeai),
then in a chat with the connector enabled:

1. *Connects / lists tools:* the connector shows the server's tools in the tools menu.
2. *Calls a tool:* ask "use server_info to check the practice server connection" — expect
   name/version in the reply.
3. *Rejects bad auth:* edit the connector's header to a wrong token — the connector should
   fail to connect/list (then restore the real token).

### Voiceflow (manual)

Follow [SETUP.md — Connecting your AI platform → Voiceflow](./SETUP.md#voiceflow), then in the
agent test console:

1. *Connects / lists tools:* the Create-MCP-tool dialog fetches and displays the tool list.
2. *Calls a tool:* ask the test agent to check the server connection (server_info).
3. *Rejects bad auth:* change the custom header to a wrong token and re-fetch — expect a
   connection/auth failure (then restore).

## When to re-run

- After any change to `src/index.ts`, `src/auth/`, or the MCP SDK / agents SDK versions.
- After deploying to a new environment.
- Before tagging a release.
