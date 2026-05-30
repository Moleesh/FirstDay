/**
 * @module AppShell
 * @description Shared authenticated application shell.
 * @author auto
 * @since 1.0.0
 */
"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RoleBadge } from "@/components/shared/RoleBadge";
import { FirstDayLogo } from "@/components/shared/FirstDayLogo";
import { ThemeMenu } from "@/components/shared/ThemeMenu";
import { useSessionStore } from "@/stores/sessionStore";

export function AppShell({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter();
  const clearSession = useSessionStore((state) => state.clearSession);
  const userLabel = useSessionStore((state) => state.userLabel) ?? "Signed-in recruiter";

  function logout(): void {
    clearSession();
    router.replace("/login?role=recruiter");
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
          <div className="app-profile">
            <div className="app-user">{userLabel}</div>
            <RoleBadge role="RECRUITER" />
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
      </header>
      {children}
    </div>
  );
}
