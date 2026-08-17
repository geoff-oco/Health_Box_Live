
"""A minimal MCP client for the Zanda MCP server - Python standard library only.

Proves that a non-Claude, non-JavaScript consumer can drive the server with
nothing but HTTP: it performs the MCP handshake over Streamable HTTP, lists
the available tools, and calls one (server_info, which touches no real data).

Usage:
    python scripts/example-client.py --url http://127.0.0.1:8787/mcp --token dev-token-claude-2222
    python scripts/example-client.py --url https://<worker>.workers.dev/mcp --token <your token>

No pip installs required (urllib only) - if you can run Python 3.8+, you can
run this.
"""

import argparse
import json
import sys
import urllib.error
import urllib.request


PROTOCOL_VERSION = "2025-06-18"


class McpHttpClient:
    """A deliberately small Streamable HTTP MCP client.

    MCP is JSON-RPC 2.0 over HTTP: each request is a POST of one JSON
    message; responses arrive either as plain JSON or as a Server-Sent
    Events (SSE) stream whose `data:` lines carry the JSON. A session ID
    issued during `initialize` must be echoed on every later request.
    """

    def __init__(self, url: str, token: str):
        self.url = url
        self.token = token
        self.session_id = None  
        self._next_id = 1

    def _post(self, payload: dict) -> tuple[dict | None, dict]:
        """POST one JSON-RPC message; return (parsed result body, headers)."""
        data = json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(self.url, data=data, method="POST")
        request.add_header("Content-Type", "application/json")

        request.add_header("Accept", "application/json, text/event-stream")

        request.add_header("Authorization", f"Bearer {self.token}")
        if self.session_id:
            request.add_header("mcp-session-id", self.session_id)

        with urllib.request.urlopen(request, timeout=30) as response:
            headers = dict(response.headers)
            body = response.read().decode("utf-8")
            content_type = response.headers.get("Content-Type", "")

        if not body:
            return None, headers  

        if "text/event-stream" in content_type:
            return self._parse_sse(body), headers
        return json.loads(body), headers

    @staticmethod
    def _parse_sse(body: str) -> dict | None:
        """Extract the last JSON message from an SSE stream.

        SSE frames look like:
            event: message
            id: ...
            data: {"jsonrpc":"2.0", ...}

        For request/response tool calls the final data line is the result.
        """
        message = None
        for line in body.splitlines():
            if line.startswith("data:"):
                message = json.loads(line[len("data:"):].strip())
        return message


    def _call(self, method: str, params: dict | None = None) -> dict:
        """Send a JSON-RPC *request* (expects a response) and unwrap it."""
        payload = {"jsonrpc": "2.0", "id": self._next_id, "method": method}
        self._next_id += 1
        if params is not None:
            payload["params"] = params

        message, _headers = self._post(payload)
        if message is None:
            raise RuntimeError(f"{method}: empty response")
        if "error" in message:
            raise RuntimeError(f"{method} failed: {message['error']}")
        return message["result"]

    def _notify(self, method: str) -> None:
        """Send a JSON-RPC *notification* (no id, no response expected)."""
        self._post({"jsonrpc": "2.0", "method": method})

    def initialize(self) -> dict:
        """Handshake: negotiate versions and capture the session ID."""
        payload = {
            "jsonrpc": "2.0",
            "id": self._next_id,
            "method": "initialize",
            "params": {
                "protocolVersion": PROTOCOL_VERSION,
                "capabilities": {},
                "clientInfo": {"name": "example-python-client", "version": "1.0.0"},
            },
        }
        self._next_id += 1

        message, headers = self._post(payload)

        for name, value in headers.items():
            if name.lower() == "mcp-session-id":
                self.session_id = value
        if self.session_id is None:
            raise RuntimeError("server did not issue an mcp-session-id header")


        self._notify("notifications/initialized")
        return message["result"]

    def list_tools(self) -> list:
        return self._call("tools/list")["tools"]

    def call_tool(self, name: str, arguments: dict | None = None) -> dict:
        return self._call("tools/call", {"name": name, "arguments": arguments or {}})


def main() -> int:
    parser = argparse.ArgumentParser(description="Example MCP client (stdlib only)")
    parser.add_argument("--url", default="http://127.0.0.1:8787/mcp", help="MCP endpoint URL")
    parser.add_argument("--token", required=True, help="Bearer token for this client")
    parser.add_argument(
        "--tool", default="server_info", help="Tool to call after listing (default: server_info)"
    )
    args = parser.parse_args()

    client = McpHttpClient(args.url, args.token)

    print(f"connecting to {args.url} ...")
    try:
        server = client.initialize()
    except urllib.error.HTTPError as error:
        if error.code == 401:
            print("ERROR: 401 unauthorized - check the --token value", file=sys.stderr)
            return 1
        raise
    info = server.get("serverInfo", {})
    print(f"connected: {info.get('name')} v{info.get('version')} (session {client.session_id[:8]}...)")

    tools = client.list_tools()
    print(f"\n{len(tools)} tools available:")
    for tool in tools:
        print(f"  - {tool['name']}: {tool.get('title', '')}")

    print(f"\ncalling {args.tool} ...")
    result = client.call_tool(args.tool)
    for block in result.get("content", []):
        if block.get("type") == "text":

            payload = json.loads(block["text"])
            print(json.dumps(payload, indent=2))
    if result.get("isError"):
        print("(the tool reported an error - see message above)", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
