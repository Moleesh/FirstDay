/**
 * @format
 * @module AuthService
 * @description Coordinates Supabase recruiter auth and joinee scoped tokens.
 * @author auto
 * @since 1.0.0
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import type { JoineeLogin, RecruiterSession } from '@onboarding/types';
import type { RecruiterPrincipal } from '@/modules/auth/auth.types';
import { SupabaseService } from '@/modules/supabase/supabase.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly supabaseService: SupabaseService,
	) {}

	/**
	 * Resolves a recruiter principal from a Supabase access token.
	 * @param accessToken - Supabase bearer token.
	 * @returns Provisioned recruiter principal.
	 */
	async getRecruiterFromAccessToken(accessToken: string): Promise<RecruiterPrincipal> {
		const { data, error } = await this.supabaseService.client.auth.getUser(accessToken);
		if (error || !data.user) throw new UnauthorizedException('Invalid recruiter session');
		const { data: recruiter, error: recruiterError } = await this.supabaseService.client
			.from('recruiters')
			.select('id, org_id, role, supabase_user_id, email')
			.eq('supabase_user_id', data.user.id)
			.maybeSingle();
		this.supabaseService.assertNoError(recruiterError);
		if (!recruiter) throw new UnauthorizedException('Recruiter is not provisioned');
		return {
			email: recruiter.email,
			id: recruiter.id,
			orgId: recruiter.org_id,
			role: recruiter.role,
			supabaseUserId: recruiter.supabase_user_id,
		};
	}

	/**
	 * Verifies Supabase auth and returns recruiter identity.
	 * @param session - Supabase session exchange input.
	 * @returns Recruiter principal data.
	 */
	async exchangeRecruiterSession(session: RecruiterSession): Promise<RecruiterPrincipal> {
		const recruiter = await this.getRecruiterFromAccessToken(session.accessToken);
		if (recruiter.supabaseUserId !== session.supabaseUserId) {
			throw new UnauthorizedException('Invalid recruiter session');
		}
		return recruiter;
	}

	/**
	 * Issues a scoped joinee token after access-code validation.
	 * @param login - Joinee display ID and access code.
	 * @returns A signed joinee token payload.
	 */
	async loginJoinee(login: JoineeLogin): Promise<{ token: string; displayId: string }> {
		const { data: joinee, error } = await this.supabaseService.client
			.from('joinees')
			.select('id, display_id, access_code_hash')
			.eq('display_id', login.displayId)
			.maybeSingle();
		this.supabaseService.assertNoError(error);
		if (!joinee || !(await bcrypt.compare(login.accessCode, joinee.access_code_hash))) {
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
