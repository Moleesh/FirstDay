/**
 * @format
 * @module PlaywrightConfig
 * @description End-to-end test configuration for built web output.
 * @author auto
 * @since 1.0.0
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'src/tests/e2e',
	use: {
		baseURL: 'http://127.0.0.1:3000',
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'corepack pnpm dev',
		port: 3000,
		reuseExistingServer: true,
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
