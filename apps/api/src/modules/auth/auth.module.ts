/**
 * @format
 * @module AuthModule
 * @description Authentication module for recruiters and joinees.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JoineeStrategy } from '@/modules/auth/strategies/joinee.strategy';

@Module({
	imports: [PassportModule, JwtModule.register({ secret: process.env.JOINEE_JWT_SECRET })],
	controllers: [AuthController],
	providers: [AuthService, JoineeStrategy],
	exports: [AuthService],
})
export class AuthModule {}
