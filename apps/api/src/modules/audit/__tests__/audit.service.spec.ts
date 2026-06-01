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
		const insert = vi.fn(async (): Promise<unknown> => ({ error: null }));
		const service = new AuditService({
			assertNoError: vi.fn(),
			client: { from: vi.fn(() => ({ insert })) },
		} as never);

		await service.recordMutation('POST', '/joinees', 'recruiter-1');

		expect(insert).toHaveBeenCalledWith({
			action: 'POST',
			entity_id: '/joinees',
			entity_type: 'HTTP_ROUTE',
			recruiter_id: 'recruiter-1',
		});
	});
});
