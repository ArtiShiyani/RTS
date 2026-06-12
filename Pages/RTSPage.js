const { expect } = require('@playwright/test');
export class RTSPage {
  constructor(tab) {
    this.frame = tab.frameLocator("iframe#angularFrame");

    // Locators
    this.listIcon = "svg>g[id='list']";
    this.subRentOrders = '//div[@class="child-menu" and text()=" Sub Rent Purchase Orders"]';
    this.filterPanel = '//div[@class="left-inner"]';

    this.currencyFilter = '//div[@class="heading"]/label[text()="Currency"]';
    this.currencySearchInput = '(//input[@placeholder="Search"])[4]';
    this.currencyCheckbox = '//label[text()="USD"]';
    this.applyButton = '(//button[text()=" Apply "])[2]';

    this.downloadIcon = '//div[@class="download-main-container"]';
    this.downloadPDF = '//span[text()="Download as PDF"]';
    this.downloadCSV = '//span[text()="Download as CSV"]';
  }

  async openSubRentOrders() {
    const listLocator = this.frame.locator(this.listIcon);
    await expect(listLocator).toBeVisible({ timeout: 15000 });
    await listLocator.click();

    await this.frame.locator(this.subRentOrders).click();
    await this.frame.locator(this.filterPanel).click();
  }

  async applyCurrencyFilter() {
    await this.frame.locator(this.currencyFilter).click();
    await this.frame.locator(this.currencySearchInput).fill('USD');
    await this.frame.locator(this.currencySearchInput).press('Enter');
    await this.frame.locator(this.currencyCheckbox).check();
    await this.frame.locator(this.applyButton).click();
  }

  async downloadReports() {
    await this.frame.locator(this.downloadIcon).click();
    await this.frame.locator(this.downloadPDF).click();
    await this.frame.locator(this.downloadCSV).click();
  }
}
