/**
 * @format
 * @module OnboardingPage
 * @description Joinee wizard page.
 * @author auto
 * @since 1.0.0
 */

import { Step1Upload } from '@/app/(joinee)/onboarding/_components/Step1Upload';
import { Step2Fields } from '@/app/(joinee)/onboarding/_components/Step2Fields';
import { Step3Sign } from '@/app/(joinee)/onboarding/_components/Step3Sign';
import { Step4Download } from '@/app/(joinee)/onboarding/_components/Step4Download';
import { WizardShell } from '@/app/(joinee)/onboarding/_components/WizardShell';

export default function OnboardingPage(): JSX.Element {
    return (
        <WizardShell>
            <Step1Upload />
            <Step2Fields />
            <Step3Sign />
            <Step4Download />
        </WizardShell>
    );
}
