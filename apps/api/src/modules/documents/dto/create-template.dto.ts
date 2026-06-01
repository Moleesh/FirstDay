/**
 * @format
 * @module CreateTemplateDto
 * @description DTO for creating document templates.
 * @author auto
 * @since 1.0.0
 */

import { createZodDto } from 'nestjs-zod';
import { documentTemplateSchema } from '@onboarding/schemas';

export class CreateTemplateDto extends createZodDto(documentTemplateSchema) {}
