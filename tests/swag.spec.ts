import { test, expect } from '@playwright/test';

 // Defining constants
const USER_NAME_INPUT = '[data-test="username"]';
const USER_PASSWORD = '[data-test="password"]';
const LOGIN_ERROR = '[data-test="error"]';
const LOGIN_BUTTON = '[data-test="login-button"]';

test.describe('login', () =>{
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    // To test standard_user login
    test('validLogin', async ({ page }) => {
        //await page.locator(USER_NAME_INPUT ).click();
        await page.locator(USER_NAME_INPUT ).fill('standard_user');
        //await page.locator(USER_NAME_INPUT ).press('Tab');
        await page.locator(USER_PASSWORD).fill('secret_sauce');
        await page.locator(LOGIN_BUTTON).click();

    // Check if login was successful
    const loggedInUrl = page.url();
    if (loggedInUrl === 'https://www.saucedemo.com/inventory.html') {
        console.log('Login test passed! User successfully logged in.');
    } else {
        console.error('Login test failed! User not logged in.');
    }
    });

    // To test locked_out_user credential
    test('lockedLogin', async ({ page }) => {
        //await page.locator(USER_NAME_INPUT ).click();
        await page.locator(USER_NAME_INPUT ).fill('locked_out_user');
        //await page.locator(USER_NAME_INPUT ).press('Tab');
        await page.locator(USER_PASSWORD).fill('secret_sauce');
        await page.locator(LOGIN_BUTTON).click();
    
        // Check if login error is shown
        await expect(page.locator(LOGIN_ERROR)).toBeVisible();
        });
});