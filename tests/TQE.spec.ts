import { test, expect, Page } from "@playwright/test";
import { TLoginPage } from "../Pages/TLoginPage";
import { THomePage } from "../Pages/THomePage"; 
import { TQuickEntry } from "../Pages/TQuickEntry";


test('Login to Netsuite and navigate to RTS, QE', async ({ page }) => {
  // Initialize Login page

  test.setTimeout(100000);
  const loginPage = new TLoginPage(page);

  // Navigate to login page
  const newTab: Page = await loginPage.gotoLogin();

  // Perform login
  await loginPage.login(newTab, 'ashiyani@sererra.com', 'QA@Testing7');
  await loginPage.selectRole(newTab);

  if (newTab.isClosed()) {
    throw new Error('newTab was closed after role selection');
  }

  // Navigate to homepage
  const homePage = new THomePage(newTab);
  await homePage.verifyHomePage();
  await homePage.navigateToHome();

  if (newTab.isClosed()) {
    throw new Error('newTab got closed after clicking Home');
    
  }

  // Initialize QuickEntry page
  const qe = new TQuickEntry(newTab);

  // Call functions from QuickEntry
  await qe.gotoWorkflow();
  await qe.VerifyValidation();
  await qe.SelectCustomer("NCO Solutions");
  //await qe.waitForLoactor1();

  await page.pause();

  // Create a group and add items
  await qe.CreatSet2("Test 1");
  await qe.AddAllItemsCase11("Test 1");
 // await qe.autoScroll();
  

  // Example if you want to repeat for multiple sets
  /*
  await qe.CreatSet2("Test 2");
  await qe.AddAllItemsCase11("Test 2");

  await qe.CreatSet2("Test 3");
  await qe.AddAllItemsCase11("Test 3");
  */

  // Finalize the order
  await qe.CreateOrder();
  await qe.ViewOrder();
});
