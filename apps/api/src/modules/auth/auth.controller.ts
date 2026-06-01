/**
 * @format
 * @module AuthController
 * @description Exposes recruiter and joinee authentication endpoints.
 * @author auto
 * @since 1.0.0
 */

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { JoineeLoginDto } from '@/modules/auth/dto/joinee-login.dto';
import { RecruiterLoginDto } from '@/modules/auth/dto/recruiter-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	/**
	 * Exchanges a verified Supabase recruiter session for API principal data.
	 * @param dto - Supabase recruiter session payload.
	 * @returns Recruiter principal.
	 */
	@Post('recruiter/session')
	exchangeRecruiterSession(@Body() dto: RecruiterLoginDto): Promise<unknown> {
		return this.authService.exchangeRecruiterSession(dto);
	}

	/**
	 * Authenticates a joinee by display ID and access code.
	 * @param dto - Joinee login credentials.
	 * @returns A scoped joinee token.
	 */
	@Post('joinee/login')
	loginJoinee(@Body() dto: JoineeLoginDto): Promise<unknown> {
		return this.authService.loginJoinee(dto);
	}
}
