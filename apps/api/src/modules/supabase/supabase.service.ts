/**
 * @format
 * @module SupabaseService
 * @description Owns the server-only Supabase client used by API services.
 */

import { Injectable } from '@nestjs/common';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    readonly client: SupabaseClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
        process.env.SUPABASE_SECRET_KEY ?? '',
        { auth: { autoRefreshToken: false, persistSession: false } },
    );

    /**
     * Throws a useful error when a Supabase query fails.
     * @param error - Supabase query error.
     */
    assertNoError(error: { message: string } | null): void {
        if (error) throw new Error(error.message);
    }
}
