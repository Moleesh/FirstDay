/**
 * @format
 * @module TemplatesService
 * @description Manages versioned document templates.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import type { DocumentTemplateInput } from '@onboarding/types';

@Injectable()
export class TemplatesService {
    /**
     * Creates a document template version.
     * @param template - Template input data.
     * @returns Created template summary.
     */
    async create(template: DocumentTemplateInput): Promise<{ name: string; version: number }> {
        return { name: template.name, version: template.version };
    }

    /**
     * Lists active template summaries.
     * @returns Active templates.
     */
    async list(): Promise<Array<{ name: string; version: number }>> {
        return [];
    }
}
