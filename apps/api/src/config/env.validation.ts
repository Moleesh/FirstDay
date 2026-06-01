/**
 * @format
 * @module EnvValidation
 * @description Validates required API environment variables at boot.
 * @author auto
 * @since 1.0.0
 */

import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GEMINI_API_KEY: z.string().optional(),
		JOINEE_JWT_SECRET: z.string().min(32),
		RESEND_API_KEY: z.string().optional(),
		SUPABASE_SECRET_KEY: z.string().min(1),
		SUPABASE_URL: z.string().url(),
		WEB_ORIGIN: z.string().url(),
	},
	runtimeEnv: process.env,
});
