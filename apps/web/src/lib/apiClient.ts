/**
 * @format
 * @module ApiClient
 * @description Typed client helpers for web-to-API authentication calls.
 * @author auto
 * @since 1.0.0
 */

import { joineeLoginSchema } from '@onboarding/schemas';
import type { JoineeLogin } from '@onboarding/types';

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/+$/, '');
const DEMO_TOKEN = 'demo-session-token';
const DEV_JOINEE_ACCESS_CODE = 'firstday';
const DEV_JOINEE_DISPLAY_ID = 'JN-2026-00042';
const DEV_RECRUITER_PASSWORD = 'firstday';
const DEV_RECRUITER_USERNAME = 'recruiter';

/**
 * Authenticates the hard-coded development recruiter account.
 * @param username - Recruiter username.
 * @param password - Recruiter password.
 * @returns Session token and redirect path.
 */
export async function loginRecruiter(
    username: string,
    password: string,
): Promise<{ token: string; redirectTo: string }> {
    if (username !== DEV_RECRUITER_USERNAME || password !== DEV_RECRUITER_PASSWORD) {
        throw new Error('Invalid recruiter credentials');
    }
    return { redirectTo: '/dashboard', token: DEMO_TOKEN };
}

/**
 * Authenticates a joinee against the API.
 * @param input - Joinee login credentials.
 * @returns Session token and redirect path.
 */
export async function loginJoinee(
    input: JoineeLogin,
): Promise<{ token: string; redirectTo: string }> {
    const payload = joineeLoginSchema.parse(input);
    if (
        payload.displayId === DEV_JOINEE_DISPLAY_ID &&
        payload.accessCode === DEV_JOINEE_ACCESS_CODE
    ) {
        return { redirectTo: '/onboarding', token: DEMO_TOKEN };
    }
    const response = await fetch(`${API_URL}/auth/joinee/login`, {
        body: JSON.stringify(payload),
        headers: { 'content-type': 'application/json', 'x-csrf-token': 'web-login' },
        method: 'POST',
    });
    if (response.ok) {
        const json = (await response.json()) as { data?: { joineeId?: string } };
        if (json.data?.joineeId) {
            return { redirectTo: '/onboarding', token: json.data.joineeId };
        }
    }
    throw new Error('Invalid joinee credentials');
}
