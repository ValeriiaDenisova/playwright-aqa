import {test, expect} from '@playwright/test';
import {GaragePage} from '../pages/GaragePage';


test.describe('Profile. Replace the response body for the specified request', () => {
    let userGaragePage: GaragePage;

    test.beforeEach(async ({page}) => {
        userGaragePage = new GaragePage(page);
        await page.goto('/');
    })

    test('Profile test', async ({page}) => {
        await expect(userGaragePage.page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(userGaragePage.page.locator('h1')).toHaveText('Garage');

        await page.route('**/profile', async (route) => {
            const mockedResponse = {
                status: "ok",
                data: {
                    "userId": 153334,
                    "photoFilename": "default-user.png",
                    "name": "Mock",
                    "lastName": "User"
                }
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedResponse),
            });
        });

        await page.locator('#userNavDropdown').click()
        await page.locator('[routerlink="/panel/profile"]').click()

        await expect(page.locator('.profile_name.display-4')).toHaveText('Mock User')
    });

});