import { expect, type Page, type BrowserContext } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly browserContext: BrowserContext;

  constructor(page: Page, browserContext: BrowserContext) {
    this.page = page;
    this.browserContext = browserContext;
  }

  async goto() {
    await this.page.goto("http://localhost:4040");
  }

  async visitCodeSamplePage() {
    const pagePromise =
      this.browserContext && this.browserContext.waitForEvent("page");

    await this.page
      .getByRole("link", { name: "Check out the Vue 3 code" })
      .click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    await expect(newPage).toHaveTitle(
      "Vue.js Options API Code Sample: Basic Authentication"
    );
  }

  async openAuth0LoginPage() {
    await this.page.getByRole("button", { name: "Log In" }).click();
    await this.page.waitForURL(/auth0.com/);
  }

  async checkTitle() {
    await expect(
      this.page.getByRole("heading", { name: "Hello, Vue 3 World!" })
    ).toBeVisible();
  }
}
