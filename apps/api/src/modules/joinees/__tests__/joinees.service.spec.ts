/**
 * @format
 * @module JoineesServiceTests
 * @description Unit tests for joinee display ID generation.
 * @author auto
 * @since 1.0.0
 */

import { describe, expect, it } from 'vitest';
import { generateJoineeId, JoineesService } from '@/modules/joinees/joinees.service';

describe('generateJoineeId', () => {
    it('pads the sequence to five digits', () => {
        expect(generateJoineeId(2026, 42)).toBe('JN-2026-00042');
    });

    it('rejects sequences above the display range', () => {
        expect(() => generateJoineeId(2026, 100_000)).toThrow();
    });
});

describe('JoineesService', () => {
    it('persists joinees with a one-time access code', async () => {
        const countQuery = { like: async (): Promise<unknown> => ({ count: 41, error: null }) };
        const insertQuery = {
            select: (): unknown => ({
                single: async (): Promise<unknown> => ({
                    data: {
                        display_id: 'JN-2026-00042',
                        id: 'joinee-1',
                        template_id: 'template-1',
                    },
                    error: null,
                }),
            }),
        };
        const supabase = {
            assertNoError: (): void => undefined,
            client: {
                from: (): unknown => ({
                    insert: (): unknown => insertQuery,
                    select: (): unknown => countQuery,
                }),
            },
        };
        const service = new JoineesService(supabase as never);
        const result = await service.create(
            { fullName: 'Alex Rao', templateId: 'template-1' },
            {
                email: 'recruiter@example.com',
                id: 'recruiter-1',
                orgId: 'org-1',
                role: 'RECRUITER',
                supabaseUserId: 'supabase-1',
            },
        );

        expect(result.displayId).toMatch(/^JN-\d{4}-00042$/);
        expect(result.accessCode).toHaveLength(12);
    });
});
