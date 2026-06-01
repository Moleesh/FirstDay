/**
 * @format
 * @module AppModule
 * @description Composes API modules and global security infrastructure.
 * @author auto
 * @since 1.0.0
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CsrfMiddleware } from '@/common/middleware/csrf.middleware';
import { AuditModule } from '@/modules/audit/audit.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { DocumentsModule } from '@/modules/documents/documents.module';
import { JoineesModule } from '@/modules/joinees/joinees.module';
import { NotificationsModule } from '@/modules/notifications/notifications.module';
import { RecruitersModule } from '@/modules/recruiters/recruiters.module';
import { StorageModule } from '@/modules/storage/storage.module';
import { SupabaseModule } from '@/modules/supabase/supabase.module';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { AuditInterceptor } from '@/common/interceptors/audit.interceptor';
import { RequestIdInterceptor } from '@/common/interceptors/request-id.interceptor';
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor';

@Module({
	imports: [
		ThrottlerModule.forRoot([{ ttl: 60_000, limit: 10 }]),
		AuditModule,
		AuthModule,
		DocumentsModule,
		JoineesModule,
		NotificationsModule,
		SupabaseModule,
		RecruitersModule,
		StorageModule,
	],
	providers: [
		{ provide: APP_FILTER, useClass: GlobalExceptionFilter },
		{ provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
		{ provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
		{ provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
	],
})
export class AppModule implements NestModule {
	/**
	 * Registers CSRF checks for state-changing routes.
	 * @param consumer - Nest middleware consumer.
	 */
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(CsrfMiddleware).forRoutes('*');
	}
}
