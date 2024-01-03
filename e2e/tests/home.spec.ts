import { test, expect } from "@playwright/test";

test("navigates to the public page", async ({ page }) => {
  await page.goto("/");

  page.getByRole("heading", { name: "Hello, Vue 3 World!" });

  await page.getByRole("link", { name: "Public" }).click();

  await page.waitForURL("http://localhost:4040/public");
});

test("get started link navigates to code sample page", async ({ page, context }) => {
  await page.goto("/");

  // Start waiting for new page before clicking
  const pagePromise = context.waitForEvent("page");

  // Click the CTA link.
  await page.getByRole('link', { name: 'Check out the Vue 3 code' }).click();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  await expect(newPage).toHaveTitle("Vue.js Options API Code Sample: Basic Authentication");
});
