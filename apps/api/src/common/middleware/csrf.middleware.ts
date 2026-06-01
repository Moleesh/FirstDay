/**
 * @format
 * @module CsrfMiddleware
 * @description Rejects state-changing requests without a CSRF token marker.
 * @author auto
 * @since 1.0.0
 */

import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
    /**
     * Enforces a CSRF header for mutations.
     * @param req - Incoming request.
     * @param _res - Outgoing response.
     * @param next - Next middleware callback.
     */
    use(req: Request, _res: Response, next: NextFunction): void {
        if (MUTATION_METHODS.has(req.method) && !req.headers['x-csrf-token']) {
            throw new ForbiddenException('Missing CSRF token');
        }
        next();
    }
}
