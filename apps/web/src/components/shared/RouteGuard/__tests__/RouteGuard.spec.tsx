/**
 * @format
 * @module RouteGuardTests
 * @description Tests role-aware protected-route redirects.
 */

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RouteGuard } from '@/components/shared/RouteGuard';
import { useSessionStore } from '@/stores/sessionStore';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: (): { replace: typeof replace } => ({ replace }),
}));

describe('RouteGuard', () => {
    beforeEach(() => {
        replace.mockReset();
        useSessionStore.setState({ hasHydrated: false, role: undefined, token: undefined });
    });

    it('renders protected content for the required role', () => {
        useSessionStore.setState({ hasHydrated: true, role: 'recruiter' });

        render(<RouteGuard requiredRole="recruiter">Dashboard</RouteGuard>);

        expect(screen.getByText('Dashboard')).toBeVisible();
        expect(replace).not.toHaveBeenCalled();
    });

    it('redirects a hydrated session with the wrong role', () => {
        useSessionStore.setState({ hasHydrated: true, role: 'joinee' });

        render(<RouteGuard requiredRole="recruiter">Dashboard</RouteGuard>);

        expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
        expect(replace).toHaveBeenCalledWith('/login?role=recruiter');
    });
});
