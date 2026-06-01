/**
 * @format
 * @module ThemeProvider
 * @description Persists and applies user-selectable appearance preferences.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type AccentTheme = 'ocean' | 'sunset' | 'violet';
export type ColorMode = 'dark' | 'light' | 'system';

type ThemeContextValue = {
    accent: AccentTheme;
    mode: ColorMode;
    setAccent: (accent: AccentTheme) => void;
    setMode: (mode: ColorMode) => void;
};

const STORAGE_KEY = 'firstday-appearance';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyAppearance(mode: ColorMode, accent: AccentTheme): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
    document.documentElement.dataset.accent = accent;
    document.documentElement.dataset.theme = resolvedMode;
}

export function ThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
    const [mode, setMode] = useState<ColorMode>('system');
    const [accent, setAccent] = useState<AccentTheme>('ocean');

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const appearance = JSON.parse(stored) as Partial<ThemeContextValue>;
            setMode(appearance.mode ?? 'system');
            setAccent(appearance.accent ?? 'ocean');
        }
    }, []);

    useEffect(() => {
        applyAppearance(mode, accent);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ accent, mode }));
    }, [accent, mode]);

    const value = useMemo(() => ({ accent, mode, setAccent, setMode }), [accent, mode]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
