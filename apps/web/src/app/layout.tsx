/**
 * @format
 * @module RootLayout
 * @description Root application layout and global styles.
 * @author auto
 * @since 1.0.0
 */

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import '@/styles/globals.scss';

/**
 * Renders the root HTML shell.
 * @param props - Layout children.
 * @returns Root layout element.
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
