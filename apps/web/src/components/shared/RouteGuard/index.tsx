/**
 * @format
 * @module RouteGuard
 * @description Client-side role guard for protected app routes.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import { useSessionStore } from '@/stores/sessionStore';

export type RouteGuardProps = {
	children: ReactNode;
	requiredRole: 'recruiter' | 'joinee';
};

/**
 * Redirects users to the correct login tab when the required role is missing.
 * @param props - Guard props and protected children.
 * @returns Protected content or a loading placeholder.
 */
export function RouteGuard({ children, requiredRole }: RouteGuardProps): JSX.Element {
	const router = useRouter();
	const hasHydrated = useSessionStore((state) => state.hasHydrated);
	const role = useSessionStore((state) => state.role);

	useEffect(() => {
		if (hasHydrated && role !== requiredRole) {
			router.replace(`/login?role=${requiredRole}`);
		}
	}, [hasHydrated, requiredRole, role, router]);

	if (!hasHydrated || role !== requiredRole) {
		return <main aria-busy="true" />;
	}
	return <>{children}</>;
}
