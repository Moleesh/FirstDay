/**
 * @format
 * @module AuditService
 * @description Records immutable mutation audit events.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import winston from 'winston';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuditService {
	private readonly logger = winston.createLogger({
		transports: [new winston.transports.Console()],
	});

	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * Records a mutation audit event.
	 * @param method - HTTP mutation method.
	 * @param url - Mutated route URL.
	 * @param recruiterId - Optional recruiter identifier.
	 * @returns A promise that resolves once logged.
	 */
	async recordMutation(method: string, url: string, recruiterId?: string): Promise<void> {
		await this.prismaService.auditLog.create({
			data: {
				action: method,
				entityId: url,
				entityType: 'HTTP_ROUTE',
				recruiterId,
			},
		});
		this.logger.info('audit.mutation', { method, url, recruiterId });
	}
}
