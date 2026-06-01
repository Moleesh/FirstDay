/**
 * @format
 * @module JoineeStrategy
 * @description Passport JWT strategy for joinee-scoped tokens.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { JoineePrincipal } from '@/modules/auth/auth.types';

@Injectable()
export class JoineeStrategy extends PassportStrategy(Strategy, 'joinee') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JOINEE_JWT_SECRET ?? '',
		});
	}

	/**
	 * Maps joinee JWT claims to a request principal.
	 * @param payload - Joinee token payload.
	 * @returns Authenticated joinee principal.
	 */
	validate(payload: { displayId: string; joineeId: string }): JoineePrincipal {
		return { displayId: payload.displayId, id: payload.joineeId };
	}
}
