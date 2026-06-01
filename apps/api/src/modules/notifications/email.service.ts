/**
 * @format
 * @module EmailService
 * @description Sends status change email notifications through Resend.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
	private readonly resend = new Resend(process.env.RESEND_API_KEY ?? '');

	/**
	 * Sends a status change email.
	 * @param to - Recipient email address.
	 * @param status - New joinee status.
	 * @returns A promise that resolves once the email request is accepted.
	 */
	async sendStatusChange(to: string, status: string): Promise<void> {
		await this.resend.emails.send({
			from: 'FirstDay <notifications@example.com>',
			to,
			subject: 'FirstDay status changed',
			text: `Your onboarding status is now ${status}.`,
		});
	}
}
