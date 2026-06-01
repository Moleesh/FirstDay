/**
 * @format
 * @module NotificationsModule
 * @description Notification delivery module.
 * @author auto
 * @since 1.0.0
 */

import { Module } from '@nestjs/common';
import { EmailService } from '@/modules/notifications/email.service';

@Module({
	providers: [EmailService],
	exports: [EmailService],
})
export class NotificationsModule {}
