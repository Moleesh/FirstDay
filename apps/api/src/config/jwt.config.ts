/**
 * @format
 * @module JwtConfig
 * @description JWT configuration for joinee-scoped tokens.
 * @author auto
 * @since 1.0.0
 */

export const jwtConfig = {
	joineeSecret: process.env.JOINEE_JWT_SECRET ?? '',
	expiresIn: '2h',
};
