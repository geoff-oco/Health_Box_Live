import { describe, expect, it } from "vitest";
import { EnvError } from "../src/lib/env";
import { safeErrorMessage, safeLogSummary } from "../src/lib/redact";
import { ZandaApiError } from "../src/zanda/errors";

describe("safeErrorMessage", () => {
  it("passes through ZandaApiError's fixed messages", () => {
    expect(safeErrorMessage(new ZandaApiError("not_found", 404))).toContain(
      "No resource with that ID",
    );
  });

  it("passes through EnvError's variable-naming messages", () => {
    expect(safeErrorMessage(new EnvError("ZANDA_API_KEY is not set"))).toContain("ZANDA_API_KEY");
  });

  it("replaces unknown Error messages with a generic one", () => {
    const leaky = new Error("token=abc123 at https://internal.host/path");

    const message = safeErrorMessage(leaky);

    expect(message).not.toContain("abc123");
    expect(message).not.toContain("internal.host");
    expect(message).toContain("unexpected internal error");
  });

  it("handles non-Error throwables", () => {
    expect(safeErrorMessage("a string")).toContain("unexpected internal error");
    expect(safeErrorMessage(undefined)).toContain("unexpected internal error");
  });
});

describe("safeLogSummary", () => {
  it("keeps the real message for built-in runtime errors (log path only)", () => {
    const summary = safeLogSummary(new TypeError("Illegal invocation"));

    expect(summary).toBe("TypeError: Illegal invocation");
  });

  it("collapses a built-in error's message to one line", () => {
    const summary = safeLogSummary(new RangeError("too\n  many\n  pages"));

    expect(summary).toBe("RangeError: too many pages");
  });

  it("keeps plain Error messages generic", () => {
    const summary = safeLogSummary(new Error("token=abc123 at https://internal.host/path"));

    expect(summary).toContain("Error");
    expect(summary).not.toContain("abc123");
    expect(summary).not.toContain("internal.host");
  });

  it("keeps subclasses of built-in errors generic", () => {
    class LibraryError extends TypeError {}
    const summary = safeLogSummary(new LibraryError("body fragment with personal data"));

    expect(summary).not.toContain("personal data");
    expect(summary).toContain("unexpected internal error");
  });

  it("handles non-Error throwables", () => {
    expect(safeLogSummary("a string")).toContain("unexpected internal error");
  });
});
