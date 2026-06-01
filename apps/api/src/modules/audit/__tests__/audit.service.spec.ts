/**
 * @format
 * @module AuditServiceTests
 * @description Unit tests for persistent audit logging.
 * @author auto
 * @since 1.0.0
 */

import { describe, expect, it, vi } from 'vitest';
import { AuditService } from '@/modules/audit/audit.service';

describe('AuditService', () => {
	it('stores mutation audit events', async () => {
		const create = vi.fn(async (): Promise<unknown> => ({}));
		const service = new AuditService({ auditLog: { create } } as never);

		await service.recordMutation('POST', '/joinees', 'recruiter-1');

		expect(create).toHaveBeenCalledWith({
			data: {
				action: 'POST',
				entityId: '/joinees',
				entityType: 'HTTP_ROUTE',
				recruiterId: 'recruiter-1',
			},
		});
	});
});
