export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.loginLink = '(//a[text()="Log In "])[1]';
    this.emailInput = '//input[@id="email"]';
    this.passwordInput = '//input[@id="password"]';
    this.rememberMeCheckbox = '//input[@id="rememberme"]';
    this.loginButton = '//button[@id="login-submit"]';
    this.productDevRole = "//table[@class='uir-roleswitch-table']//tr[td[contains(text(), '1.0 Product Development Account')]]//a[contains(text(), 'Choose account')]"
  }

  async gotoLogin() {
    await this.page.goto('https://www.netsuite.com/portal/home.shtml');
    const [newTab] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.click(this.loginLink)
    ]);
    await newTab.waitForLoadState();
    return newTab;
  }

  async login(newTab, email, password) {
    await newTab.fill(this.emailInput, email);
    await newTab.fill(this.passwordInput, password);
    await newTab.click(this.rememberMeCheckbox);
    await newTab.click(this.loginButton);
  }

  async selectRole(newTab) {

    //const role = newTab.locator(this.productDevRole);
    await newTab.click(this.productDevRole);

  }
}
