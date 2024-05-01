import { test, expect } from '@playwright/test';
import { User as UserPage } from './user.spec';
import { Product, cart } from './cart.spec';


 // Defining constants
 const USER_NAME_INPUT = '[data-test="username"]';
 const USER_PWD_INPUT = '[data-test="password"]';
 const LOGIN_ERROR = '[data-test="error"]';
 const USER_LOGIN_BUTTON = '[data-test="login-button"]';
 const USER_LOGOUT_BUTTON = '[data-test="logout-sidebar-link"]';
 const user_page = new UserPage();


 // Product constants for adding items to cart
 const shoppingCartBadge = '[data-test="shopping-cart-badge"]';
 const subtotal = '[data-test="subtotal-label"]';


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
        await page.locator(Product.SLBackPack.addLocationId).click();
        await page.locator(Product.SLBikeLight.addLocationId).click();
        await page.locator(Product.SLBoltShirt.addLocationId).click();

        //then
        await expect(page.locator(shoppingCartBadge)).toHaveText('3');

    });

    //Testing calculated prices in checkout
    test ('Calculated total price in checkout', async ({ page }) =>{

        //given

        const productList: readonly Product[] = [ Product.SLBackPack, Product.SLBikeLight, Product.SLBoltShirt ];
        const expected = productList.reduce((sum, item) => sum + item.itemprice,0);
        

        //when        

        for (const product of productList) await cart(page).add(product);

        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('anicka');
        await page.locator('[data-test="lastName"]').fill('test');
        await page.locator('[data-test="postalCode"]').fill('14100');
        await page.locator('[data-test="continue"]').click();


        //then
        //Validating subtotal
        await expect(page.locator('[data-test="subtotal-label"]')).toContainText("Item total: $" + expected);

        
    
    });

});