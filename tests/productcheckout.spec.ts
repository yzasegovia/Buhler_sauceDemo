import { test, expect } from '@playwright/test';
import { User as UserPage } from './user.spec';
import { Product, cart } from './cart.spec';


 // Defining constants
 const user_page = new UserPage();

 // Product constants for adding items to cart
 const shoppingCartBadge = '[data-test="shopping-cart-badge"]';
 const subtotal = '[data-test="subtotal-label"]';
 const CHECK_CART = '[data-test="shopping-cart-link"]';
 const CHECKOUT_ITEM = '[data-test="checkout"]';
 const CUSTOMER_FIRSTNAME = '[data-test="firstName"]';
 const CUSTOMER_LASTNAME = '[data-test="lastName"]';
 const POSTCODE =  '[data-test="postalCode"]';


// Describing the test group for Testing User Checkout
test.describe('Testing User Checkout', () =>{
    test.beforeEach(async({ page }) => {
        const user_name = 'standard_user';
        const pwd = 'secret_sauce';
        user_page.login (page, user_name, pwd);

    });

    test.afterEach(async({ page }) => {
        await user_page.logout(page);
    });


    //Testing add to cart functionalities
    test ('User add products in basket', async ({ page }) => {

        //givem-when        
        //Adding items to cart
        await page.locator(Product.SLBackPack.addLocationId).click();
        await page.locator(Product.SLBikeLight.addLocationId).click();
        await page.locator(Product.SLBoltShirt.addLocationId).click();

        //then
        //Validating the expected number of items in carts
        await expect(page.locator(shoppingCartBadge)).toHaveText('3');

    });


    //Testing calculated prices in checkout
    test ('Calculated total price in checkout', async ({ page }) =>{

        //given
        //Defining product list and product subtotal
        const productList: readonly Product[] = [ Product.SLBackPack, Product.SLBikeLight, Product.SLBoltShirt ];
        const expected = productList.reduce((sum, item) => sum + item.itemprice,0);
        

        //when        
        //Adding of products based from defined producList
        for (const product of productList) await cart(page).add(product);

        //Filling-out customer information
        await page.locator(CHECK_CART).click();
        await page.locator(CHECKOUT_ITEM).click();
        await page.locator(CUSTOMER_FIRSTNAME).fill('anicka');
        await page.locator(CUSTOMER_LASTNAME).fill('test');
        await page.locator(POSTCODE).fill('14100');
        await page.locator('[data-test="continue"]').click();


        //then
        //Validating subtotal
        await expect(page.locator(subtotal)).toContainText("Item total: $" + expected);
    
    });


    //Testing remove product from basket functionality
    test ('User remove products in basket', async ({ page }) =>{
         
        //given
        //Defining product list and adding products
        const productList: readonly Product[] = [ Product.SLBackPack, Product.SLBikeLight, Product.SLBoltShirt ];
        for (const product of productList) await cart(page).add(product);

        //when
        //Removing ites from cart.
        for (const product of productList) await cart(page).removed(product);

        //then
        //Validate cart should be empty
        await expect(page.locator(shoppingCartBadge)).toBeNull;
    });


    //Testing successful product checkout
    test ('User checkout products', async ({ page }) =>{

        //given
        const productList: readonly Product[] = [ Product.SLBackPack, Product.SLBikeLight, Product.SLBoltShirt ];
        const expected = productList.reduce((sum, item) => sum + item.itemprice,0);
        

        //when        
        for (const product of productList) await cart(page).add(product);

        await page.locator(CHECK_CART).click();
        await page.locator(CHECKOUT_ITEM).click();
        await page.locator(CUSTOMER_FIRSTNAME).fill('anicka');
        await page.locator(CUSTOMER_LASTNAME).fill('test');
        await page.locator(POSTCODE).fill('14100');
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();


        //then
        //Validating Checkout is complete
        await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Complete!");

        
    
    });

});