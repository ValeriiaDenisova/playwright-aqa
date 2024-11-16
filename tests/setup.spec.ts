import {test} from '@playwright/test';

test('Save storage state for user', async ({page}) => {
    const url = 'https://guest:welcome2qauto@qauto.forstudy.space';
    await page.goto(url);

    await page.click('button:has-text("Sign in")');
    await page.fill('#signinEmail', 'dmytrijevavi@gmail.com');
    await page.fill('#signinPassword', 'John_D0e');
    await page.click('button:has-text("Login")')

    await page.waitForURL(url + '/panel/garage');

    await page.context().storageState({path: 'storageState.json'});
});
