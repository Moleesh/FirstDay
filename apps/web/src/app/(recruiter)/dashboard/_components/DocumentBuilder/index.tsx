/**
 * @format
 * @module DocumentBuilder
 * @description Recruiter workflow for document template creation.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@onboarding/ui';
import { StepChecklist } from './StepChecklist';
import { StepFormBuilder } from './StepFormBuilder';
import { StepPDFConsolidate } from './StepPDFConsolidate';
import { en } from '@/i18n/en';

const steps = [
    { copy: 'Choose the documents every joinee must submit.', label: 'Documents' },
    { copy: 'Review extracted fields and add anything missing.', label: 'Fields' },
    {
        copy: 'Reorder pages, confirm field mappings, and annotate unmatched areas.',
        label: 'PDF review',
    },
] as const;

/**
 * Renders the template builder.
 * @returns Document builder component.
 */
export function DocumentBuilder(): React.JSX.Element {
    const [currentStep, setCurrentStep] = useState(0);
    const step = steps[currentStep] ?? steps[0];

    return (
        <section className="app-card stack-md">
            <div className="app-card__heading">
                <span>Template studio</span>
                <h2>{en.documentBuilder}</h2>
            </div>
            <ol className="builder-steps" aria-label="Template builder progress">
                {steps.map(({ label }, index) => (
                    <li key={label}>
                        <button
                            aria-current={index === currentStep ? 'step' : undefined}
                            className="builder-step"
                            onClick={() => setCurrentStep(index)}
                            type="button"
                        >
                            <span>{index < currentStep ? <Check size={14} /> : index + 1}</span>
                            {label}
                        </button>
                    </li>
                ))}
            </ol>
            <div className="builder-stage">
                <div className="builder-stage__heading">
                    <span>
                        Step {currentStep + 1} of {steps.length}
                    </span>
                    <h3>{step.label}</h3>
                    <p>{step.copy}</p>
                </div>
                {currentStep === 0 ? <StepChecklist /> : null}
                {currentStep === 1 ? <StepFormBuilder /> : null}
                {currentStep === 2 ? <StepPDFConsolidate /> : null}
            </div>
            <div className="builder-actions">
                <Button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((value) => value - 1)}
                    type="button"
                    variant="secondary"
                >
                    <ChevronLeft size={16} />
                    Back
                </Button>
                <Button
                    disabled={currentStep === steps.length - 1}
                    onClick={() => setCurrentStep((value) => value + 1)}
                    type="button"
                >
                    Next
                    <ChevronRight size={16} />
                </Button>
            </div>
        </section>
    );
}
