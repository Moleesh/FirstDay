/**
 * @format
 * @module AIAutofillBanner
 * @description Indicates when extracted field suggestions are available.
 * @author auto
 * @since 1.0.0
 */

import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';

export function AIAutofillBanner(): JSX.Element {
	return <div className={styles.note}>Autofill suggestions ready</div>;
}
