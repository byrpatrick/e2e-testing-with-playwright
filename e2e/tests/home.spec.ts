import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { ProfilePage } from "../pages/profile-page";
import { Auth0LoginPage } from "../pages/auth0-login-page";
import { MessagePage } from "../pages/message-page";

test("navigates to the public page", async ({ page, context }) => {
  const homePage = new HomePage(page, context);

  await homePage.goto();
  await homePage.checkTitle();

  await page.getByRole("link", { name: "Public" }).click();

  await page.waitForURL("http://localhost:4040/public");
});

test("get started link navigates to code sample page", async ({
  page,
  context,
}) => {
  const homePage = new HomePage(page, context);

  await homePage.goto();
  await homePage.checkTitle();

  await homePage.visitCodeSamplePage();
});

test("user is able to log in", async ({ page, context }) => {
  const homePage = new HomePage(page, context);

  await homePage.goto();
  await homePage.openAuth0LoginPage();

  const auth0LoginPage = new Auth0LoginPage(page);

  const email = "testing@example.com";
  const password = "1234qwer*";
  await auth0LoginPage.fillForm(email, password);

  const profilePage = new ProfilePage(page);

  await profilePage.checkProfilePage(email);
});

test("user is able to visit protected page", async ({ page, context }) => {
  const homePage = new HomePage(page, context);

  await homePage.goto();
  await homePage.openAuth0LoginPage();

  const auth0LoginPage = new Auth0LoginPage(page);

  const email = "testing@example.com";
  const password = "1234qwer*";
  await auth0LoginPage.fillForm(email, password);

  const protectedPage = new MessagePage(page);
  await protectedPage.navigateTo("Protected");
  await protectedPage.checkTitle("Protected Page");
  await protectedPage.checkMessage("This is a protected message");
});
