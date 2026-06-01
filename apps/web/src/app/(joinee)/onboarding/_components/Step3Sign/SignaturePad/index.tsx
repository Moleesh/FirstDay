/**
 * @format
 * @module SignaturePad
 * @description Canvas signature pad for joinee consent.
 * @author auto
 * @since 1.0.0
 */

'use client';

import SignatureCanvas from 'react-signature-canvas';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';

export function SignaturePad(): React.JSX.Element {
    return (
        <div className={styles.signaturePad}>
            <SignatureCanvas canvasProps={{ className: styles.signatureCanvas }} />
        </div>
    );
}
