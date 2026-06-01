/**
 * @format
 * @module RecruiterSchemas
 * @description Recruiter and organisation validation schemas.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { recruiterRoleSchema } from './enums';

export const organisationSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2),
    createdAt: z.string().datetime(),
});

export const recruiterSchema = z.object({
    id: z.string().uuid(),
    supabaseUserId: z.string().uuid(),
    email: z.string().email(),
    role: recruiterRoleSchema,
    orgId: z.string().uuid(),
    createdAt: z.string().datetime(),
});
