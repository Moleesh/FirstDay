/**
 * @format
 * @module SubmissionSchemas
 * @description Submission, upload, and signature validation schemas.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { ALLOWED_UPLOAD_MIME_TYPES, MAX_UPLOAD_BYTES } from './constants';

export const uploadMetadataSchema = z.object({
	label: z.string().min(2),
	mimeType: z.enum(ALLOWED_UPLOAD_MIME_TYPES),
	size: z.number().int().positive().max(MAX_UPLOAD_BYTES),
});

export const submissionDraftSchema = z.object({
	fieldValues: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
	consentGiven: z.boolean().default(false),
});

export const signatureSchema = z.object({
	signatureDataUrl: z.string().startsWith('data:image/png;base64,'),
});

export const submissionSchema = submissionDraftSchema.extend({
	id: z.string().uuid(),
	joineeId: z.string().uuid(),
	signatureUrl: z.string().url().optional(),
	signedPdfUrl: z.string().url().optional(),
	unsignedPdfUrl: z.string().url().optional(),
	completedAt: z.string().datetime().optional(),
});
