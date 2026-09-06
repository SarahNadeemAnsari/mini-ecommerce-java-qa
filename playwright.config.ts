import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright/tests',

  fullyParallel: true,

  retries: 0,

  workers: undefined,

  reporter: [['html', { open: 'on-failure' }]],

  use: {
    baseURL: 'http://localhost/mini_ecommerce/static',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: false,
    channel: 'chrome',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});