/**
 * @format
 * @module AuditSchemas
 * @description Audit logging payload validation schemas.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { auditActionSchema } from './enums';

export const auditLogSchema = z.object({
	recruiterId: z.string().uuid().optional(),
	action: auditActionSchema,
	entityType: z.string().min(2),
	entityId: z.string().min(1),
	metadata: z.record(z.unknown()).optional(),
});
