import { Page, test as base } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { Auth0LoginPage } from "../pages/auth0-login-page";
import { ProfilePage } from "../pages/profile-page";

// Declare the types of your fixtures.
type MyFixtures = {
  authenticatedUser: Page;
};

// Extend base test by providing your Fixture Type
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  authenticatedUser: async ({ page, context }, use) => {
    // Set up the fixture.
    const homePage = new HomePage(page, context);

    await homePage.goto();
    await homePage.openAuth0LoginPage();

    const auth0LoginPage = new Auth0LoginPage(page);

    const email = "testing@example.com";
    const password = "1234qwer*";
    await auth0LoginPage.fillForm(email, password);

    const profilePage = new ProfilePage(page);

    await profilePage.gotoHomePage();

    // Use the fixture value in the test.
    await use(page);

    // Clean up the fixture.
    await profilePage.logOut();
    await homePage.checkTitle();
  },
});
export { expect } from "@playwright/test";
