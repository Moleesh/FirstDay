/**
 * @format
 * @module Step1Upload
 * @description Upload step for mandatory joinee documents.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';
import { CameraCapture } from './CameraCapture';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';
import { en } from '@/i18n/en';

export function Step1Upload(): JSX.Element {
    return (
        <section>
            <h3 className={styles.stepTitle}>{en.uploadDocuments}</h3>
            <p className={styles.copy}>{en.uploadDocumentsCopy}</p>
            <input className={styles.fileInput} type="file" />
            <CameraCapture />
        </section>
    );
}
