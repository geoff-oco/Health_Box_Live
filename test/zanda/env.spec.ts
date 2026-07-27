import { describe, expect, it } from "vitest";
import { EnvError, getZandaConfig } from "../../src/lib/env";

describe("getZandaConfig", () => {
  it("returns validated config", () => {
    const config = getZandaConfig({
      ZANDA_API_KEY: "key-abc",
      ZANDA_BASE_URL: "https://zandaapi.zandahealth.com",
    });

    expect(config).toEqual({
      apiKey: "key-abc",
      baseUrl: "https://zandaapi.zandahealth.com",
    });
  });

  it("normalises a trailing slash on the base URL", () => {
    const config = getZandaConfig({
      ZANDA_API_KEY: "key-abc",
      ZANDA_BASE_URL: "https://zandaapi.zandahealth.com/",
    });

    expect(config.baseUrl).toBe("https://zandaapi.zandahealth.com");
  });

  it("fails fast when the API key is missing or blank", () => {
    expect(() => getZandaConfig({ ZANDA_BASE_URL: "https://z.test" })).toThrow(EnvError);
    expect(() => getZandaConfig({ ZANDA_API_KEY: "  ", ZANDA_BASE_URL: "https://z.test" })).toThrow(
      EnvError,
    );
  });

  it("fails fast when the base URL is missing", () => {
    expect(() => getZandaConfig({ ZANDA_API_KEY: "key" })).toThrow(EnvError);
  });

  it("rejects a base URL that already contains a path", () => {
    expect(() =>
      getZandaConfig({
        ZANDA_API_KEY: "key",
        ZANDA_BASE_URL: "https://zandaapi.zandahealth.com/api/v1",
      }),
    ).toThrow(/no path/);
  });

  it("accepts a valid IANA timezone and omits it when unset or blank", () => {
    const config = getZandaConfig({
      ZANDA_API_KEY: "key",
      ZANDA_BASE_URL: "https://z.test",
      ZANDA_TIME_ZONE: "Australia/Perth",
    });
    expect(config.timeZone).toBe("Australia/Perth");

    const noTz = getZandaConfig({ ZANDA_API_KEY: "key", ZANDA_BASE_URL: "https://z.test" });
    expect(noTz.timeZone).toBeUndefined();

    const blankTz = getZandaConfig({
      ZANDA_API_KEY: "key",
      ZANDA_BASE_URL: "https://z.test",
      ZANDA_TIME_ZONE: "  ",
    });
    expect(blankTz.timeZone).toBeUndefined();
  });

  it("rejects an invalid timezone name", () => {
    expect(() =>
      getZandaConfig({
        ZANDA_API_KEY: "key",
        ZANDA_BASE_URL: "https://z.test",
        ZANDA_TIME_ZONE: "Perth/Not-Real",
      }),
    ).toThrow(/IANA timezone/);
  });

  it("never echoes the API key in error messages", () => {
    try {
      getZandaConfig({ ZANDA_API_KEY: "super-secret-key", ZANDA_BASE_URL: "bad url" });
      expect.unreachable("should have thrown");
    } catch (error) {
      expect((error as Error).message).not.toContain("super-secret-key");
    }
  });
});
