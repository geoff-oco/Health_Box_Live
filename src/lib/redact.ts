/**
 * Set up redaction for santisation of log paths, errors, etc..
 */

import { ZandaApiError } from "../zanda/errors";
import { EnvError } from "./env";

/**
 * Sett our own trusted message for errors.
 */
const GENERIC_MESSAGE = "The server hit an unexpected internal error. Try again shortly.";

/**
 * safe tool handler for input
 */
export class ToolInputError extends Error {
  override name = "ToolInputError";
}

/**
 * Converts any thrown value into a message that is safe to show an MCP
 * client and safe to write to logs. No patient data.
 */
export function safeErrorMessage(error: unknown): string {
  if (
    error instanceof ZandaApiError ||
    error instanceof EnvError ||
    error instanceof ToolInputError
  ) {
    return error.message;
  }
  return GENERIC_MESSAGE;
}

/**
 * Built-in error types whose direct instances carry messages written by
 * the JS engine or platform.
 */
const BUILTIN_ERROR_PROTOTYPES: ReadonlySet<object> = new Set([
  TypeError.prototype,
  RangeError.prototype,
  SyntaxError.prototype,
  ReferenceError.prototype,
  EvalError.prototype,
  URIError.prototype,
  DOMException.prototype,
]);

function isBuiltinRuntimeError(error: unknown): error is Error {
  return (
    typeof error === "object" &&
    error !== null &&
    BUILTIN_ERROR_PROTOTYPES.has(Object.getPrototypeOf(error))
  );
}

/**
 * One-line, log-safe description of an error: its class name plus the safe message.
 * LOG PATH ONLY its never shown to MCP clients.
 */
export function safeLogSummary(error: unknown): string {
  if (isBuiltinRuntimeError(error)) {
    return `${error.name}: ${error.message.replace(/\s+/g, " ").trim()}`;
  }
  if (error instanceof ZandaApiError && error.zandaDetail !== null) {
    return `${error.name}: ${error.message} Zanda said: ${error.zandaDetail}`;
  }
  const name = error instanceof Error ? error.name : typeof error;
  return `${name}: ${safeErrorMessage(error)}`;
}
