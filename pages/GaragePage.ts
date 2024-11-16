export class GaragePage {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async navigateToGarage() {
        await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.page.click('button:has-text("Add Car")');
        // await this.page.fill('#addCarBrand', brand);
        // await this.page.fill('#addCarModel', model);
        await this.page.fill('#addCarMileage', mileage);
        await this.page.getByRole('button', {name: 'Add'})
    }

    async isCarVisible(brand: string, model: string) {
        return await this.page.isVisible(`text=${brand} ${model}`);
    }
}
