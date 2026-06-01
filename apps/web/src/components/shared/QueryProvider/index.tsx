/**
 * @format
 * @module QueryProvider
 * @description Provides TanStack Query state for frontend API operations.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';

/**
 * Provides a stable browser query client to the application.
 * @param props - Provider children.
 * @returns Query client provider.
 */
export function QueryProvider({ children }: { children: ReactNode }): React.JSX.Element {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
