/**
 * Zanda rate limits in application and infrastructure layers
 */

export interface RetryOptions {
  /** Retries after the first attempt */
  maxRetries?: number;
  /** First backoff ceiling in ms which doubles each retry. */
  baseDelayMs?: number;
  /** Upper bound for any single wait. */
  maxDelayMs?: number;
  /** Injectable for tests to default to a real timer. */
  sleep?: (ms: number) => Promise<void>;
  /** Injectable for tests to default to random Math */
  random?: () => number;
}

const DEFAULTS = {
  maxRetries: 3,
  baseDelayMs: 1_000,
  maxDelayMs: 15_000,
  sleep: (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)),
  random: Math.random,
} as const satisfies Required<RetryOptions>;

function retryAfterMs(response: Response): number | null {
  const header = response.headers.get("Retry-After");
  if (header === null) {
    return null;
  }
  const seconds = Number(header);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds * 1_000 : null;
}

/**
 * Runs attempt and, while it responds 429, waits and re-runs it up to
 * maxRetries times.
 */
export async function fetchWithRetryOn429(
  attempt: () => Promise<Response>,
  options: RetryOptions = {},
): Promise<Response> {
  const { maxRetries, baseDelayMs, maxDelayMs, sleep, random } = { ...DEFAULTS, ...options };

  let response = await attempt();

  for (let retry = 0; response.status === 429 && retry < maxRetries; retry++) {
    const serverAdvice = retryAfterMs(response);
    const backoffCeiling = Math.min(maxDelayMs, baseDelayMs * 2 ** retry);
    const delay = serverAdvice ?? Math.ceil(random() * backoffCeiling);

    await sleep(Math.min(delay, maxDelayMs));
    response = await attempt();
  }

  return response;
}
