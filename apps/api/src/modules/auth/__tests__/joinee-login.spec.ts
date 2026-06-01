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
		const supabase = {
			assertNoError: (): void => undefined,
			client: {
				from: (): unknown => ({
					select: (): unknown => ({
						eq: (): unknown => ({
							maybeSingle: async (): Promise<unknown> => ({
								data: {
									access_code_hash: hash,
									display_id: 'JN-2026-00042',
									id: 'joinee-1',
								},
								error: null,
							}),
						}),
					}),
				}),
			},
		};
		const service = new AuthService(jwtService as never, supabase as never);
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
