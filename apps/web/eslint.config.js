/**
 * @format
 * @module WebEslintConfig
 * @description Adds Next.js rules to the shared monorepo lint configuration.
 * @author auto
 * @since 1.0.0
 */

import { FlatCompat } from '@eslint/eslintrc';
import sharedConfig from '@onboarding/config/eslint';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default [...sharedConfig, ...compat.extends('next/core-web-vitals')];
