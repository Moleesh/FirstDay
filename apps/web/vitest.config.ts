/**
 * @format
 * @module VitestConfig
 * @description Component test configuration for the web app.
 * @author auto
 * @since 1.0.0
 */

import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
        exclude: ['.next/**', 'coverage/**', 'out/**', 'src/tests/e2e/**', 'node_modules/**'],
        globals: true,
        setupFiles: ['src/tests/setup.ts'],
    },
});
