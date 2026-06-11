/**
 * @format
 * @module RootLayout
 * @description Root application layout and global styles.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';
import type { ReactNode } from 'react';
import { QueryProvider } from '@/components/shared/QueryProvider';
import { ScrollProgress } from '@/components/shared/ScrollProgress';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import '@/styles/globals.scss';

export const metadata = {
    applicationName: 'FirstDay',
    description: 'Onboarding workspace for recruiters and joinees.',
    title: {
        default: 'FirstDay',
        template: '%s | FirstDay',
    },
} as const;

/**
 * Renders the root HTML shell.
 * @param props - Layout children.
 * @returns Root layout element.
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <div className="app-scroll-surface">
                    <QueryProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </QueryProvider>
                    <ScrollProgress />
                </div>
            </body>
        </html>
    );
}
