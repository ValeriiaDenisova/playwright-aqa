import {test, expect} from '@playwright/test';
let LoginPage = require('./pages/LoginPage');

test('Success login', async ({page}) => {
    const loginPageInst = new LoginPage(page);
    await loginPageInst.navigate();
    await loginPageInst.login('standard_user', 'secret_sauce');
})