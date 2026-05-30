/**
 * @module CameraCapture
 * @description Camera capture control for mobile document uploads.
 * @author auto
 * @since 1.0.0
 */
import styles from "@/app/(joinee)/onboarding/_styles/OnboardingWizard.module.scss";

export function CameraCapture(): JSX.Element {
  return (
    <button className={styles.cameraButton} type="button">
      Use camera
    </button>
  );
}
