import { test as baseTest, expect } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';

type CustomFixtures = {
    userGaragePage: GaragePage;
};

const test = baseTest.extend<CustomFixtures>({
    userGaragePage: async ({ page }, use) => {
        const garagePage = new GaragePage(page);
        await use(garagePage);
    },
});

export { test, expect };
