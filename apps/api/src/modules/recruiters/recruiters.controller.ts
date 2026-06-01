/**
 * @format
 * @module RecruitersController
 * @description Exposes recruiter dashboard APIs.
 * @author auto
 * @since 1.0.0
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { RecruitersService } from '@/modules/recruiters/recruiters.service';

@UseGuards(JwtAuthGuard)
@Controller('recruiters')
export class RecruitersController {
	constructor(private readonly recruitersService: RecruitersService) {}

	/**
	 * Returns dashboard summary counts.
	 * @returns Recruiter dashboard metrics.
	 */
	@Get('dashboard')
	dashboard(): Promise<unknown> {
		return this.recruitersService.dashboard();
	}
}
