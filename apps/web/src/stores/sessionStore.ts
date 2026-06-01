/**
 * @format
 * @module SessionStore
 * @description Zustand store for user, role, and token session state.
 * @author auto
 * @since 1.0.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SessionState = {
    hasHydrated: boolean;
    role?: 'recruiter' | 'joinee';
    token?: string;
    userLabel?: string;
    clearSession: () => void;
    setHasHydrated: (hasHydrated: boolean) => void;
    setSession: (role: 'recruiter' | 'joinee', token: string, userLabel?: string) => void;
};

export const useSessionStore = create<SessionState>()(
    persist<SessionState>(
        (set) => ({
            hasHydrated: false,
            clearSession: (): void => {
                set({ hasHydrated: true, role: undefined, token: undefined, userLabel: undefined });
            },
            setHasHydrated: (hasHydrated: boolean): void => {
                set({ hasHydrated });
            },
            setSession: (role: 'recruiter' | 'joinee', token: string, userLabel?: string): void => {
                set({ hasHydrated: true, role, token, userLabel });
            },
        }),
        {
            name: 'onboarding-session',
            onRehydrateStorage:
                () =>
                (state): void => {
                    state?.setHasHydrated(true);
                },
        },
    ),
);
