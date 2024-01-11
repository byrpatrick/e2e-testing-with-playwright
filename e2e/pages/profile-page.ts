import { expect, type Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("http://localhost:4040/profile");
  }

  async checkProfilePage(email: string) {
    await expect(
      this.page.getByRole("heading", { name: "Profile Page" })
    ).toBeVisible();
    await expect(this.page.getByRole("heading", { name: email })).toBeVisible();
  }

  async gotoHomePage() {
    await this.page.goto("http://localhost:4040");
    await expect(
      this.page.getByRole("heading", { name: "Hello, Vue 3 World!" })
    ).toBeVisible();
  }

  async logOut() {
    await this.page.getByRole("button", { name: "Log Out" }).click();
    await this.page.waitForURL("http://localhost:4040");
  }
}
