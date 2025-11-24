import { Page, expect, FrameLocator } from '@playwright/test';

export class RTSPage {
  private frame: FrameLocator;

  private listIcon = "svg>g[id='list']";
  private subRentOrders = '//div[@class="child-menu" and text()=" Sub Rent Purchase Orders"]';
  private filterPanel = '//div[@class="left-inner"]';

  private currencyFilter = '//div[@class="heading"]/label[text()="Currency"]';
  private currencySearchInput = '(//input[@placeholder="Search"])[4]';
  private currencyCheckbox = '//label[text()="USD"]';
  private applyButton = '(//button[text()=" Apply "])[2]';

  private downloadIcon = '//div[@class="download-main-container"]';
  private downloadPDF = '//span[text()="Download as PDF"]';
  private downloadCSV = '//span[text()="Download as CSV"]';

  constructor(tab: Page) {
    this.frame = tab.frameLocator("iframe#angularFrame");
  }

  async openSubRentOrders(): Promise<void> {
    const listLocator = this.frame.locator(this.listIcon);
    await expect(listLocator).toBeVisible({ timeout: 15000 });
    await listLocator.click();
    await this.frame.locator(this.subRentOrders).click();
    await this.frame.locator(this.filterPanel).click();
  }

  async applyCurrencyFilter(): Promise<void> {
    await this.frame.locator(this.currencyFilter).click();
    await this.frame.locator(this.currencySearchInput).fill('USD');
    await this.frame.locator(this.currencySearchInput).press('Enter');
    await this.frame.locator(this.currencyCheckbox).check();
    await this.frame.locator(this.applyButton).click();
  }

  async downloadReports(): Promise<void> {
    await this.frame.locator(this.downloadIcon).click();
    await this.frame.locator(this.downloadPDF).click();
    await this.frame.locator(this.downloadCSV).click();
  }
}
