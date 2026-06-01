/**
 * @format
 * @module TransformInterceptor
 * @description Wraps successful API responses in a stable envelope.
 * @author auto
 * @since 1.0.0
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	/**
	 * Wraps handler data in an `ok` response envelope.
	 * @param _context - Nest execution context.
	 * @param next - Next handler in the pipeline.
	 * @returns The transformed response observable.
	 */
	intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
		return next.handle().pipe(map((data: unknown) => ({ ok: true, data })));
	}
}
