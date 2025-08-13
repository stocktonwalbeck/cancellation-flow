// @ts-check
import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173';
const VERCEL_BYPASS = process.env.VERCEL_PROTECTION_BYPASS || process.env.X_VERCEL_PROTECTION_BYPASS;
const isLocal = /^https?:\/\/localhost|127\.0\.0\.1/.test(BASE_URL);

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    headless: true,
    extraHTTPHeaders: VERCEL_BYPASS ? { 'x-vercel-protection-bypass': VERCEL_BYPASS } : undefined,
  },
  webServer: isLocal
    ? {
        command: 'npm run preview -- --port 4173 --strictPort',
        port: 4173,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
      }
    : undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});


