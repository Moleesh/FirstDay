/**
 * @format
 * @module SessionStoreTests
 * @description Tests session hydration state during login and logout.
 * @author auto
 * @since 1.0.0
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { useSessionStore } from '@/stores/sessionStore';

describe('useSessionStore', () => {
	beforeEach(() => {
		useSessionStore.setState({
			hasHydrated: false,
			role: undefined,
			token: undefined,
			userLabel: undefined,
		});
	});

	it('marks a new session as hydrated', () => {
		useSessionStore.getState().setSession('recruiter', 'token', 'recruiter');

		expect(useSessionStore.getState()).toMatchObject({
			hasHydrated: true,
			role: 'recruiter',
			token: 'token',
			userLabel: 'recruiter',
		});
	});

	it('keeps hydration complete when clearing a session', () => {
		useSessionStore.getState().clearSession();

		expect(useSessionStore.getState()).toMatchObject({
			hasHydrated: true,
			role: undefined,
			token: undefined,
		});
	});
});
