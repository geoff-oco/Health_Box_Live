import { describe, expect, it, vi } from "vitest";
import { fetchWithRetryOn429 } from "../../src/zanda/rate-limit";

function status429(headers: Record<string, string> = {}): Response {
  return new Response("rate limited", { status: 429, headers });
}

function ok(): Response {
  return new Response(JSON.stringify({ data: {} }), { status: 200 });
}

function instantSleep() {
  return vi.fn((_ms: number) => Promise.resolve());
}

describe("fetchWithRetryOn429", () => {
  it("passes a first-try success straight through", async () => {
    const attempt = vi.fn(async () => ok());
    const sleep = instantSleep();

    const response = await fetchWithRetryOn429(attempt, { sleep });

    expect(response.status).toBe(200);
    expect(attempt).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it("retries after 429 and returns the eventual success", async () => {
    const responses = [status429(), status429(), ok()];
    const attempt = vi.fn(async () => responses.shift() as Response);
    const sleep = instantSleep();

    const response = await fetchWithRetryOn429(attempt, { sleep });

    expect(response.status).toBe(200);
    expect(attempt).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
  });

  it("honours Retry-After from the application layer exactly", async () => {
    const responses = [status429({ "Retry-After": "2" }), ok()];
    const attempt = vi.fn(async () => responses.shift() as Response);
    const sleep = instantSleep();

    await fetchWithRetryOn429(attempt, { sleep });

    expect(sleep).toHaveBeenCalledWith(2_000);
  });

  it("uses exponential backoff with jitter when Retry-After is absent (DDoS layer)", async () => {
    const responses = [status429(), status429(), status429(), ok()];
    const attempt = vi.fn(async () => responses.shift() as Response);
    const sleep = instantSleep();
    const random = () => 1;

    await fetchWithRetryOn429(attempt, { sleep, random, baseDelayMs: 1_000 });

    expect(sleep.mock.calls.map(([ms]) => ms)).toEqual([1_000, 2_000, 4_000]);
  });

  it("jitter spreads the delay below the ceiling", async () => {
    const responses = [status429(), ok()];
    const attempt = vi.fn(async () => responses.shift() as Response);
    const sleep = instantSleep();

    await fetchWithRetryOn429(attempt, { sleep, random: () => 0.25, baseDelayMs: 1_000 });

    expect(sleep).toHaveBeenCalledWith(250);
  });

  it("caps any single wait at maxDelayMs", async () => {
    const responses = [status429({ "Retry-After": "3600" }), ok()];
    const attempt = vi.fn(async () => responses.shift() as Response);
    const sleep = instantSleep();

    await fetchWithRetryOn429(attempt, { sleep, maxDelayMs: 5_000 });

    expect(sleep).toHaveBeenCalledWith(5_000);
  });

  it("gives up after maxRetries and returns the final 429", async () => {
    const attempt = vi.fn(async () => status429());
    const sleep = instantSleep();

    const response = await fetchWithRetryOn429(attempt, { sleep, maxRetries: 3 });

    expect(response.status).toBe(429);
    expect(attempt).toHaveBeenCalledTimes(4);
  });

  it("does NOT retry non-429 failures - not its job", async () => {
    const attempt = vi.fn(async () => new Response("boom", { status: 500 }));
    const sleep = instantSleep();

    const response = await fetchWithRetryOn429(attempt, { sleep });

    expect(response.status).toBe(500);
    expect(attempt).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });
});
