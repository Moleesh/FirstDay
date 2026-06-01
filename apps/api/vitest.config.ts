/**
 * @format
 * @module ApiVitestConfig
 * @description Unit test configuration for the API app.
 * @author auto
 * @since 1.0.0
 */

import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		environment: 'node',
		globals: true,
		maxWorkers: 1,
		minWorkers: 1,
	},
});
