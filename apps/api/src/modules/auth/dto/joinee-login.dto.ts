/**
 * @format
 * @module JoineeLoginDto
 * @description DTO for joinee numeric access login.
 * @author auto
 * @since 1.0.0
 */

import { createZodDto } from 'nestjs-zod';
import { joineeLoginSchema } from '@onboarding/schemas';

export class JoineeLoginDto extends createZodDto(joineeLoginSchema) {}
