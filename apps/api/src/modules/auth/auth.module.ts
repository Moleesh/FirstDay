/**
 * @format
 * @module AuthModule
 * @description Authentication module for recruiters and joinees.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
