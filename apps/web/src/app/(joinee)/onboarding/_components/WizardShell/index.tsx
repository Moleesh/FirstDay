/**
 * @format
 * @module WizardShell
 * @description Layout shell for the joinee onboarding wizard.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { Children, type ReactNode, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@onboarding/ui';
import { WizardProgress } from '@/components/shared/WizardProgress';
import { useWizardDraft } from '@/hooks/useWizardDraft';
import { useSessionStore } from '@/stores/sessionStore';
import styles from '@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss';
import { en } from '@/i18n/en';

export const WizardShell = ({ children }: { children: ReactNode }): JSX.Element => {
    const steps = useMemo(() => Children.toArray(children), [children]);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const clearSession = useSessionStore((state) => state.clearSession);
    const { saveDraft } = useWizardDraft();
    const isFirst = step === 0;
    const isLast = step === steps.length - 1;

    const logout = (): void => {
        clearSession();
        router.replace('/login?role=joinee');
    };

    /**
     * Advances the wizard and persists the current step.
     */
    const goNext = (): void => {
        if (!isLast) {
            const nextStep = step + 1;
            saveDraft({ currentStep: nextStep });
            setStep(nextStep);
        }
    };

    /**
     * Moves back one wizard step and persists the current step.
     */
    const goBack = (): void => {
        const nextStep = Math.max(0, step - 1);
        saveDraft({ currentStep: nextStep });
        setStep(nextStep);
    };

    return (
        <main className={styles.shell}>
            <div className={styles.layout}>
                <header className={styles.header}>
                    <div className={styles.headerCopy}>
                        <span className={styles.eyebrow}>{en.onboardingEyebrow}</span>
                        <h1 className={styles.title}>{en.joineeWizard}</h1>
                        <p className={styles.copy}>{en.onboardingCopy}</p>
                    </div>
                    <div className={styles.progressCard}>
                        <div className={styles.progressMeta}>
                            <span className={styles.stepLabel}>{en.onboardingStepLabel}</span>
                            <span className={styles.stepMeta}>
                                {step + 1} / {steps.length}
                            </span>
                        </div>
                        <WizardProgress currentStep={step + 1} totalSteps={steps.length} />
                    </div>
                </header>
                <motion.section
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.card}
                    initial={{ opacity: 0, y: 8 }}
                    key={step}
                >
                    <div className={styles.stepHeader}>
                        <h2 className={styles.stepTitle}>{en.onboardingStepLabel}</h2>
                        <span className={styles.stepMeta}>
                            {step + 1} / {steps.length}
                        </span>
                    </div>
                    {steps[step]}
                </motion.section>
                <nav className={styles.nav} aria-label="Wizard navigation">
                    <span>{isLast ? en.onboardingReady : en.onboardingProgress}</span>
                    <div className={styles.navGroup}>
                        <Button onClick={logout} type="button" variant="ghost">
                            <LogOut size={16} />
                            Log out
                        </Button>
                        <Button
                            disabled={isFirst}
                            onClick={goBack}
                            type="button"
                            variant="secondary"
                        >
                            <ArrowLeft size={16} />
                            {en.back}
                        </Button>
                        <Button onClick={goNext} type="button">
                            {isLast ? <Check size={16} /> : <ArrowRight size={16} />}
                            {isLast ? en.finish : en.next}
                        </Button>
                    </div>
                </nav>
            </div>
        </main>
    );
};
