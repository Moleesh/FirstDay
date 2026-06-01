/**
 * @format
 * @module LoginToggle
 * @description Segmented role switch for the login experience.
 * @author auto
 * @since 1.0.0
 */

'use client';

import styles from './_styles/LoginToggle.module.scss';
import { en } from '@/i18n/en';

export type LoginRole = 'recruiter' | 'joinee';

export type LoginToggleProps = {
    selectedRole: LoginRole;
    onRoleChange: (role: LoginRole) => void;
};

/**
 * Renders recruiter and joinee role choices.
 * @param props - Selected role and change handler.
 * @returns Login role toggle element.
 */
export function LoginToggle({ selectedRole, onRoleChange }: LoginToggleProps): JSX.Element {
    return (
        <div className={styles.toggle} aria-label="Login role">
            <button
                aria-pressed={selectedRole === 'recruiter'}
                data-active={selectedRole === 'recruiter'}
                onClick={() => onRoleChange('recruiter')}
                type="button"
            >
                {en.loginRecruiter}
            </button>
            <button
                aria-pressed={selectedRole === 'joinee'}
                data-active={selectedRole === 'joinee'}
                onClick={() => onRoleChange('joinee')}
                type="button"
            >
                {en.loginJoinee}
            </button>
        </div>
    );
}
