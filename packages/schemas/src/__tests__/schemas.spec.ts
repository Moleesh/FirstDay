/**
 * @format
 * @module SchemaTests
 * @description Unit tests for shared validation schemas.
 * @author auto
 * @since 1.0.0
 */

import { describe, expect, it } from 'vitest';
import { joineeLoginSchema, uploadMetadataSchema } from '../index';

describe('shared schemas', () => {
    it('accepts valid joinee display IDs', () => {
        expect(
            joineeLoginSchema.parse({ displayId: 'JN-2026-00042', accessCode: '123456' }),
        ).toBeTruthy();
    });

    it('rejects unsupported upload MIME types', () => {
        expect(() =>
            uploadMetadataSchema.parse({ label: 'doc', mimeType: 'text/html', size: 1 }),
        ).toThrow();
    });
});
