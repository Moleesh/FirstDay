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

/**
 * Renders the login page.
 * @returns Login page element.
 */
export default function LoginPage({
    searchParams,
}: {
    searchParams?: { role?: string };
}): JSX.Element {
    const initialRole = searchParams?.role === 'joinee' ? 'joinee' : 'recruiter';

    return (
        <main className={styles.shell}>
            <LoginRedirect />
            <section className={styles.layout}>
                <LoginPanel initialRole={initialRole} />
            </section>
        </main>
    );
}
