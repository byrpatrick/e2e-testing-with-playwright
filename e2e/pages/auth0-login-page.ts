import { type Page } from "@playwright/test";

export class Auth0LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm(email: string, password: string) {
    await this.page.getByLabel("Email address").fill(email);
    await this.page.getByLabel("Password").fill(password);
    await this.page
      .getByRole("button", { name: "Continue", exact: true })
      .click();
    await this.page.waitForURL(/http:\/\/localhost:4040\/profile/);
  }
}
