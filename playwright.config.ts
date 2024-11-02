import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',                  // Каталог с тестами
    timeout: 30000,                      // Таймаут для тестов (в миллисекундах)
    expect: {
        timeout: 5000,                     // Таймаут для assert (в миллисекундах)
    },
    fullyParallel: true,                 // Запускать тесты параллельно
    retries: 1,                          // Количество перезапусков при падении тестов
    reporter: 'html',                    // Отчет в формате HTML
    use: {
        headless: true,                    // Безголовый режим
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,           // Игнорировать ошибки HTTPS
        video: 'retain-on-failure',        // Записывать видео при падении теста
        screenshot: 'only-on-failure',     // Делать скриншот при падении теста
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'WebKit',
        //     use: { ...devices['Desktop Safari'] },
        // },
        // {
        //     name: 'Mobile Chrome',
        //     use: { ...devices['Pixel 5'] },
        // },
        // {
        //     name: 'Mobile Safari',
        //     use: { ...devices['iPhone 12'] },
        // },
    ],
});
