/**
 * @format
 * @module JoineeLoginTests
 * @description Unit tests for database-backed joinee authentication.
 * @author auto
 * @since 1.0.0
 */

import bcrypt from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { AuthService } from '@/modules/auth/auth.service';

describe('AuthService joinee login', () => {
    it('returns identity for stored access-code hashes', async () => {
        const hash = await bcrypt.hash('123456', 4);
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
        const service = new AuthService(supabase as never);
        const result = await service.loginJoinee({
            accessCode: '123456',
            displayId: 'JN-2026-00042',
        });

        expect(result).toEqual({ displayId: 'JN-2026-00042', joineeId: 'joinee-1' });
    });
});
