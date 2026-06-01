/**
 * @format
 * @module JwtAuthGuard
 * @description Guards recruiter routes with bearer JWT authentication.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
