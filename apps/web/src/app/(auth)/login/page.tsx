/**
 * @format
 * @module LoginPage
 * @description Role-aware login page for recruiters and joinees.
 * @author auto
 * @since 1.0.0
 */

import { LoginPanel } from '@/app/(auth)/login/_components/LoginPanel';
import { LoginRedirect } from '@/components/shared/LoginRedirect';
import styles from '@/app/(auth)/login/_styles/LoginPage.module.scss';
import { X } from 'lucide-react';
import Link from 'next/link';

/**
 * Renders the login page.
 * @returns Login page element.
 */
export default function LoginPage(): React.JSX.Element {
    return (
        <main className={styles.shell}>
            <LoginRedirect />
            <section aria-label="Sign in" className={styles.layout}>
                <Link aria-label="Close sign in" className={styles.close} href="/">
                    <X aria-hidden="true" size={18} />
                </Link>
                <LoginPanel />
            </section>
        </main>
    );
}
