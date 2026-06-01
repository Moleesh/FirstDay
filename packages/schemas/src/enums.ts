/**
 * @format
 * @module SchemaEnums
 * @description Shared enum schemas for onboarding domain state.
 * @author auto
 * @since 1.0.0
 */

import { z } from 'zod';

export const recruiterRoleSchema = z.enum(['ADMIN', 'RECRUITER']);
export const joineeStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']);
export const fieldTypeSchema = z.enum(['TEXT', 'MULTISELECT', 'BULLET']);
export const auditActionSchema = z.enum([
    'CREATE_JOINEE',
    'ASSIGN_TEMPLATE',
    'CREATE_TEMPLATE',
    'UPDATE_TEMPLATE',
    'VIEW_SUBMISSION',
    'COMPLETE_SUBMISSION',
]);
