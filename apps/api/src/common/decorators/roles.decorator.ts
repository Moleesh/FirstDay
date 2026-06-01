/**
 * @format
 * @module RolesDecorator
 * @description Declares recruiter roles required for a route.
 * @author auto
 * @since 1.0.0
 */

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Marks a controller handler with allowed roles.
 * @param roles - Allowed recruiter roles.
 * @returns A Nest metadata decorator.
 */
export function Roles(...roles: string[]): ReturnType<typeof SetMetadata> {
	return SetMetadata(ROLES_KEY, roles);
}
