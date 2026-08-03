/**
 * Shared output shaping for tools, every tool returns compact
 * structured JSON with a human-readable summary field first, then the data.
 */

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { safeErrorMessage, safeLogSummary } from "../lib/redact";

/** A successful tool result in structured json */
export function jsonResult(payload: Record<string, unknown>): CallToolResult {
  return {
    content: [{ type: "text", text: JSON.stringify(payload) }],
  };
}

/** A failed tool result is isError plus a safe, plain language message. */
export function errorResult(error: unknown): CallToolResult {
  return {
    isError: true,
    content: [{ type: "text", text: JSON.stringify({ error: safeErrorMessage(error) }) }],
  };
}

/** Wrap a tool handler body with the redacting error boundary. */
export async function runTool(
  toolName: string,
  body: () => Promise<CallToolResult>,
): Promise<CallToolResult> {
  try {
    return await body();
  } catch (error) {
    // Log the safe summary only and never the raw error.
    console.error(`tool ${toolName} failed - ${safeLogSummary(error)}`);
    return errorResult(error);
  }
}
