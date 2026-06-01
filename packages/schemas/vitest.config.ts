/**
 * @format
 * @module VitestConfig
 * @description Schema test configuration that ignores generated output.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: ['coverage/**', 'dist/**', 'node_modules/**'],
    },
});
