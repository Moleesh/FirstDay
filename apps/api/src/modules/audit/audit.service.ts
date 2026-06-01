/**
 * @format
 * @module AuditService
 * @description Records immutable mutation audit events.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import winston from 'winston';
import { SupabaseService } from '@/modules/supabase/supabase.service';

@Injectable()
export class AuditService {
    private readonly logger = winston.createLogger({
        transports: [new winston.transports.Console()],
    });

    constructor(private readonly supabaseService: SupabaseService) {}

    /**
     * Records a mutation audit event.
     * @param method - HTTP mutation method.
     * @param url - Mutated route URL.
     * @param recruiterId - Optional recruiter identifier.
     * @returns A promise that resolves once logged.
     */
    async recordMutation(method: string, url: string, recruiterId?: string): Promise<void> {
        const { error } = await this.supabaseService.client.from('audit_logs').insert({
            action: method,
            entity_id: url,
            entity_type: 'HTTP_ROUTE',
            recruiter_id: recruiterId,
        });
        this.supabaseService.assertNoError(error);
        this.logger.info('audit.mutation', { method, url, recruiterId });
    }
}
