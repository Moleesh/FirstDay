/**
 * @format
 * @module DatabaseConfig
 * @description Database connection configuration.
 * @author auto
 * @since 1.0.0
 */

export const databaseConfig = {
	url: process.env.DATABASE_URL ?? '',
};
