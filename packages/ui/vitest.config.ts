/**
 * @format
 * @module UiVitestConfig
 * @description Shared UI test configuration that ignores generated output.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['dist/**', 'node_modules/**'],
    },
});
