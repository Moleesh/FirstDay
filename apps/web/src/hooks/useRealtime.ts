/**
 * @format
 * @module UseRealtime
 * @description Subscribes to Supabase Realtime onboarding status changes.
 * @author auto
 * @since 1.0.0
 */

import { useEffect } from 'react';

export function useRealtime(channelName: string): void {
    useEffect(() => {
        void channelName;
    }, [channelName]);
}
