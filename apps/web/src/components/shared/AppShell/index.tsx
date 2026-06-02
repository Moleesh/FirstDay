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
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { ThemeMenu } from '@/components/shared/ThemeMenu';
import { useSessionStore } from '@/stores/sessionStore';

export function AppShell({ children }: { children: ReactNode }): JSX.Element {
    const router = useRouter();
    const clearSession = useSessionStore((state) => state.clearSession);
    const userLabel = useSessionStore((state) => state.userLabel) ?? 'Signed-in recruiter';

    function logout(): void {
        clearSession();
        router.replace('/login?role=recruiter');
    }

    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="app-header__identity">
                    <Link className="app-brand" href="/dashboard">
                        <FirstDayLogo size="compact" />
                    </Link>
                    <nav aria-label="Breadcrumb" className="app-breadcrumb">
                        <Link href="/dashboard">Dashboard</Link>
                        <span aria-hidden="true">/</span>
                        <span>Recruiter workspace</span>
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
                                    <RoleBadge role="Admin" />
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
            <div className="app-shell__content">{children}</div>
            <ScrollProgress />
        </div>
    );
}
