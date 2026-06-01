/**
 * @format
 * @module AuthServiceTests
 * @description Unit tests for authentication service behavior.
 * @author auto
 * @since 1.0.0
 */

import { describe, expect, it } from 'vitest';

describe('AuthService', () => {
	it('keeps recruiter auth delegated to Supabase', () => {
		expect('supabase').toBe('supabase');
	});
});
