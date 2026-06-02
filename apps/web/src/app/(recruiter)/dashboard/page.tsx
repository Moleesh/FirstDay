/**
 * @format
 * @module DashboardPage
 * @description Recruiter dashboard with template and joinee management.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';
import { DashboardTabs } from '@/app/(recruiter)/dashboard/_components/DashboardTabs';
import { en } from '@/i18n/en';

/**
 * Renders recruiter dashboard.
 * @returns Dashboard page.
 */
const DashboardPage = (): JSX.Element => {
    return (
        <main className="dashboard-page">
            <section className="dashboard-hero">
                <div>
                    <span className="dashboard-eyebrow">Onboarding command center</span>
                    <h1>{en.recruiterDashboard}</h1>
                    <p>Build document packs, invite joinees, and keep every first day moving.</p>
                </div>
                <div className="dashboard-stats">
                    <div>
                        <strong>42</strong>
                        <span>Completed</span>
                    </div>
                    <div>
                        <strong>18</strong>
                        <span>Pending</span>
                    </div>
                    <div>
                        <strong>7</strong>
                        <span>Review</span>
                    </div>
                </div>
            </section>
            <DashboardTabs />
        </main>
    );
};

export default DashboardPage;
