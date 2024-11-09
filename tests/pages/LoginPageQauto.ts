import {test, expect, Locator} from '@playwright/test';
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
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
        await this.signUpButton.click()
    }
    async setUsername(username){
        await this.nameInput.fill(username)
    }
    async setLastName(lastName){
        await this.lastNameInput.fill(lastName)
    }
    async setEmail(email){
        await this.emailInput.fill(email)
    }
    async setPassword(password){
        await this.passwordInput.fill(password)
    }
    async setReenterPassword(password){
        await this.reenterPasswordInput.fill(password)
    }
    async clickRegisterButton(){
        await this.registerButton.click()
    }
}
module.exports = LoginPageQauto;