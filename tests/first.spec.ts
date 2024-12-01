import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import {beforeEach} from "node:test";

test.describe('test demo',  () => {

    test('Test1. Login, item cart', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
        const usernameLocator = page.locator('#user-name');
        await usernameLocator.fill('standard_user')

        const passwordLocator = page.locator('#password');
        await passwordLocator.fill('secret_sauce')

        const loginButton = page.locator('#login-button');
        await loginButton.click();

    })

    test('Test2. Login, item cart back', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

        const usernameLocator = page.locator('#user-name');
        await usernameLocator.fill('standard_user')

        const passwordLocator = page.locator('#password');
        await passwordLocator.fill('secret_sauce')

        const loginButton = page.locator('#login-button');
        await loginButton.click();

        await page.goBack()
        await usernameLocator.fill('standard_user')
        await passwordLocator.fill('secret_sauce')
        await loginButton.click();
    })

    test('Test3. Login, item cart back', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');

        await page.locator('#user-name').fill('standard_user')
        await page.locator('#password').fill('secret_sauce')
        await page.locator('#login-button').click();

        const productTitleLocator = page.locator('.title');
        await expect(productTitleLocator).toBeVisible()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // OR
        await expect(page.locator('.title')).toHaveText('Products')
    })

    // test('Test4. Screenshot full', async ({page}) => {
    //     await page.goto('https://www.saucedemo.com/');
    //
    //     await expect(page).toHaveScreenshot('image.png')
    //     await expect(await page.screenshot({fullPage: true})).toMatchSnapshot('image.png')
    // })

    // test('Test5. Screenshot form', async ({page}) => {
    //     await page.goto('https://www.saucedemo.com/');
    //
    //     const loginForm = page.locator('#login_button_container');
    //     await expect(await loginForm.screenshot()).toMatchSnapshot('image2.png')
    // })


});
