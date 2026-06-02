/**
 * @format
 * @module WebEslintConfig
 * @description Adds Next.js rules to the shared monorepo lint configuration.
 * @author auto
 * @since 1.0.0
 */

import { fixupPluginRules } from '@eslint/compat';
import nextPlugin from '@next/eslint-plugin-next';
import sharedConfig from '@onboarding/config/eslint';

const nextRules = {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    'react/display-name': 'off',
};

export default [
    ...sharedConfig,
    {
        plugins: {
            '@next/next': fixupPluginRules(nextPlugin),
        },
        rules: nextRules,
    },
];
