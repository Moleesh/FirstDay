/**
 * @format
 * @module JoineeLoginTests
 * @description Unit tests for database-backed joinee authentication.
 * @author auto
 * @since 1.0.0
 */

import bcrypt from 'bcryptjs';
import { describe, expect, it, vi } from 'vitest';
import { AuthService } from '@/modules/auth/auth.service';

describe('AuthService joinee login', () => {
	it('issues scoped tokens for stored access-code hashes', async () => {
		const hash = await bcrypt.hash('123456', 4);
		const jwtService = { signAsync: vi.fn(async (): Promise<string> => 'signed-token') };
		const prisma = {
			joinee: {
				findUnique: async (): Promise<unknown> => ({
					accessCodeHash: hash,
					displayId: 'JN-2026-00042',
					id: 'joinee-1',
				}),
			},
		};
		const service = new AuthService(jwtService as never, prisma as never);
		const result = await service.loginJoinee({
			accessCode: '123456',
			displayId: 'JN-2026-00042',
		});

		expect(result.token).toBe('signed-token');
		expect(jwtService.signAsync).toHaveBeenCalledWith({
			displayId: 'JN-2026-00042',
			joineeId: 'joinee-1',
		});
	});
});
