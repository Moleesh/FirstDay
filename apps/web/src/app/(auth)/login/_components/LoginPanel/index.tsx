/**
 * @format
 * @module LoginPanel
 * @description Coordinates role selection and role-specific login forms.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { JoineeForm } from '@/app/(auth)/login/_components/JoineeForm';
import { LoginToggle, type LoginRole } from '@/app/(auth)/login/_components/LoginToggle';
import { RecruiterForm } from '@/app/(auth)/login/_components/RecruiterForm';
import styles from '@/app/(auth)/login/_styles/LoginPage.module.scss';
import { en } from '@/i18n/en';

/**
 * Renders the selected role's login form.
 * @returns Interactive login panel.
 */
export function LoginPanel({
    initialRole = 'recruiter',
}: {
    initialRole?: LoginRole;
}): JSX.Element {
    const [role, setRole] = useState<LoginRole>(initialRole);
    const content = role === 'recruiter' ? en.loginRecruiterAside : en.loginJoineeAside;

    return (
        <>
            <aside className={`${styles.aside} ${styles[`aside--${role}`]}`}>
                <span className={styles.eyebrow}>{content.eyebrow}</span>
                <h1 className={styles.title}>{content.title}</h1>
                <p className={styles.copy}>{content.copy}</p>
                <ul className={styles.checklist}>
                    {content.points.map((point) => (
                        <li key={point}>
                            <CheckCircle2 size={18} />
                            {point}
                        </li>
                    ))}
                </ul>
            </aside>
            <div className={styles.panel}>
                <LoginToggle selectedRole={role} onRoleChange={setRole} />
                {role === 'recruiter' ? <RecruiterForm /> : <JoineeForm />}
            </div>
        </>
    );
}
