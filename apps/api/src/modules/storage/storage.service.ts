/**
 * @format
 * @module StorageService
 * @description Stores files in Supabase Storage and returns signed URLs.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { SIGNED_URL_EXPIRY_SECONDS } from '@onboarding/schemas';

const DEFAULT_BUCKET = 'onboarding';

@Injectable()
export class StorageService {
	private readonly client = createClient(
		process.env.SUPABASE_URL ?? '',
		process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
	);

	/**
	 * Creates a one-hour signed URL for a storage object.
	 * @param path - Storage object path.
	 * @returns Signed URL string.
	 */
	async createSignedUrl(path: string): Promise<string> {
		const { data, error } = await this.client.storage
			.from(DEFAULT_BUCKET)
			.createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);
		if (error || !data.signedUrl) {
			throw new Error('Unable to create signed URL');
		}
		return data.signedUrl;
	}
}
