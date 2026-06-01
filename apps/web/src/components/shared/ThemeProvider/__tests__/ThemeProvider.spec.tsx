/**
 * @format
 * @module ThemeProviderTests
 * @description Tests stored appearance preferences and context access.
 */

import type { JSX } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from '@/components/shared/ThemeProvider';

const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
    <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider', () => {
    beforeEach(() => {
        window.localStorage.clear();
        vi.stubGlobal(
            'matchMedia',
            vi.fn(() => ({ matches: false })),
        );
    });

    it('applies and persists changed appearance preferences', async () => {
        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.setAccent('violet');
            result.current.setMode('dark');
        });

        await waitFor(() => {
            expect(document.documentElement.dataset.accent).toBe('violet');
            expect(document.documentElement.dataset.theme).toBe('dark');
        });
        expect(window.localStorage.getItem('firstday-appearance')).toContain('"accent":"violet"');
    });

    it('loads stored preferences', async () => {
        window.localStorage.setItem(
            'firstday-appearance',
            JSON.stringify({ accent: 'sunset', mode: 'light' }),
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        await waitFor(() => expect(result.current.accent).toBe('sunset'));
        expect(result.current.mode).toBe('light');
    });
});
