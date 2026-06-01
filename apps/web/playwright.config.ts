/**
 * @format
 * @module PlaywrightConfig
 * @description End-to-end test configuration for built web output.
 * @author auto
 * @since 1.0.0
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 60_000,
    testDir: 'src/tests/e2e/__tests__',
    use: {
        baseURL: 'http://127.0.0.1:3000',
        trace: 'on-first-retry',
    },
    webServer: {
        command:
            "node -e \"require('node:fs').rmSync('.next', { recursive: true, force: true })\" && corepack pnpm dev",
        port: 3000,
        reuseExistingServer: true,
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
