import { test, expect } from '@playwright/test';

test('Login to Netsuite and navigate to RTS', async ({ page }) => {

  test.setTimeout(100000); // extend timeout

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

  await page.pause()

  // Wait for role or fallback to locator
  await newTab.getByRole('row', { name: '1.0 Product Development' }).getByRole('link').click();

  

   // Confirm newTab is still open
  if (newTab.isClosed()) {
    throw new Error('❌ newTab was closed after role selection');
  }
  //await page.pause();
  //await expect(newTab.locator('//div[@data-header-section="logos"]')).toBeVisible({ timeout: 50000 });

  // Confirm RTS logo and RentalSeries menu are visible
  await expect(newTab.locator('//div[@data-header-section="logos"]')).toBeVisible({ timeout: 50000 });
  await expect(newTab.locator('//span[text()="RentalSeries"]')).toBeVisible({ timeout: 50000 });

   
// Hover over RentalSeries and then Apps>>home


    await newTab.hover('//span[text()="RentalSeries"]'); //RTS 
    await newTab.waitForTimeout(500);
    await newTab.getByRole('button', { name: 'Apps' }).hover(); //Apps 
    await newTab.locator('//span[text()="Home"]/parent::div').click()// Home

    await newTab.waitForTimeout(25000); // Just a small wait
      if (newTab.isClosed()) {
      throw new Error('newTab got closed after clicking Home');
   } // If this throws, then you’ve confirmed the tab is closing unexpectedly.

    const frame = newTab.frameLocator("iframe#angularFrame");

    const listLocator = frame.locator("svg>g[id='list']");
    await expect(listLocator).toBeVisible({ timeout: 15000 });
    await listLocator.click();

    
    await frame.locator('//div[@class="child-menu" and text()=" Sub Rent Purchase Orders"]').click(); //Click on sub rental order page
    await frame.locator('//div[@class="left-inner"]').click(); //Click on filter

    //Apply Filter

    await frame.locator('//div[@class="heading"]/label[text()="Currency"]').click(); //click on currency
    await frame.locator('(//input[@placeholder="Search"])[4]').fill('USD'); //serach and add USD
    await frame.locator('(//input[@placeholder="Search"])[4]').press('Enter');
    const checkbox= frame.locator('//label[text()="USD"]');
    await checkbox.check();
    //await frame.locator('//label[text()="USD"]').click();
    await frame.locator('(//button[text()=" Apply "])[2]').click();

    //download PDF.CSV
    await frame.locator('//div[@class="download-main-container"]').click(); //Click on download icon
    await frame.locator('//span[text()="Download as PDF"]').click(); // Download PDF
    await frame.locator('//span[text()="Download as CSV"]').click(); // Downlaod CSV

    // Navigate to QE.
     
    const workflowIcon= frame.locator("svg>g[id='icon-workflow']");
    await expect(workflowIcon).toBeVisible({timeout :15000});
    await workflowIcon.click()

    //Navigate to QE page.

    await frame.locator('//div[@class="child-menu" and text()=" Quick Entry"]').click();

    //Validation message display.

    await frame.locator('//div[@class="error-label"] /label[ text()="Please fill in the details"]').toBeVisible({timeout :15000})



})





