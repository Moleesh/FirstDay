/**
 * @format
 * @module LoginRedirect
 * @description Redirects hydrated authenticated sessions away from the login page.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';

const ROLE_DESTINATIONS = {
	joinee: '/onboarding',
	recruiter: '/dashboard',
} as const;

/**
 * Sends authenticated users to the workspace for their stored role.
 * @returns No rendered UI.
 */
export function LoginRedirect(): null {
	const router = useRouter();
	const hasHydrated = useSessionStore((state) => state.hasHydrated);
	const role = useSessionStore((state) => state.role);
	const token = useSessionStore((state) => state.token);

	useEffect(() => {
		if (hasHydrated && role && token) {
			router.replace(ROLE_DESTINATIONS[role]);
		}
	}, [hasHydrated, role, router, token]);

	return null;
}
