/**
 * @format
 * @module RecruiterLoginDto
 * @description DTO for Supabase recruiter session exchange.
 * @author auto
 * @since 1.0.0
 */

import { createZodDto } from 'nestjs-zod';
import { recruiterSessionSchema } from '@onboarding/schemas';

export class RecruiterLoginDto extends createZodDto(recruiterSessionSchema) {}
