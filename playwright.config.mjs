import { defineConfig, devices } from '@playwright/test';

const browserBaseURL = process.env.LONDONTOUR_BROWSER_BASE_URL || 'http://127.0.0.1:3000';
const useExternalServer = Boolean(process.env.LONDONTOUR_BROWSER_BASE_URL);
const testTimeout = useExternalServer ? 90_000 : 30_000;

export default defineConfig({
  testDir: './tests/browser',
  timeout: testTimeout,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: browserBaseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: useExternalServer ? undefined : {
    command: 'npx --yes serve public --listen 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
  ],
});
