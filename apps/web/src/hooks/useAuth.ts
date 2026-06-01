/**
 * @format
 * @module UseAuth
 * @description Supabase-backed auth hook for recruiter sessions.
 * @author auto
 * @since 1.0.0
 */

import { createClient } from '@supabase/supabase-js';

export function useAuth(): { signIn: (email: string) => Promise<void> } {
	const client = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
	);
	return {
		async signIn(email: string): Promise<void> {
			await client.auth.signInWithOtp({ email });
		},
	};
}
