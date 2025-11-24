import { test } from '@playwright/test';
import { LoginPage } from '../Pages/TLoginPage.ts';
import { HomePage } from '../pages/THomePage.ts';
import { RTSPage } from '../Pages/TRTSPage.ts';

test('Login to Netsuite and navigate to RTS', async ({ page }) => {
  test.setTimeout(100000);

  const loginPage = new LoginPage(page);
  const newTab = await loginPage.gotoLogin();

  await loginPage.login(newTab, 'ashiyani@sererra.com', 'QA@Mission9');
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

  const rtsPage = new RTSPage(newTab);
  await rtsPage.openSubRentOrders();
  await rtsPage.applyCurrencyFilter();
  await rtsPage.downloadReports();
});
