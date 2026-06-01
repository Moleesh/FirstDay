/**
 * @format
 * @module RecruitersModule
 * @description Recruiter profile and dashboard module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { RecruitersController } from '@/modules/recruiters/recruiters.controller';
import { RecruitersService } from '@/modules/recruiters/recruiters.service';

@Module({
	controllers: [RecruitersController],
	providers: [RecruitersService],
	exports: [RecruitersService],
})
export class RecruitersModule {}
