/**
 * @format
 * @module Step3Sign
 * @description Consent and signature capture step.
 * @author auto
 * @since 1.0.0
 */

import { SignaturePad } from './SignaturePad';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';
import { en } from '@/i18n/en';

export function Step3Sign(): React.JSX.Element {
    return (
        <section>
            <h3 className={styles.stepTitle}>{en.signConsent}</h3>
            <label className={styles.consent}>
                <input type="checkbox" />I consent to submit this onboarding packet.
            </label>
            <SignaturePad />
        </section>
    );
}
