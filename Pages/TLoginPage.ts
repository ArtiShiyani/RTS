import { Page, Locator } from '@playwright/test';

export class TLoginPage {
  private page: Page;
  private loginLink: string = '(//a[text()="Log In "])[1]';
  private emailInput: string = '//input[@id="email"]';
  private passwordInput: string = '//input[@id="password"]';
  private rememberMeCheckbox: string = '//input[@id="rememberme"]';
  private loginButton: string = '//button[@id="login-submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async gotoLogin(): Promise<Page> {
    await this.page.goto('https://www.netsuite.com/portal/home.shtml');
    const [newTab] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.loginLink)
    ]);
    await newTab.waitForLoadState();
    return newTab;
  }

  async login(newTab: Page, email: string, password: string): Promise<void> {
    await newTab.fill(this.emailInput, email);
    await newTab.fill(this.passwordInput, password);
    await newTab.click(this.rememberMeCheckbox);
    await newTab.click(this.loginButton);
  }

  async selectRole(newTab: Page): Promise<void> {
    await newTab.getByRole('row', { name: '1.0 Product Development' })
                .getByRole('link')
                .click();
  }
}
