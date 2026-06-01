/**
 * @format
 * @module Step4Download
 * @description Final download step for completed onboarding PDFs.
 * @author auto
 * @since 1.0.0
 */

import { Download } from 'lucide-react';
import { Button } from '@onboarding/ui';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';
import { en } from '@/i18n/en';

export function Step4Download(): JSX.Element {
	return (
		<section>
			<h3 className={styles.stepTitle}>{en.downloadPack}</h3>
			<p className={styles.note}>{en.downloadPackCopy}</p>
			<Button type="button">
				<Download size={16} />
				{en.downloadPack}
			</Button>
		</section>
	);
}
