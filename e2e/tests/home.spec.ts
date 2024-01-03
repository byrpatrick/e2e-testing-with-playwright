import { test, expect } from "@playwright/test";

test("navigates to the public page", async ({ page }) => {
  await page.goto("/");

  page.getByRole("heading", { name: "Hello, Vue 3 World!" });

  await page.getByRole("link", { name: "Public" }).click();

  await page.waitForURL("http://localhost:4040/public");
});

test("get started link navigates to code sample page", async ({
  page,
  context,
}) => {
  await page.goto("/");

  // Start waiting for new page before clicking
  const pagePromise = context.waitForEvent("page");

  // Click the CTA link.
  await page.getByRole("link", { name: "Check out the Vue 3 code" }).click();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  await expect(newPage).toHaveTitle(
    "Vue.js Options API Code Sample: Basic Authentication"
  );
});

test("user is able to log in", async ({ page }) => {
  await page.goto("http://localhost:4040/");
  await expect(
    page.getByRole("heading", { name: "Hello, Vue 3 World!" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email address").fill("testing@example.com");
  await page.getByLabel("Password").fill("1234qwer*");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await expect(
    page.getByRole("heading", { name: "Profile Page" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "testing@example.com" })
  ).toBeVisible();
});

test("user is able to visit protected page", async ({ page }) => {
  await page.goto("http://localhost:4040/");
  await expect(
    page.getByRole("heading", { name: "Hello, Vue 3 World!" })
  ).toBeVisible();

  await page.getByRole("button", { name: "Log In" }).click();

  await page.getByLabel("Email address").fill("testing@example.com");
  await page.getByLabel("Password").fill("1234qwer*");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await page.waitForURL("http://localhost:4040/profile");

  await page.getByRole("link", { name: "Protected" }).click();
  await expect(
    page.getByRole("heading", { name: "Protected Page" })
  ).toBeVisible();
});
