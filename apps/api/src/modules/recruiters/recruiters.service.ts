/**
 * @format
 * @module RecruitersService
 * @description Provides recruiter dashboard read models.
 * @author auto
 * @since 1.0.0
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class RecruitersService {
    /**
     * Builds dashboard metrics for the authenticated recruiter.
     * @returns Dashboard metric data.
     */
    async dashboard(): Promise<{ pending: number; inProgress: number; completed: number }> {
        return { pending: 0, inProgress: 0, completed: 0 };
    }
}
