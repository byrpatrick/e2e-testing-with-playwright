import { expect, type Page } from "@playwright/test";

export class MessagePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(`http://localhost:4040/${path}`);
  }

  async navigateTo(tab: string) {
    await this.page.getByRole("link", { name: tab }).click();
  }

  async checkTitle(title: string) {
    await expect(this.page.getByRole("heading", { name: title })).toBeVisible();
  }

  async checkMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
