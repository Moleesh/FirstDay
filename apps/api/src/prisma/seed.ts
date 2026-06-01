/**
 * @format
 * @module PrismaSeed
 * @description Seeds development organisation and recruiter mappings.
 * @author auto
 * @since 1.0.0
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const DEV_ONLY = 'development';

/**
 * Seeds development-only data when NODE_ENV permits it.
 * @returns A promise that resolves after seed data is upserted.
 */
async function seed(): Promise<void> {
	if (process.env.NODE_ENV !== DEV_ONLY) {
		throw new Error('Seed data is development-only');
	}
	const org = await prisma.organisation.upsert({
		create: { id: '00000000-0000-0000-0000-000000000001', name: 'Demo Organisation' },
		update: {},
		where: { id: '00000000-0000-0000-0000-000000000001' },
	});
	await prisma.recruiter.upsert({
		create: {
			email: 'admin@example.com',
			orgId: org.id,
			role: 'ADMIN',
			supabaseUserId: '00000000-0000-0000-0000-000000000010',
		},
		update: {},
		where: { supabaseUserId: '00000000-0000-0000-0000-000000000010' },
	});
}

void seed().finally(async () => prisma.$disconnect());
