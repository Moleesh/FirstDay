/**
 * @format
 * @module AuthTypes
 * @description Internal authenticated principal types for API guards.
 * @author auto
 * @since 1.0.0
 */

export type RecruiterPrincipal = {
	id: string;
	orgId: string;
	role: string;
	supabaseUserId: string;
	email: string;
};
