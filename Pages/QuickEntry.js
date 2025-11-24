import { asyncWrapProviders } from 'async_hooks';
import {  Page, Frame } from '@playwright/test';
const { expect } = require('@playwright/test');

export class QuickEntry{

    constructor(tab){

        this.page=tab;
            this.frame = this.page.frameLocator("iframe#angularFrame");

            //Locators 
            //Workflow icon and Quick entry page

            this.listIconWorkflow = "svg>g[id='icon-workflow']";
            this.QePage = '//div[@class="child-menu" and text()=" Quick Entry"]'

            //Validation message
            this.ValidationMessage = '//div[@class="error-label"] /label[ text()="Please fill in the details"]'

            //customer 
            this.customer = '(//div[@class="ng-input"])[2]'
            this.customerSearchBar = '//input[@class="form-control"]'
            this.customerList= '//div[@role="option"]'

            //Rental Rate
            this.RentalRatesearchBar ='(//div[@class="ng-input"])[11]'
            this.RentalRateCrossIcon='(//span[@title="Clear all"])[5]'
            //this.RentalRateInput="(//input[@role='combobox'])[11]"
            this.RentalRateInput='//div[@class="single-select select-_lqdgsugip"]//div[@class="ng-input"]/input'
            this.RentalRateList='//div[@role="option"]'

            //Rental End date
            this.toDateInput = 'formcontrolname="endDate"' //Input text area 
            this.yearmonthLabel='//div[@class="e-day e-title"]' //YEar and month lable
            this.preMonth='//button[@aria-label="previous month"]'
            this.nextMonth= '//button[@aria-label="next month"]'
            this.TargetDate='//td[@class="e-cell"]' //All Date 

            //Items
            //this.ItemsearchBar='//div[text()="Type to add an item"]'
            this.ItemsearchBar ='(//div[@class="ng-input"])[15]'
            //this.ItemSearchInput ='(//input[@placeholder="Search"])[7]'
            this.ItemSearchInput=`//input[@class="form-control"]`
            this.ItemList='//div[@role="listbox"]//div[@role="option"]'

            // Create Sets
            this.SelectGroup ='(//div[@class="ng-input"])[16]'
           // this.SearchOFSelectGroup='//div[@class="form-inner ng-star-inserted"]'
            this.SearchBarOfSelectGroup= '//input[@class="form-control"]'
            this.message ='//div[text()= "No records found"]'
            this.Footerlbl='//div[@class="footer-inner"]'
            //this.FooterLabel = '//div[@class="footer-inner ng-star-inserted"]'

            //Select Set
            this.SetList=`//div[@role="listbox"]//div[@role="option"]` // all the locator of set list

            //popup of creat set
            this.AddandNew = '//button[text()=" Add & Create New "]'
            this.Add = '//button[text()=" Add "]'

            //Quick add
            this.quickaddButton ='//button[text()=" Quick Add "]'

            //Create order button
            this.CreateOrderButton='//button[text()=" Create Rental Order "]'
            //
            this.currency ="//label[contains(text(),'Currency')]/following-sibling::div//div[contains(text(),'Select')]/following-sibling::div"


            //view order
            this.vieworderbutton=`//button[text()=" View Rental Order "]`
            this.successorder=`//div[@class="title"]`
            this.successordertext=`//label[text()="Rental Order successfully created!"]`
            
    }


        async waitForLoactor1() {
        // Call waitForLoadState on page, not frameLocator
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');

        //  Get the actual Frame object (not FrameLocator)
        const frame = this.page.frame({ name: 'angularFrame' });
        if (!frame) throw new Error("Frame 'angularFrame' not found!");

        //  Now use locator inside the frame
        await frame.locator(this.currency).first().waitFor({ state: 'visible' });
}


        async gotoWorkflow(){

        await this.frame.locator(this.listIconWorkflow).click();
        await this.frame.locator(this.QePage).click();
    }
    

        async VerifyValidation(){

        
            const validationMessage = this.frame.locator(this.ValidationMessage).first();

            await expect(validationMessage).toBeVisible({ timeout: 15000 });
            
            //await expect((this.frame.locator(this.ValidationMessage).first())).toBeVisible({ timeout: 15000 });
            //await expect((this.frame.locator(this.ValidationMessage).nth(2))).toBeVisible({ timeout: 15000 });
        
        }

        async SelectCustomer(customerName) {
        // Click customer field
            await this.frame.locator(this.customer).click();

        // Fill dynamic customer name
            if (typeof customerName !== "string" || !customerName.trim()) {
            throw new Error("SelectCustomer requires a valid customerName string");
            }

                await this.frame.locator(this.customerSearchBar).fill(customerName);

            // Select first matching result
            await this.frame.locator(this.customerList).first().click();
    }

        async AddAllItemsCase11(groupName) {
        // Get all items first
        //const items = await this.frame.locator(this.ItemList).all();

        await this.frame.locator(this.ItemsearchBar).click();
        await this.frame.locator(this.ItemSearchInput).click();

        const items = await this.frame.locator(this.ItemList).all();
        const totalitem=await items.length;
        console.log(totalitem);


        
             // Inner loop → iterate over items
            for (let i = 0; i < items.length; i++) {
                
                await this.page.waitForLoadState('networkidle');

                // Select the item
                await this.frame.locator(this.ItemsearchBar).click();
                await this.frame.locator(this.ItemSearchInput).click();
                console.log(i);
                await items[i].click();

                // Quick add process
                await this.frame.locator(this.quickaddButton).click();
                await this.frame.locator(this.SelectGroup).click();

                // Fill the group name (current set)
                await this.frame.locator(this.SearchBarOfSelectGroup).fill(groupName);
                await this.page.waitForLoadState('networkidle');
                await this.frame.locator(this.SetList).first().click();
                await this.page.waitForLoadState('networkidle');

                
            }
       
    }


        async CreatSet2(groupName) {
        //await this.frame.locator(this.SelectGroup).scrollIntoViewIfNeeded(); >>  sometimes not working
        await this.frame.locator(this.SelectGroup).click();

        //await expect(this.frame.locator(this.message)).toBeVisible(); >> only first time this will work.

        // Fill dynamic group name instead of hardcoding
        await this.frame.locator(this.SearchBarOfSelectGroup).fill(groupName);

        await this.frame.locator(this.Footerlbl).click();
        await this.frame.locator(this.Add).click();
    }

        async QuickAdd(){
        await expect(this.frame.locator(this.quickaddButton)).toBeVisible();
        await this.frame.locator(this.quickaddButton).click()

    }
    
        async CreateOrder(){
        
        await this.frame.locator(this.CreateOrderButton).click()
    }

        async ViewOrder(){

        //await expect(this.frame.locator(this.successorder)).toHaveText('Rental Order successfully created!');

        await this.frame.locator(this.vieworderbutton).click();
    }
    async selectFromInfiniteDropdown(frame, dropdownLocator, optionText) {
       const dropdown = frame.locator(dropdownLocator);

     // Open dropdown
     await dropdown.click();

    // Scroll until option is visible
     const option = frame.locator(`text=${optionText}`);
    let found = false;

      for (let i = 0; i < 20; i++) {   // limit to avoid infinite loop
       if (await option.isVisible()) {
      await option.click();
      found = true;
      break;
     }
      await frame.evaluate((el) => {
      el.scrollBy(0, 200);   // scroll down inside dropdown
    }, await dropdown.elementHandle());
    await frame.waitForTimeout(300); // give time to load new options
  }

  if (!found) throw new Error(`Option "${optionText}" not found`);
    } 

    async loadAllDropdownItems(frame, dropdownLocator, itemLocator) {
      
    const dropdown = frame.locator(dropdownLocator);
    await dropdown.click();

    let previousCount = 0;
    let currentCount = await frame.locator(itemLocator).count();

    while (currentCount > previousCount) {
      previousCount = currentCount;

      await frame.evaluate((el) => {
        el.scrollBy(0, 300);
      }, await dropdown.elementHandle());

      await frame.waitForTimeout(500); // wait for new items
      currentCount = await frame.locator(itemLocator).count();
    }

    return await frame.locator(itemLocator).allInnerTexts();
    }


    
}

// export class QuickEntry {
//   constructor(page) {
//     this.page = page;
//   }

//   // ... your other methods

//   async autoScroll() {
//     await this.page.evaluate(async () => {
//       await new Promise((resolve) => {
//         let totalHeight = 0;
//         const distance = 500;
//         const timer = setInterval(() => {
//           const scrollHeight = document.body.scrollHeight;
//           window.scrollBy(0, distance);
//           totalHeight += distance;

//           if (totalHeight >= scrollHeight) {
//             clearInterval(timer);
//             resolve();
//           }
//         }, 200);
//       });
//     });
//   }
// }


