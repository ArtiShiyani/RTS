const { expect } = require('@playwright/test');
export class HomePage {
  constructor(tab) {
    this.tab = tab;

    // Locators
    this.rtsLogo = '//div[@data-header-section="logos"]';
    this.rentalSeries = '//span[text()="RentalSeries"]';
    this.appsButton = this.tab.getByRole('button', { name: 'Apps' });
    this.homeOption = '//span[text()="Home"]/parent::div';
  }

  async verifyHomePage() {
    await expect(this.tab.locator(this.rtsLogo)).toBeVisible({ timeout: 50000 });
    await expect(this.tab.locator(this.rentalSeries)).toBeVisible({ timeout: 50000 });
  }

  async navigateToHome() {
    await this.tab.hover(this.rentalSeries);
    await this.tab.waitForTimeout(500);
    await this.appsButton.hover();
    await this.tab.locator(this.homeOption).click();
    await this.tab.waitForTimeout(25000);
  }
}
