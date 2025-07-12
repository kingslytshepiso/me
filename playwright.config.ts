import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run web",
    port: 8081,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:8081",
  },
});
