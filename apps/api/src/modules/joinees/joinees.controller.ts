/**
 * @format
 * @module JoineesController
 * @description Exposes recruiter-managed joinee APIs.
 * @author auto
 * @since 1.0.0
 */

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { RecruiterPrincipal } from '@/modules/auth/auth.types';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateJoineeDto } from '@/modules/joinees/dto/create-joinee.dto';
import { JoineesService } from '@/modules/joinees/joinees.service';

@UseGuards(JwtAuthGuard)
@Controller('joinees')
export class JoineesController {
	constructor(private readonly joineesService: JoineesService) {}

	/**
	 * Lists joinees for the recruiter dashboard.
	 * @returns Joinee status summaries.
	 */
	@Get()
	list(@CurrentUser() user: RecruiterPrincipal): Promise<unknown> {
		return this.joineesService.list(user);
	}

	/**
	 * Creates a joinee assignment.
	 * @param dto - Joinee creation input.
	 * @returns Created joinee summary.
	 */
	@Post()
	create(
		@Body() dto: CreateJoineeDto,
		@CurrentUser() user: RecruiterPrincipal,
	): Promise<unknown> {
		return this.joineesService.create(dto, user);
	}
}
