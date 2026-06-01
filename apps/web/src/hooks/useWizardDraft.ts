/**
 * @format
 * @module UseWizardDraft
 * @description Persists joinee wizard draft data to localStorage.
 * @author auto
 * @since 1.0.0
 */

import { useCallback } from 'react';

const DRAFT_KEY = 'onboarding-wizard-draft';

export function useWizardDraft(): { saveDraft: (value: unknown) => void } {
	const saveDraft = useCallback((value: unknown): void => {
		window.localStorage.setItem(DRAFT_KEY, JSON.stringify(value));
	}, []);
	return { saveDraft };
}
