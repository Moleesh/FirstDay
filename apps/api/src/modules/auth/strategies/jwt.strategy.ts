/**
 * @format
 * @module JwtStrategy
 * @description Passport JWT strategy for recruiter bearer tokens.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { RecruiterPrincipal } from '@/modules/auth/auth.types';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly prismaService: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SUPABASE_JWT_SECRET ?? '',
		});
	}

	/**
	 * Maps JWT claims to a recruiter principal.
	 * @param payload - Supabase JWT payload.
	 * @returns Authenticated recruiter principal.
	 */
	async validate(payload: { sub: string; email?: string }): Promise<RecruiterPrincipal | null> {
		const recruiter = await this.prismaService.recruiter.findUnique({
			where: { supabaseUserId: payload.sub },
		});
		if (!recruiter) {
			return null;
		}
		return {
			email: recruiter.email,
			id: recruiter.id,
			orgId: recruiter.orgId,
			role: recruiter.role,
			supabaseUserId: recruiter.supabaseUserId,
		};
	}
}
