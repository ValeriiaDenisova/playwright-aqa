import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker/locale/en';
let LoginPage = require('./pages/LoginPageQauto');


test.describe('POM. Registration tests', () => {

    const randomName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    test.beforeEach(async ({ page }) => {
        const loginPageQauto = new LoginPage(page);
        await loginPageQauto.navigate();
    });

    test('Test1. Sign up positive', async ({page}) => {
        const loginPageQauto = new LoginPage(page);

        await loginPageQauto.setUsername(randomName)
        await loginPageQauto.setLastName(randomLastName)
        await loginPageQauto.setEmail(randomEmail)
        await loginPageQauto.setPassword(randomPassword)
        await loginPageQauto.setReenterPassword(randomPassword)
        await loginPageQauto.clickRegisterButton()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    })

    test('Test2. Sign up negative. Name length < 2', async ({page}) => {
        const loginPageQauto = new LoginPage(page);

        await loginPageQauto.setUsername('a')
        await loginPageQauto.setLastName(randomLastName)
        await loginPageQauto.setEmail(randomEmail)
        await loginPageQauto.setPassword(randomPassword)
        await loginPageQauto.setReenterPassword(randomPassword)

        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Test3. Sign up negative. Last name length > 20', async ({page}) => {
        const loginPageQauto = new LoginPage(page);

        await loginPageQauto.setUsername(randomName)
        await loginPageQauto.setLastName('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        await loginPageQauto.setEmail(randomEmail)
        await loginPageQauto.setPassword(randomPassword)
        await loginPageQauto.setReenterPassword(randomPassword)

        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
    })

    test('Test4. Sign up negative. Incorrect email', async ({page}) => {
        const loginPageQauto = new LoginPage(page);

        await loginPageQauto.setUsername(randomName)
        await loginPageQauto.setLastName(randomLastName)
        await loginPageQauto.setEmail('aaaaaa')
        await loginPageQauto.setPassword(randomPassword)
        await loginPageQauto.setReenterPassword(randomPassword)

        await expect(page.locator('text=Email is incorrect')).toBeVisible();
    })

    test('Test5. Sign up negative. Short password', async ({page}) => {
        const loginPageQauto = new LoginPage(page);

        await loginPageQauto.setUsername(randomName)
        await loginPageQauto.setLastName(randomLastName)
        await loginPageQauto.setEmail(randomEmail)
        await loginPageQauto.setPassword('12345')
        await loginPageQauto.setReenterPassword('12345')

        await expect(page.locator('text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
    })
});
