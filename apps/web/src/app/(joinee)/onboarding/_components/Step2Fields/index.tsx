/**
 * @format
 * @module Step2Fields
 * @description Review step for AI extracted and manual fields.
 * @author auto
 * @since 1.0.0
 */

import { AIAutofillBanner } from './AIAutofillBanner';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';
import { en } from '@/i18n/en';

export function Step2Fields(): React.JSX.Element {
    return (
        <section>
            <h3 className={styles.stepTitle}>{en.reviewFields}</h3>
            <AIAutofillBanner />
            <div className={styles.fieldGrid}>
                <label className={styles.field}>
                    <span className={styles.label}>{en.fullName}</span>
                    <input className={styles.input} placeholder="Full name" />
                </label>
                <label className={styles.field}>
                    <span className={styles.label}>{en.phoneNumber}</span>
                    <input className={styles.input} placeholder="+91 98765 43210" />
                </label>
            </div>
        </section>
    );
}
