import {test, expect, Locator} from '@playwright/test';

require('dotenv').config();

class LoginPageQauto {

    signUpButton: Locator
    nameInput: Locator
    lastNameInput: Locator
    emailInput: Locator
    passwordInput: Locator
    reenterPasswordInput: Locator
    registerButton: Locator
    page: any;

    constructor(page) {
        this.page = page;
        this.nameInput = page.locator('#signupName')
        this.lastNameInput = page.locator('#signupLastName')
        this.emailInput = page.locator('#signupEmail')
        this.passwordInput = page.locator('#signupPassword')
        this.reenterPasswordInput = page.locator('#signupRepeatPassword')
        this.registerButton = page.getByRole('button', {name: 'Register'})
        this.signUpButton = page.getByRole('button', {name: 'Sign up'})
    }

    async navigate() {
        const url = process.env.BASE_URL;
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        await this.page.goto('https://' + username + ':' + password + '@qauto.forstudy.space');

        /* так как в playwright.config.ts указано storageState: 'storageState.json',
            то для того, чтобы протестировать регистрацию, нужно вначале вылогинится
        */
        await this.page.locator('#userNavDropdown').click()
        await this.page.getByRole('button', {name: 'Logout'}).click()
        await this.signUpButton.click()
    }

    async setUsername(username) {
        await this.nameInput.fill(username)
    }

    async setLastName(lastName) {
        await this.lastNameInput.fill(lastName)
    }

    async setEmail(email) {
        await this.emailInput.fill(email)
    }

    async setPassword(password) {
        await this.passwordInput.fill(password)
    }

    async setReenterPassword(password) {
        await this.reenterPasswordInput.fill(password)
    }

    async clickRegisterButton() {
        await this.registerButton.click()
    }
}

module.exports = LoginPageQauto;