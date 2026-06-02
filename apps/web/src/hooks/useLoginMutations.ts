/**
 * @format
 * @module UseLoginMutations
 * @description TanStack Query mutations for frontend login API operations.
 * @author auto
 * @since 1.0.0
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { JoineeLogin } from '@onboarding/types';
import { loginJoinee, loginRecruiter, type LoginSession } from '@/lib/apiClient';

type RecruiterLogin = {
    password: string;
    username: string;
};

/**
 * Creates a recruiter login mutation.
 * @returns Recruiter login mutation state.
 */
export const useRecruiterLogin = (): UseMutationResult<LoginSession, Error, RecruiterLogin> => {
    return useMutation({
        mutationFn: ({ password, username }) => loginRecruiter(username, password),
    });
};

/**
 * Creates a joinee login mutation.
 * @returns Joinee login mutation state.
 */
export const useJoineeLogin = (): UseMutationResult<LoginSession, Error, JoineeLogin> => {
    return useMutation({ mutationFn: loginJoinee });
};
