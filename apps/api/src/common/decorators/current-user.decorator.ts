/**
 * @format
 * @module CurrentUserDecorator
 * @description Extracts the authenticated user from the request.
 * @author auto
 * @since 1.0.0
 */

import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

/**
 * Reads the current authenticated principal from request context.
 * @param _data - Unused decorator data.
 * @param ctx - Nest execution context.
 * @returns The authenticated request user.
 */
export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): unknown => {
        return ctx.switchToHttp().getRequest<{ user?: unknown }>().user;
    },
);
