import {test, expect} from '@playwright/test';

test.describe('Test with Local Storage', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user')
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const localStorage = await page.evaluate(() =>  JSON.stringify( window.localStorage ));
        await page.context().addInitScript((Storage) => {
            Object.entries(JSON.parse(Storage).entries).forEach(([key, value]) => {
                window.localStorage.setItem(key, <string>value)
            });
        }, localStorage);
    });

    test('Local storage add', async ({page}) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    })
})