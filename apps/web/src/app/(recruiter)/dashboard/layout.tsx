/**
 * @format
 * @module RecruiterDashboardLayout
 * @description Recruiter dashboard section layout.
 * @author auto
 * @since 1.0.0
 */

import type { ReactNode } from 'react';
import { AppShell } from '@/components/shared/AppShell';
import { RouteGuard } from '@/components/shared/RouteGuard';

/**
 * Renders recruiter dashboard shell.
 * @param props - Layout children.
 * @returns Dashboard layout.
 */
export default function DashboardLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <RouteGuard requiredRole="recruiter">
            <AppShell>{children}</AppShell>
        </RouteGuard>
    );
}
