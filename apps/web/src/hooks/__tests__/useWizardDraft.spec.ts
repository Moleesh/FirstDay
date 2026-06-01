/**
 * @format
 * @module UseWizardDraftTests
 * @description Tests onboarding draft persistence.
 */

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useWizardDraft } from '@/hooks/useWizardDraft';

describe('useWizardDraft', () => {
    it('stores a serialized onboarding draft', () => {
        const { result } = renderHook(() => useWizardDraft());

        act(() => result.current.saveDraft({ fullName: 'Aarav Mehta' }));

        expect(window.localStorage.getItem('onboarding-wizard-draft')).toBe(
            '{"fullName":"Aarav Mehta"}',
        );
    });
});
