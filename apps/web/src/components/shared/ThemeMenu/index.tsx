/**
 * @format
 * @module ThemeMenu
 * @description Appearance controls for color mode and accent selection.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { Moon, Palette, Sun } from 'lucide-react';
import { type AccentTheme, type ColorMode, useTheme } from '@/components/shared/ThemeProvider';

const modes: Array<{ icon: typeof Sun; label: string; value: ColorMode }> = [
    { icon: Sun, label: 'Light', value: 'light' },
    { icon: Moon, label: 'Dark', value: 'dark' },
    { icon: Palette, label: 'System', value: 'system' },
];

const accents: Array<{ label: string; value: AccentTheme }> = [
    { label: 'Ocean', value: 'ocean' },
    { label: 'Sunset', value: 'sunset' },
    { label: 'Violet', value: 'violet' },
];

export function ThemeMenu(): React.JSX.Element {
    const { accent, mode, setAccent, setMode } = useTheme();

    return (
        <div className="theme-menu" aria-label="Appearance settings">
            <div className="theme-menu__modes">
                {modes.map(({ icon: Icon, label, value }) => (
                    <button
                        aria-label={`${label} theme`}
                        aria-pressed={mode === value}
                        className="theme-menu__button"
                        key={value}
                        onClick={() => setMode(value)}
                        type="button"
                    >
                        <Icon size={15} />
                    </button>
                ))}
            </div>
            <label className="theme-menu__accent">
                <span>Accent</span>
                <select
                    onChange={(event) => setAccent(event.target.value as AccentTheme)}
                    value={accent}
                >
                    {accents.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
