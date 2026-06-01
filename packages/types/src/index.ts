/**
 * @format
 * @module TypesIndex
 * @description Inferred TypeScript domain types from shared Zod schemas.
 * @author auto
 * @since 1.0.0
 */

import type { z } from 'zod';
import type {
	auditLogSchema,
	authTokenSchema,
	createJoineeSchema,
	documentTemplateSchema,
	joineeLoginSchema,
	joineeSchema,
	organisationSchema,
	recruiterSchema,
	recruiterSessionSchema,
	signatureSchema,
	submissionDraftSchema,
	submissionSchema,
	uploadMetadataSchema,
} from '@onboarding/schemas';

export type AuditLogInput = z.infer<typeof auditLogSchema>;
export type AuthToken = z.infer<typeof authTokenSchema>;
export type CreateJoineeInput = z.infer<typeof createJoineeSchema>;
export type DocumentTemplateInput = z.infer<typeof documentTemplateSchema>;
export type Joinee = z.infer<typeof joineeSchema>;
export type JoineeLogin = z.infer<typeof joineeLoginSchema>;
export type Organisation = z.infer<typeof organisationSchema>;
export type Recruiter = z.infer<typeof recruiterSchema>;
export type RecruiterSession = z.infer<typeof recruiterSessionSchema>;
export type SignatureInput = z.infer<typeof signatureSchema>;
export type Submission = z.infer<typeof submissionSchema>;
export type SubmissionDraft = z.infer<typeof submissionDraftSchema>;
export type UploadMetadata = z.infer<typeof uploadMetadataSchema>;
