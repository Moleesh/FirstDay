/**
 * @format
 * @module AuditInterceptor
 * @description Records mutation audit metadata after successful writes.
 * @author auto
 * @since 1.0.0
 */

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap, type Observable } from 'rxjs';
import { AuditService } from '@/modules/audit/audit.service';

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
	constructor(private readonly auditService: AuditService) {}

	/**
	 * Logs successful mutation requests.
	 * @param context - Nest execution context.
	 * @param next - Next handler in the pipeline.
	 * @returns The downstream response observable.
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const request = context
			.switchToHttp()
			.getRequest<{ method: string; url: string; user?: { id?: string } }>();
		return next.handle().pipe(
			tap(() => {
				if (MUTATION_METHODS.has(request.method)) {
					void this.auditService.recordMutation(
						request.method,
						request.url,
						request.user?.id,
					);
				}
			}),
		);
	}
}
