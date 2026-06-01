/**
 * @format
 * @module JoineesService
 * @description Handles joinee ID generation and assignment workflows.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import type { CreateJoineeInput } from '@onboarding/types';
import type { RecruiterPrincipal } from '@/modules/auth/auth.types';
import { SupabaseService } from '@/modules/supabase/supabase.service';

const MAX_SEQUENCE = 99_999;
const ID_PREFIX = 'JN';
const ACCESS_CODE_BYTES = 6;
const ACCESS_CODE_SALT_ROUNDS = 12;

/**
 * Generates a unique display ID for a new joinee.
 * @param year - The current year.
 * @param sequence - Padded sequence number.
 * @returns Formatted joinee display ID.
 * @throws {Error} If sequence exceeds supported range.
 */
export function generateJoineeId(year: number, sequence: number): string {
	if (sequence > MAX_SEQUENCE) {
		throw new Error('Joinee sequence exceeded');
	}
	return `${ID_PREFIX}-${year}-${sequence.toString().padStart(5, '0')}`;
}

@Injectable()
export class JoineesService {
	constructor(private readonly supabaseService: SupabaseService) {}

	/**
	 * Lists current joinee summaries.
	 * @returns Joinee summaries.
	 */
	async list(user: RecruiterPrincipal): Promise<Array<{ displayId: string; status: string }>> {
		const { data, error } = await this.supabaseService.client
			.from('joinees')
			.select('display_id, status')
			.eq('recruiter_id', user.id)
			.order('created_at', { ascending: false });
		this.supabaseService.assertNoError(error);
		return (data ?? []).map(({ display_id, status }) => ({ displayId: display_id, status }));
	}

	/**
	 * Creates a joinee assignment shell.
	 * @param input - Joinee creation input.
	 * @returns Created joinee summary.
	 */
	async create(
		input: CreateJoineeInput,
		user: RecruiterPrincipal,
	): Promise<{ accessCode: string; displayId: string; id: string; templateId: string }> {
		const year = new Date().getFullYear();
		const { count, error: countError } = await this.supabaseService.client
			.from('joinees')
			.select('*', { count: 'exact', head: true })
			.like('display_id', `${ID_PREFIX}-${year}-%`);
		this.supabaseService.assertNoError(countError);
		const accessCode = randomBytes(ACCESS_CODE_BYTES).toString('hex');
		const { data: joinee, error } = await this.supabaseService.client
			.from('joinees')
			.insert({
				access_code_hash: await bcrypt.hash(accessCode, ACCESS_CODE_SALT_ROUNDS),
				display_id: generateJoineeId(year, (count ?? 0) + 1),
				org_id: user.orgId,
				recruiter_id: user.id,
				template_id: input.templateId,
			})
			.select('display_id, id, template_id')
			.single();
		this.supabaseService.assertNoError(error);
		if (!joinee) throw new Error('Unable to create joinee');
		return {
			accessCode,
			displayId: joinee.display_id,
			id: joinee.id,
			templateId: joinee.template_id,
		};
	}
}
