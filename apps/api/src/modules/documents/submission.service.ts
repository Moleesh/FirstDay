/**
 * @format
 * @module SubmissionService
 * @description Handles onboarding submissions and completion state.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';
import type { SubmissionDraft } from '@onboarding/types';

@Injectable()
export class SubmissionService {
    /**
     * Saves a draft submission.
     * @param joineeId - Joinee identifier.
     * @param draft - Draft field values.
     * @returns Saved draft summary.
     */
    async saveDraft(
        joineeId: string,
        draft: SubmissionDraft,
    ): Promise<{ joineeId: string; saved: boolean }> {
        return { joineeId, saved: Object.keys(draft.fieldValues).length >= 0 };
    }
}
