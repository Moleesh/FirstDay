/**
 * @format
 * @module OnboardingLayout
 * @description Joinee onboarding section layout.
 * @author auto
 * @since 1.0.0
 */

import type { ReactNode } from 'react';
import { RouteGuard } from '@/components/shared/RouteGuard';

export default function OnboardingLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <RouteGuard requiredRole="joinee">
            <div className="onboarding-surface">{children}</div>
        </RouteGuard>
    );
}
