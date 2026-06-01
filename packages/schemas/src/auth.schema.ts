/**
 * @format
 * @module AuthSchemas
 * @description Authentication validation schemas for recruiters and joinees.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { JOINEE_DISPLAY_ID_PATTERN } from './constants';

export const recruiterSessionSchema = z.object({
	accessToken: z.string().min(1),
	supabaseUserId: z.string().uuid(),
	email: z.string().email(),
});

export const joineeLoginSchema = z.object({
	displayId: z.string().regex(JOINEE_DISPLAY_ID_PATTERN),
	accessCode: z.string().min(6).max(32),
});

export const authTokenSchema = z.object({
	token: z.string().min(1),
	expiresAt: z.string().datetime(),
});
