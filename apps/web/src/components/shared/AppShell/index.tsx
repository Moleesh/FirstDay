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
        <div className="stack-sm">
          <Link className="app-brand" href="/dashboard">
            <span>F</span>
            FirstDay
          </Link>
          <nav aria-label="Breadcrumb" className="app-breadcrumb">
            <Link href="/dashboard">Dashboard</Link>
            <span aria-hidden="true"> / Recruiter workspace</span>
          </nav>
        </div>
        <div className="app-header__actions">
          <ThemeMenu />
          <div>
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
