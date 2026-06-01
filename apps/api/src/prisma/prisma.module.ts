/**
 * @format
 * @module PrismaModule
 * @description Provides Prisma database access across API modules.
 * @author auto
 * @since 1.0.0
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Global()
@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
