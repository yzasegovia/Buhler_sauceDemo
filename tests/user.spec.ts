import { Locator, Page } from "@playwright/test";

export class User { 
    static readonly NAME_INPUT = '[data-test="username"]';
    static readonly PWD_INPUT = '[data-test="password"]';
    static readonly LOGIN_BUTTON = '[data-test="login-button"]';
    static readonly LOGOUT_BUTTON = '[data-test="logout-sidebar-link"]';

    async login(page:Page, user_name, pwd){
        await page.goto('https://www.saucedemo.com/');
        await page.locator(User.NAME_INPUT ).fill(user_name);
        await page.locator(User.PWD_INPUT).fill(pwd);
        await page.locator(User.LOGIN_BUTTON).click();
        console.log ("Login is successful");
    }

    async logout(page:Page){
        await page.getByRole('button', {name: /Open Menu/i}).click();
        await page.locator(User.LOGOUT_BUTTON).click();

    }
}
