import { Page, expect } from '@playwright/test';

export class THomePage {
  private tab: Page;
  private rtsLogo: string = '//div[@data-header-section="logos"]';
  private rentalSeries: string = '//span[text()="RentalSeries"]';
  private homeOption: string = '//span[text()="Home"]/parent::div';

  constructor(tab: Page) {
    this.tab = tab;
  }

  async verifyHomePage(): Promise<void> {
    await expect(this.tab.locator(this.rtsLogo)).toBeVisible({ timeout: 50000 });
    await expect(this.tab.locator(this.rentalSeries)).toBeVisible({ timeout: 50000 });
  }

  async navigateToHome(): Promise<void> {
    await this.tab.hover(this.rentalSeries);
    await this.tab.waitForTimeout(500);
    await this.tab.getByRole('button', { name: 'Apps' }).hover();
    await this.tab.locator(this.homeOption).click();
    await this.tab.waitForTimeout(25000);
  }
}
