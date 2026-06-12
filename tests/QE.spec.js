import { test,expect } from "@playwright/test";
import{LoginPage} from '../Pages/LoginPage';
import{HomePage} from'../Pages/HomePage';
import { QuickEntry } from "../Pages/QuickEntry";


test('Login to Netsuite and navigate to RTS, QE', async ({ page }) => {
  //test.setTimeout(100000);

  const loginPage = new LoginPage(page);
  const newTab = await loginPage.gotoLogin();

  await loginPage.login(newTab, 'ashiyani@sererra.com', 'QA@Testing7');
  await loginPage.selectRole(newTab);

  if (newTab.isClosed()) {
    throw new Error('❌ newTab was closed after role selection');
  }

  const homePage = new HomePage(newTab);
  await homePage.verifyHomePage();
  await homePage.navigateToHome();

  if (newTab.isClosed()) {
    throw new Error('❌ newTab got closed after clicking Home');
  }

  const qe =new QuickEntry(newTab)

    
    await qe.gotoWorkflow();
    await qe.VerifyValidation();
    await qe.SelectCustomer("NCO Solutions");
    await qe.waitForLoactor1();
    //await qe.waitForLoadState();


    
    await qe.CreatSet2("Test 1");
    await qe.AddAllItemsCase11("Test 1");

    await page.pause();

    await qe.CreatSet2("Test 2");
    await qe.AddAllItemsCase11("Test 2");

     await qe.CreatSet2("Test 3");
    await qe.AddAllItemsCase11("Test 3");

    await qe.CreateOrder();
    await qe.ViewOrder();
    
})
