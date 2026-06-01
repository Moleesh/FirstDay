/**
 * @format
 * @module PdfService
 * @description Builds and signs onboarding PDFs.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';

@Injectable()
export class PdfService {
    /**
     * Creates a minimal unsigned PDF document.
     * @param title - PDF title text.
     * @returns PDF bytes.
     */
    async createUnsignedPdf(title: string): Promise<Uint8Array> {
        const pdf = await PDFDocument.create();
        const page = pdf.addPage();
        page.drawText(title);
        return pdf.save();
    }
}
