/**
 * @format
 * @module JwtAuthGuard
 * @description Guards recruiter routes with bearer JWT authentication.
 * @author auto
 * @since 1.0.0
 */

import { type CanActivate, type ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<{
            headers: { authorization?: string };
            user?: unknown;
        }>();
        const accessToken = request.headers.authorization?.replace(/^Bearer\s+/i, '');
        if (!accessToken) return false;
        request.user = await this.authService.getRecruiterFromAccessToken(accessToken);
        return true;
    }
}
