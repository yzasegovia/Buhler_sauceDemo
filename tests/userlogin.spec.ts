import { test, expect } from '@playwright/test';
import { User as UserPage } from './user.spec';

 // Defining constants
const USER_NAME_INPUT = '[data-test="username"]';
const USER_PWD_INPUT = '[data-test="password"]';
const LOGIN_ERROR = '[data-test="error"]';
const USER_LOGIN_BUTTON = '[data-test="login-button"]';
const USER_LOGOUT_BUTTON = '[data-test="logout-sidebar-link"]';
const user_page = new UserPage();

test.describe('User login operation', () =>{
    test.beforeEach(async({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    // To test standard_user login
    test('Testing standard user valid login', async ({ page }) => {
        //given
        const user_name = 'standard_user';
        const pwd = 'secret_sauce';
        
        //when
        await page.locator(USER_NAME_INPUT ).fill(user_name);
        await page.locator(USER_PWD_INPUT).fill(pwd);
        await page.locator(USER_LOGIN_BUTTON).click();

        //then
        // Check if login was successful
        await expect(page.locator(USER_LOGOUT_BUTTON)).not.toBeNull();
    
    });


    // To test locked_out_user credential
    test('Testing invalid login using locked_user credential', async ({ page }) => {

        //given
        const user_name = 'locked_out_user';
        const pwd = 'secret_sauce';
        
        //when
        await page.locator(USER_NAME_INPUT ).fill(user_name);
        await page.locator(USER_PWD_INPUT).fill(pwd);
        await page.locator(USER_LOGIN_BUTTON).click();

        //then
        // Check if login error is shown
        await expect(page.locator(LOGIN_ERROR)).toBeVisible();
    });


    // To test logout
    test('Testing Logout', async ({ page }) => {

        //given
        const user_name = 'standard_user';
        const pwd = 'secret_sauce';
        
        
        //when
        user_page.login (page, user_name, pwd);
        await page.getByRole('button', {name: 'Open Menu'}).click();
        await page.locator(USER_LOGOUT_BUTTON).click();

        //then
        // Check if login error is shown
        await expect(page.locator(USER_LOGIN_BUTTON)).toBeVisible();
    });
});