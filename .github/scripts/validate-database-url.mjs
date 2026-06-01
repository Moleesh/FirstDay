/**
 * @format
 * @module ValidateDatabaseUrl
 * @description Fails CI early when Prisma cannot use the configured Supabase connection URL.
 */

const value = process.env.DATABASE_URL?.trim();

if (!value) {
	throw new Error(
		'DATABASE_URL is missing. Add the GitHub Actions repository secret before running migrations.',
	);
}

const url = new URL(value);

if (url.hostname.startsWith('db.') && url.hostname.endsWith('.supabase.co')) {
	throw new Error(
		'DATABASE_URL uses the direct Supabase host. Use the session pooler URL from Supabase Connect for hosted GitHub Actions runners.',
	);
}

if (!url.hostname.endsWith('.pooler.supabase.com')) {
	console.warn(
		'DATABASE_URL is not a Supabase pooler URL. Confirm that this host is reachable from CI.',
	);
}

console.log(`DATABASE_URL host accepted for migrations: ${url.hostname}:${url.port || '5432'}`);
