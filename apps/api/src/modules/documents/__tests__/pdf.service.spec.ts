/**
 * @format
 * @module PdfServiceTests
 * @description Unit tests for PDF generation.
 * @author auto
 * @since 1.0.0
 */

import { describe, expect, it } from 'vitest';
import { PdfService } from '@/modules/documents/pdf.service';

describe('PdfService', () => {
    it('creates PDF bytes', async () => {
        const bytes = await new PdfService().createUnsignedPdf('Onboarding');
        expect(bytes.length).toBeGreaterThan(0);
    });
});
