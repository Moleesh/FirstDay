/**
 * @format
 * @module AuditModule
 * @description Audit log recording module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { AuditService } from '@/modules/audit/audit.service';

@Module({
	providers: [AuditService],
	exports: [AuditService],
})
export class AuditModule {}
