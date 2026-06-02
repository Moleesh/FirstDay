/**
 * @format
 * @module WizardProgress
 * @description Displays progress through a multistep wizard.
 * @author auto
 * @since 1.0.0
 */

import type { ReactElement } from 'react';

export function WizardProgress({
    currentStep,
    totalSteps,
}: {
    currentStep: number;
    totalSteps: number;
}): ReactElement {
    return (
        <div className="wizard-progress">
            <div
                className="wizard-progress__value"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
        </div>
    );
}
