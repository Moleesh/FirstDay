/**
 * @format
 * @module JoineesModule
 * @description Joinee assignment and status module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { JoineesController } from '@/modules/joinees/joinees.controller';
import { JoineesService } from '@/modules/joinees/joinees.service';

@Module({
	controllers: [JoineesController],
	providers: [JoineesService],
	exports: [JoineesService],
})
export class JoineesModule {}
