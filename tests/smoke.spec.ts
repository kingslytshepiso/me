import { expect, test } from "@playwright/test";

test("smoke test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/me/);
});
