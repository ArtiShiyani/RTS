import { test, expect } from '@playwright/test';
import { authenticator } from 'otplib';

test('Login to Netsuite and navigate to RPS', async ({ page }) => {

  await page.goto('https://www.netsuite.com/portal/home.shtml');

  const [newTab] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('(//a[text()="Log In "])[1]')
  ]);

  await newTab.waitForLoadState();

  await newTab.fill('//input[@id="email"]', 'ashiyani@sererra.com');
  await newTab.fill('//input[@id="password"]', 'QA@Mission9');
  await newTab.click('//input[@id="rememberme"]');
  await newTab.click('//button[@id="login-submit"]');


  // Wait for role or fallback to locator
  await newTab.getByRole('row', { name: '1.0 Product Development' }).getByRole('link').click();

  await page.pause()

  await newTab.waitForSelector('//input[@placeholder="6-digit code"]');

  const secret = 'JBBWCZDFNZRW63LF';
  const token = authenticator.generate(secret);
  console.log('Generated TOTP:', token);

  await newTab.fill('//input[@placeholder="6-digit code"]', token);
  await newTab.click('//label[text()="Submit"]');

  await newTab.waitForLoadState('networkidle');

  console.log('Login successful with 2FA');

  if (newTab.isClosed()) {
    throw new Error('❌ newTab was closed after role selection');
  }
  await expect(newTab.locator('//div[@data-header-section="logos"]')).toBeVisible({ timeout: 10000 });

  
  //RPS
  // Confirm  logo and RepairSeries menu are visible
await expect(newTab.locator('//div[@data-header-section="logos"]')).toBeVisible({ timeout: 10000 });
await expect(newTab.locator('//span[text()="RepairSeries"]')).toBeVisible({ timeout: 150000 });

// Hover over RepairSeries and then Apps>>home


    await newTab.hover('//span[text()="RepairSeries"]'); //RPS 
    await newTab.waitForTimeout(500);
    await newTab.getByRole('button', { name: 'Apps' }).hover(); //Apps 
    await newTab.locator('//span[text()="Home"]/parent::div').click()// Home

    await newTab.waitForTimeout(20000); // Just a small wait
      if (newTab.isClosed()) {
      throw new Error('newTab got closed after clicking Home');}// If this throws, then you’ve confirmed the tab is closing unexpectedly.

})


