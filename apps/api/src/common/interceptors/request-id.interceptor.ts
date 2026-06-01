/**
 * @format
 * @module RequestIdInterceptor
 * @description Adds request ID correlation to every response.
 * @author auto
 * @since 1.0.0
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Observable } from 'rxjs';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
    /**
     * Attaches a request ID header for trace correlation.
     * @param context - Nest execution context.
     * @param next - Next handler in the pipeline.
     * @returns The downstream response observable.
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const response = context.switchToHttp().getResponse();
        response.header('x-request-id', randomUUID());
        return next.handle();
    }
}
