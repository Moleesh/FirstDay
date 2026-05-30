/**
 * @module WizardProgress
 * @description Displays progress through a multi-step wizard.
 * @author auto
 * @since 1.0.0
 */
export function WizardProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}): JSX.Element {
  return (
    <div className="wizard-progress">
      <div
        className="wizard-progress__value"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );
}
