import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  timeout: 60000,
  reporter: [['list', { printSteps: false }]],
  use: {
    baseURL: 'https://automationteststore.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
