/**
 * @format
 * @module StorageModule
 * @description Supabase Storage integration module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { StorageService } from '@/modules/storage/storage.service';

@Module({
    providers: [StorageService],
    exports: [StorageService],
})
export class StorageModule {}
