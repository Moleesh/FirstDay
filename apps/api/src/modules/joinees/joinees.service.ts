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
import { PrismaService } from '@/prisma/prisma.service';

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
	constructor(private readonly prismaService: PrismaService) {}

	/**
	 * Lists current joinee summaries.
	 * @returns Joinee summaries.
	 */
	async list(user: RecruiterPrincipal): Promise<Array<{ displayId: string; status: string }>> {
		return this.prismaService.joinee.findMany({
			orderBy: { createdAt: 'desc' },
			select: { displayId: true, status: true },
			where: { recruiterId: user.id },
		});
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
		const sequence = await this.prismaService.joinee.count({
			where: { displayId: { startsWith: `${ID_PREFIX}-${year}-` } },
		});
		const accessCode = randomBytes(ACCESS_CODE_BYTES).toString('hex');
		const joinee = await this.prismaService.joinee.create({
			data: {
				accessCodeHash: await bcrypt.hash(accessCode, ACCESS_CODE_SALT_ROUNDS),
				displayId: generateJoineeId(year, sequence + 1),
				orgId: user.orgId,
				recruiterId: user.id,
				templateId: input.templateId,
			},
			select: { displayId: true, id: true, templateId: true },
		});
		return {
			accessCode,
			displayId: joinee.displayId,
			id: joinee.id,
			templateId: joinee.templateId,
		};
	}
}
