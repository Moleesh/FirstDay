/**
 * @format
 * @module DocumentsController
 * @description Exposes document template and submission APIs.
 * @author auto
 * @since 1.0.0
 */

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateTemplateDto } from '@/modules/documents/dto/create-template.dto';
import { SubmissionDraftDto } from '@/modules/documents/dto/submission-draft.dto';
import { SubmissionService } from '@/modules/documents/submission.service';
import { TemplatesService } from '@/modules/documents/templates.service';

@Controller('documents')
export class DocumentsController {
    constructor(
        private readonly templatesService: TemplatesService,
        private readonly submissionService: SubmissionService,
    ) {}

    /**
     * Creates a versioned document template.
     * @param dto - Template definition.
     * @returns Created template summary.
     */
    @UseGuards(JwtAuthGuard)
    @Post('templates')
    createTemplate(@Body() dto: CreateTemplateDto): Promise<unknown> {
        return this.templatesService.create(dto);
    }

    /**
     * Lists active templates.
     * @returns Active document templates.
     */
    @UseGuards(JwtAuthGuard)
    @Get('templates')
    listTemplates(): Promise<unknown> {
        return this.templatesService.list();
    }

    /**
     * Saves a joinee draft submission.
     * @param joineeId - Joinee internal identifier.
     * @param dto - Draft values.
     * @returns Saved draft summary.
     */
    @Post('submissions/:joineeId/draft')
    saveDraft(
        @Param('joineeId') joineeId: string,
        @Body() dto: SubmissionDraftDto,
    ): Promise<unknown> {
        return this.submissionService.saveDraft(joineeId, dto);
    }
}
