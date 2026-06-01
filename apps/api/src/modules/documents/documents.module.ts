/**
 * @format
 * @module DocumentsModule
 * @description Document templates, extraction, PDF, and submission module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { DocumentsController } from '@/modules/documents/documents.controller';
import { AiExtractService } from '@/modules/documents/ai-extract.service';
import { PdfService } from '@/modules/documents/pdf.service';
import { SubmissionService } from '@/modules/documents/submission.service';
import { TemplatesService } from '@/modules/documents/templates.service';

@Module({
	controllers: [DocumentsController],
	providers: [AiExtractService, PdfService, SubmissionService, TemplatesService],
	exports: [AiExtractService, PdfService, SubmissionService, TemplatesService],
})
export class DocumentsModule {}
