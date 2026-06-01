/**
 * @format
 * @module RolesGuard
 * @description Enforces route role metadata for recruiter principals.
 * @author auto
 * @since 1.0.0
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	/**
	 * Checks whether the request user has an allowed role.
	 * @param context - Nest execution context.
	 * @returns Whether access is allowed.
	 */
	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!roles?.length) {
			return true;
		}
		const request = context.switchToHttp().getRequest<{ user?: { role?: string } }>();
		return Boolean(request.user?.role && roles.includes(request.user.role));
	}
}
