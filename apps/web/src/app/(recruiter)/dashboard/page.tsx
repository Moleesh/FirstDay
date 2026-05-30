/**
 * @module DashboardPage
 * @description Recruiter dashboard with template and joinee management.
 * @author auto
 * @since 1.0.0
 */
import { DocumentBuilder } from "@/app/(recruiter)/dashboard/_components/DocumentBuilder";
import { JoineeManager } from "@/app/(recruiter)/dashboard/_components/JoineeManager";
import { en } from "@/i18n/en";

/**
 * Renders recruiter dashboard.
 * @returns Dashboard page.
 */
export default function DashboardPage(): JSX.Element {
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
      <div className="dashboard-columns">
        <DocumentBuilder />
        <JoineeManager />
      </div>
    </main>
  );
}
