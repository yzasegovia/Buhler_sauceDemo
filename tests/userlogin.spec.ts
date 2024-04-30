import { test, expect } from '@playwright/test';

 // Defining constants
const USER_NAME_INPUT = '[data-test="username"]';
const USER_PWD_INPUT = '[data-test="password"]';
const LOGIN_ERROR = '[data-test="error"]';
const USER_LOGIN_BUTTON = '[data-test="login-button"]';
const USER_LOGOUT_BUTTON = '[data-test="logout-sidebar-link"]';

test.describe('User login operation', () =>{
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    // To test standard_user login
    test('Testing standard user valid login', async ({ page }) => {
        //await page.locator(USER_NAME_INPUT ).click();
        await page.locator(USER_NAME_INPUT ).fill('standard_user');
        //await page.locator(USER_NAME_INPUT ).press('Tab');
        await page.locator(USER_PWD_INPUT).fill('secret_sauce');
        await page.locator(USER_LOGIN_BUTTON).click();

        // Check if login was successful
        await expect(page.locator(USER_LOGOUT_BUTTON)).not.toBeNull();
    
    });

    // To test locked_out_user credential
    test('Testing invalid login using locked_user credential', async ({ page }) => {
        //await page.locator(USER_NAME_INPUT ).click();
        await page.locator(USER_NAME_INPUT ).fill('locked_out_user');
        //await page.locator(USER_NAME_INPUT ).press('Tab');
        await page.locator(USER_PWD_INPUT).fill('secret_sauce');
        await page.locator(USER_LOGIN_BUTTON).click();

        // Check if login error is shown
        await expect(page.locator(LOGIN_ERROR)).toBeVisible();
    });
});