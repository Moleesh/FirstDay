/**
 * @format
 * @module DocumentSchemas
 * @description Document template, page, and field validation schemas.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';
import { fieldTypeSchema } from './enums';

export const mandatoryDocSchema = z.object({
    id: z.string().uuid().optional(),
    label: z.string().min(2),
});

export const templateFieldSchema = z.object({
    id: z.string().uuid().optional(),
    label: z.string().min(2),
    fieldType: fieldTypeSchema,
    defaultValue: z.string().optional(),
    required: z.boolean().default(true),
    skipNote: z.string().optional(),
    order: z.number().int().nonnegative(),
});

export const templatePageSchema = z.object({
    id: z.string().uuid().optional(),
    order: z.number().int().nonnegative(),
    sourceUrl: z.string().url(),
});

export const documentTemplateSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(2),
    version: z.number().int().positive().default(1),
    mandatoryDocs: z.array(mandatoryDocSchema).min(1),
    fields: z.array(templateFieldSchema),
    pages: z.array(templatePageSchema),
});
