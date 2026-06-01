/**
 * @format
 * @module AuthService
 * @description Coordinates Supabase recruiter auth and joinee scoped tokens.
 * @author auto
 * @since 1.0.0
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import type { JoineeLogin, RecruiterSession } from '@onboarding/types';
import type { RecruiterPrincipal } from '@/modules/auth/auth.types';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
	) {}

	/**
	 * Creates a Supabase admin client for recruiter session verification.
	 * @returns Supabase client instance.
	 */
	private createSupabaseClient(): ReturnType<typeof createClient> {
		return createClient(
			process.env.SUPABASE_URL ?? '',
			process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
		);
	}

	/**
	 * Verifies Supabase auth and returns recruiter identity.
	 * @param session - Supabase session exchange input.
	 * @returns Recruiter principal data.
	 */
	async exchangeRecruiterSession(session: RecruiterSession): Promise<RecruiterPrincipal> {
		const { data, error } = await this.createSupabaseClient().auth.getUser(session.accessToken);
		if (error || data.user?.id !== session.supabaseUserId) {
			throw new UnauthorizedException('Invalid recruiter session');
		}
		const recruiter = await this.prismaService.recruiter.findUnique({
			where: { supabaseUserId: session.supabaseUserId },
		});
		if (!recruiter) {
			throw new UnauthorizedException('Recruiter is not provisioned');
		}
		return {
			email: recruiter.email,
			id: recruiter.id,
			orgId: recruiter.orgId,
			role: recruiter.role,
			supabaseUserId: recruiter.supabaseUserId,
		};
	}

	/**
	 * Issues a scoped joinee token after access-code validation.
	 * @param login - Joinee display ID and access code.
	 * @returns A signed joinee token payload.
	 */
	async loginJoinee(login: JoineeLogin): Promise<{ token: string; displayId: string }> {
		const joinee = await this.prismaService.joinee.findUnique({
			where: { displayId: login.displayId },
		});
		if (!joinee || !(await bcrypt.compare(login.accessCode, joinee.accessCodeHash))) {
			throw new UnauthorizedException('Invalid joinee credentials');
		}
		return {
			displayId: login.displayId,
			token: await this.jwtService.signAsync({
				displayId: login.displayId,
				joineeId: joinee.id,
			}),
		};
	}
}
