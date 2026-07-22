import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    cloudflareTest({
      wrangler: { configPath: "./wrangler.jsonc" },
      miniflare: {
        bindings: {
          MCP_BEARER_TOKENS:
            "voiceflow:full:test-token-voiceflow,claude:test-token-claude,kiosk:sanitised:test-token-kiosk",
          CORS_ALLOWED_ORIGINS: "https://allowed.example.com",
          ZANDA_API_KEY: "",
          ZANDA_BASE_URL: "",
        },
      },
    }),
  ],
});
