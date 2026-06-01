/**
 * @format
 * @module CreateJoineeDto
 * @description DTO for assigning a joinee to a template.
 * @author auto
 * @since 1.0.0
 */

import { createZodDto } from 'nestjs-zod';
import { createJoineeSchema } from '@onboarding/schemas';

export class CreateJoineeDto extends createZodDto(createJoineeSchema) {}
