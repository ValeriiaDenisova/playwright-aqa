import {test, expect, Locator} from '@playwright/test';
import {faker} from '@faker-js/faker/locale/en';

test.describe('Registration tests', () => {

    let nameInput: Locator
    let lastNameInput: Locator
    let emailInput: Locator
    let passwordInput: Locator
    let reenterPasswordInput: Locator
    let registerButton: Locator

    const randomName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        await page.getByRole('button', {name: 'Sign up'}).click()

        nameInput = page.locator('#signupName')
        lastNameInput = page.locator('#signupLastName')
        emailInput = page.locator('#signupEmail')
        passwordInput = page.locator('#signupPassword')
        reenterPasswordInput = page.locator('#signupRepeatPassword')
        registerButton = page.getByRole('button', {name: 'Register'})
    });

    test('Test1. Sign up positive', async ({page}) => {
        await nameInput.fill(randomName)
        await lastNameInput.fill(randomLastName)
        await emailInput.fill(randomEmail)
        await passwordInput.fill(randomPassword)
        await reenterPasswordInput.fill(randomPassword)
        await registerButton.click()

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    })

    test('Test2. Sign up negative. Name length < 2', async ({page}) => {
        await nameInput.fill('a')
        await lastNameInput.fill(randomLastName)
        await emailInput.fill(randomEmail)
        await passwordInput.fill(randomPassword)
        await reenterPasswordInput.fill(randomPassword)

        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    })

    test('Test3. Sign up negative. Last name length > 20', async ({page}) => {
        await nameInput.fill(randomName)
        await lastNameInput.fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        await emailInput.fill(randomEmail)
        await passwordInput.fill(randomPassword)
        await reenterPasswordInput.fill(randomPassword)

        await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    })

    test('Test4. Sign up negative. Incorrect email', async ({page}) => {
        await nameInput.fill(randomName)
        await lastNameInput.fill(randomLastName)
        await emailInput.fill('aaaaaa')
        await passwordInput.fill(randomPassword)
        await reenterPasswordInput.fill(randomPassword)

        await expect(page.locator('text=Email is incorrect')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    })

    test('Test5. Sign up negative. Short password', async ({page}) => {
        await nameInput.fill(randomName)
        await lastNameInput.fill(randomLastName)
        await emailInput.fill(randomEmail)
        await passwordInput.fill('12345')
        await reenterPasswordInput.fill('12345')

        await expect(page.locator('text=Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    })

    test('Test6. Sign up negative. Short password', async ({page}) => {
        await nameInput.fill(randomName)
        await lastNameInput.fill(randomLastName)
        await passwordInput.fill(randomPassword)
        await reenterPasswordInput.fill('QWEasd123')
        await emailInput.fill(randomEmail)

        await expect(page.locator('text=Passwords do not match')).toBeVisible();
        await expect(registerButton).toBeDisabled();
    })


});
