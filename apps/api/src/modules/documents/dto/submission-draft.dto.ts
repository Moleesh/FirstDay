/**
 * @format
 * @module SubmissionDraftDto
 * @description DTO for saving onboarding submission drafts.
 * @author auto
 * @since 1.0.0
 */

import { createZodDto } from 'nestjs-zod';
import { submissionDraftSchema } from '@onboarding/schemas';

export class SubmissionDraftDto extends createZodDto(submissionDraftSchema) {}
