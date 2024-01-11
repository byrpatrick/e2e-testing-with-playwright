import { test, expect } from "../../fixtures/authenticated";
import { MessagePage } from "../../pages/message-page";

test("can navigate to protected page", async ({
  authenticatedUser,
}) => {
  const protectedPage = new MessagePage(authenticatedUser);

  await protectedPage.navigateTo("protected");
  await protectedPage.checkTitle("Protected Page");
  await protectedPage.checkMessage("This is a protected message");
});

test("can navigate to admin page", async ({
  authenticatedUser,
}) => {
  const adminPage = new MessagePage(authenticatedUser);

  await adminPage.navigateTo("admin");
  await adminPage.checkTitle("Admin Page");
  await adminPage.checkMessage("Permission denied");
});
