/**
 * @format
 * @module JoineeSchemas
 * @description Joinee validation schemas and display ID rules.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { JOINEE_DISPLAY_ID_PATTERN } from './constants';
import { joineeStatusSchema } from './enums';

export const createJoineeSchema = z.object({
	templateId: z.string().uuid(),
	fullName: z.string().min(2),
	email: z.string().email().optional(),
});

export const joineeSchema = z.object({
	id: z.string().uuid(),
	displayId: z.string().regex(JOINEE_DISPLAY_ID_PATTERN),
	orgId: z.string().uuid(),
	recruiterId: z.string().uuid(),
	status: joineeStatusSchema,
	templateId: z.string().uuid(),
	createdAt: z.string().datetime(),
});
