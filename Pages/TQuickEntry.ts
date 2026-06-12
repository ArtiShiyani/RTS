import { expect, Page, FrameLocator, Locator } from '@playwright/test';

export class TQuickEntry {
  private page: Page;
  private frame: FrameLocator;

  // Locators
  private listIconWorkflow: string;
  private QePage: string;
  private ValidationMessage: string;

  private customer: string;
  private customerSearchBar: string;
  private customerList: string;

  private RentalRatesearchBar: string;
  private RentalRateCrossIcon: string;
  private RentalRateInput: string;
  private RentalRateList: string;

  private toDateInput: string;
  private yearmonthLabel: string;
  private preMonth: string;
  private nextMonth: string;
  private TargetDate: string;

  private ItemsearchBar: string;
  private ItemSearchInput: string;
  private ItemList: string;

  private SelectGroup: string;
  private SearchBarOfSelectGroup: string;
  private message: string;
  private Footerlbl: string;
  private SetList: string;

  private AddandNew: string;
  private Add: string;

  private quickaddButton: string;
  private CreateOrderButton: string;
  private currency: string;

  private vieworderbutton: string;
  private successorder: string;
  private successordertext: string;

  constructor(page: Page) {
    this.page = page;
    this.frame = this.page.frameLocator("iframe#angularFrame");

    // Workflow locators
    this.listIconWorkflow = "svg>g[id='icon-workflow']";
    this.QePage = '//div[@class="child-menu" and text()=" Quick Entry"]';

    // Validation message
    this.ValidationMessage = '//div[@class="error-label"] /label[ text()="Please fill in the details"]';

    // Customer
    this.customer = '(//div[@class="ng-input"])[2]';
    this.customerSearchBar = '//input[@class="form-control"]';
    this.customerList = '//div[@role="option"]';

    // Rental Rate
    this.RentalRatesearchBar = '(//div[@class="ng-input"])[11]';
    this.RentalRateCrossIcon = '(//span[@title="Clear all"])[5]';
    this.RentalRateInput = '//div[@class="single-select select-_lqdgsugip"]//div[@class="ng-input"]/input';
    this.RentalRateList = '//div[@role="option"]';

    // Rental End date
    this.toDateInput = 'formcontrolname="endDate"';
    this.yearmonthLabel = '//div[@class="e-day e-title"]';
    this.preMonth = '//button[@aria-label="previous month"]';
    this.nextMonth = '//button[@aria-label="next month"]';
    this.TargetDate = '//td[@class="e-cell"]';

    // Items
    this.ItemsearchBar = '(//div[@class="ng-input"])[15]';
    this.ItemSearchInput = `//input[@class="form-control"]`;
    this.ItemList = '//div[@role="listbox"]//div[@role="option"]';

    // Create Sets
    this.SelectGroup = '(//div[@class="ng-input"])[16]';
    this.SearchBarOfSelectGroup = '//input[@class="form-control"]';
    this.message = '//div[text()= "No records found"]';
    this.Footerlbl = '//div[@class="footer-inner"]';
    this.SetList = `//div[@role="listbox"]//div[@role="option"]`;

    // Popup
    this.AddandNew = '//button[text()=" Add & Create New "]';
    this.Add = '//button[text()=" Add "]';

    // Quick add
    this.quickaddButton = '//button[text()=" Quick Add "]';

    // Create order button
    this.CreateOrderButton = '//button[text()=" Create Rental Order "]';
    this.currency = "//label[contains(text(),'Currency')]/following-sibling::div//div[contains(text(),'Select')]/following-sibling::div";

    // View order
    this.vieworderbutton = `//button[text()=" View Rental Order "]`;
    this.successorder = `//div[@class="title"]`;
    this.successordertext = `//label[text()="Rental Order successfully created!"]`;
  }

  async waitForLocator1(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('networkidle');

    const frame = this.page.frame({ name: 'angularFrame' });
    if (!frame) throw new Error("Frame 'angularFrame' not found!");

    await frame.locator(this.currency).first().waitFor({ state: 'visible' });
  }

  async gotoWorkflow(): Promise<void> {
    await this.frame.locator(this.listIconWorkflow).click();
    await this.frame.locator(this.QePage).click();
  }

  async VerifyValidation(): Promise<void> {
    const validationMessage = this.frame.locator(this.ValidationMessage).first();
    await expect(validationMessage).toBeVisible({ timeout: 15000 });
  }

  async SelectCustomer(customerName: string): Promise<void> {
    if (!customerName.trim()) {
      throw new Error("SelectCustomer requires a valid customerName string");
    }
    await this.frame.locator(this.customer).click();
    await this.frame.locator(this.customerSearchBar).fill(customerName);
    await this.frame.locator(this.customerList).first().click();
  }

  async AddAllItemsCase11(groupName: string): Promise<void> {
    await this.frame.locator(this.ItemsearchBar).click();
    await this.frame.locator(this.ItemSearchInput).click();

    const items = await this.frame.locator(this.ItemList).all();
    const totalitem = items.length;
    console.log(totalitem);

    for (let i = 0; i < items.length; i++) {
      await this.page.waitForLoadState('networkidle');
      await this.frame.locator(this.ItemsearchBar).click();
      await this.frame.locator(this.ItemSearchInput).click();
      console.log(i);

      await items[i].click();
      await this.frame.locator(this.quickaddButton).click();
      await this.frame.locator(this.SelectGroup).click();

      await this.frame.locator(this.SearchBarOfSelectGroup).fill(groupName);
      await this.page.waitForLoadState('networkidle');
      await this.frame.locator(this.SetList).first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async CreatSet2(groupName: string): Promise<void> {
    await this.frame.locator(this.SelectGroup).click();
    await this.frame.locator(this.SearchBarOfSelectGroup).fill(groupName);
    await this.frame.locator(this.Footerlbl).click();
    await this.frame.locator(this.Add).click();
  }

  async QuickAdd(): Promise<void> {
    await expect(this.frame.locator(this.quickaddButton)).toBeVisible();
    await this.frame.locator(this.quickaddButton).click();
  }

  async CreateOrder(): Promise<void> {
    await this.frame.locator(this.CreateOrderButton).click();
  }

  async ViewOrder(): Promise<void> {
    await this.frame.locator(this.vieworderbutton).click();
  }

  async autoScroll(): Promise<void> {
    await this.page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 200);
      });
    });
  }
}
