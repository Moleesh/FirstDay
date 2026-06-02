/**
 * @format
 * @module ApiClient
 * @description Trial authentication helpers for the static GitHub Pages app.
 * @author auto
 * @since 1.0.0
 */

import { joineeLoginSchema } from '@onboarding/schemas';
import type { JoineeLogin } from '@onboarding/types';

const DEMO_TOKEN = 'demo-session-token';
const DEV_JOINEE_ACCESS_CODE = 'firstday';
const DEV_JOINEE_DISPLAY_ID = 'JN-2026-00042';
const DEV_RECRUITER_PASSWORD = 'firstday';
const DEV_RECRUITER_USERNAME = 'recruiter';

export type LoginSession = {
    redirectTo: string;
    token: string;
};

/**
 * Authenticates the hard-coded development recruiter account.
 * @param username - Recruiter username.
 * @param password - Recruiter password.
 * @returns Session token and redirect path.
 */
export const loginRecruiter = async (username: string, password: string): Promise<LoginSession> => {
    if (username !== DEV_RECRUITER_USERNAME || password !== DEV_RECRUITER_PASSWORD) {
        throw new Error('Invalid recruiter credentials');
    }
    return { redirectTo: '/dashboard', token: DEMO_TOKEN };
};

/**
 * Authenticates the hard-coded development joinee account.
 * @param input - Joinee login credentials.
 * @returns Session token and redirect path.
 */
export const loginJoinee = async (input: JoineeLogin): Promise<LoginSession> => {
    const payload = joineeLoginSchema.parse(input);
    if (
        payload.displayId === DEV_JOINEE_DISPLAY_ID &&
        payload.accessCode === DEV_JOINEE_ACCESS_CODE
    ) {
        return { redirectTo: '/onboarding', token: DEMO_TOKEN };
    }
    throw new Error('Invalid joinee credentials');
};
