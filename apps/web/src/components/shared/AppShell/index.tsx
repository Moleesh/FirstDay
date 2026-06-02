/**
 * @format
 * @module AppShell
 * @description Shared authenticated application shell.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { RoleBadge } from '@/components/shared/RoleBadge';
import { FirstDayLogo } from '@/components/shared/FirstDayLogo';
import { ThemeMenu } from '@/components/shared/ThemeMenu';
import { useSessionStore } from '@/stores/sessionStore';

export type AppShellProps = {
    breadcrumbLabel?: string;
    breadcrumbLink?: string;
    breadcrumbLinkLabel?: string;
    children: ReactNode;
    logoutHref?: string;
    roleLabel?: string;
    userFallbackLabel?: string;
};

const defaults = {
    breadcrumbLabel: 'Recruiter workspace',
    breadcrumbLink: '/dashboard',
    logoutHref: '/login?role=recruiter',
    roleLabel: 'ADMIN',
    userFallbackLabel: 'Signed-in recruiter',
} as const;

export const AppShell = ({
    breadcrumbLabel = defaults.breadcrumbLabel,
    breadcrumbLink = defaults.breadcrumbLink,
    breadcrumbLinkLabel = 'Dashboard',
    children,
    logoutHref = defaults.logoutHref,
    roleLabel = defaults.roleLabel,
    userFallbackLabel = defaults.userFallbackLabel,
}: AppShellProps): JSX.Element => {
    const router = useRouter();
    const clearSession = useSessionStore((state) => state.clearSession);
    const userLabel = useSessionStore((state) => state.userLabel) ?? userFallbackLabel;

    const logout = (): void => {
        clearSession();
        router.replace(logoutHref);
    };

    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="app-header__identity">
                    <Link className="app-brand" href={breadcrumbLink}>
                        <FirstDayLogo size="compact" />
                    </Link>
                    <nav aria-label="Breadcrumb" className="app-breadcrumb">
                        <Link href={breadcrumbLink}>{breadcrumbLinkLabel}</Link>
                        <span aria-hidden="true">/</span>
                        <span>{breadcrumbLabel}</span>
                    </nav>
                </div>
                <div className="app-header__actions">
                    <ThemeMenu />
                    <div className="app-header__session">
                        <div className="app-profile">
                            <span aria-hidden="true" className="app-profile__avatar">
                                {userLabel.slice(0, 1).toUpperCase()}
                            </span>
                            <span className="app-profile__copy">
                                <span className="app-profile__label">Signed in as</span>
                                <span className="app-profile__identity">
                                    <span className="app-user">{userLabel}</span>
                                    <RoleBadge role={roleLabel} />
                                </span>
                            </span>
                        </div>
                        <button
                            aria-label="Log out"
                            className="app-button app-button--ghost"
                            onClick={logout}
                            type="button"
                        >
                            <LogOut size={16} />
                            Log out
                        </button>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};
