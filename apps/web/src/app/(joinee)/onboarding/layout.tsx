/**
 * @format
 * @module OnboardingLayout
 * @description Joinee onboarding section layout.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { RouteGuard } from '@/components/shared/RouteGuard';

const OnboardingLayout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <RouteGuard requiredRole="joinee">
            <AppShell
                breadcrumbLabel="Joinee workspace"
                breadcrumbLink="/onboarding"
                breadcrumbLinkLabel="Onboarding"
                logoutHref="/login?role=joinee"
                roleLabel="JOINEE"
                userFallbackLabel="Signed-in joinee"
            >
                {children}
            </AppShell>
        </RouteGuard>
    );
};

export default OnboardingLayout;
