/**
 * @format
 * @module PrismaService
 * @description Manages the Prisma client lifecycle for NestJS.
 * @author auto
 * @since 1.0.0
 */

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	/**
	 * Opens the database connection when the module starts.
	 * @returns A promise that resolves once connected.
	 */
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	/**
	 * Closes the database connection when the module stops.
	 * @returns A promise that resolves once disconnected.
	 */
	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
