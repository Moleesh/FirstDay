/**
 * @format
 * @module SupabaseModule
 * @description Provides the backend Supabase client across API modules.
 */

import { Global, Module } from '@nestjs/common';
import { SupabaseService } from '@/modules/supabase/supabase.service';

@Global()
@Module({
	providers: [SupabaseService],
	exports: [SupabaseService],
})
export class SupabaseModule {}
