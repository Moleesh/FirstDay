/**
 * @format
 * @module HomePage
 * @description Redirect-style landing page with operational entry links.
 * @author auto
 * @since 1.0.0
 */

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ClipboardCheck, FileSignature } from 'lucide-react';
import { RecentOnboardingHistory } from '@/app/_components/RecentOnboardingHistory';
import { FirstDayLogo } from '@/components/shared/FirstDayLogo';
import { ThemeMenu } from '@/components/shared/ThemeMenu';
import previewStyles from '@/app/_styles/HomePreview.module.scss';
import motionStyles from '@/app/_styles/HomeHeroMotion.module.scss';
import actionStyles from '@/app/_styles/HomeRoleActions.module.scss';
import styles from '@/app/_styles/HomePage.module.scss';
import { en } from '@/i18n/en';

/**
 * Renders the application entry screen.
 * @returns Home page element.
 */
export default function Page(): React.JSX.Element {
    return (
        <main className={styles.shell}>
            <header className={styles.topbar}>
                <div className={styles.brand}>
                    <FirstDayLogo meta={en.homeWorkspace} />
                </div>
                <div className={styles.topbarActions}>
                    <ThemeMenu />
                </div>
            </header>

            <section className={styles.layout}>
                <div className={`${styles.intro} ${motionStyles.hero}`}>
                    <span className={styles.eyebrow}>{en.homeEyebrow}</span>
                    <h1 className={styles.title}>{en.homeTitle}</h1>
                    <p className={styles.copy}>{en.homeCopy}</p>
                    <ul className={styles.benefits}>
                        {en.homeBenefits.map((benefit) => (
                            <li key={benefit}>
                                <CheckCircle2 size={15} />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                    <div className={actionStyles.actions}>
                        <Link
                            className={`${actionStyles.action} ${actionStyles.primary}`}
                            href="/login?role=recruiter"
                        >
                            <span className={actionStyles.iconBox}>
                                <ClipboardCheck size={20} />
                            </span>
                            <span className={actionStyles.actionText}>
                                <span className={actionStyles.actionTitle}>
                                    {en.loginRecruiter}
                                </span>
                                <span className={actionStyles.actionMeta}>
                                    {en.homeRecruiterAction}
                                </span>
                            </span>
                            <ArrowUpRight className={actionStyles.actionArrow} size={17} />
                        </Link>
                        <Link className={actionStyles.action} href="/login?role=joinee">
                            <span className={actionStyles.iconBox}>
                                <FileSignature size={20} />
                            </span>
                            <span className={actionStyles.actionText}>
                                <span className={actionStyles.actionTitle}>{en.loginJoinee}</span>
                                <span className={actionStyles.actionMeta}>
                                    {en.homeJoineeAction}
                                </span>
                            </span>
                            <ArrowUpRight className={actionStyles.actionArrow} size={17} />
                        </Link>
                    </div>
                </div>

                <aside className={previewStyles.preview} aria-label={en.homePreviewLabel}>
                    <span className={previewStyles.previewAccent} />
                    <div className={previewStyles.previewHeader}>
                        <span className={previewStyles.previewTitle}>{en.homePipelineTitle}</span>
                        <span className={previewStyles.pill}>{en.homeLivePreview}</span>
                    </div>
                    <div className={previewStyles.previewGrid}>
                        <div className={previewStyles.metricRow}>
                            <div className={previewStyles.metric}>
                                <span className={previewStyles.metricValue}>12</span>
                                <span className={previewStyles.metricLabel}>
                                    {en.homeMetricRecruiters}
                                </span>
                            </div>
                            <div className={previewStyles.metric}>
                                <span className={previewStyles.metricValue}>42</span>
                                <span className={previewStyles.metricLabel}>
                                    {en.homeMetricSigned}
                                </span>
                            </div>
                            <div className={previewStyles.metric}>
                                <span className={previewStyles.metricValue}>18</span>
                                <span className={previewStyles.metricLabel}>
                                    {en.homeMetricPending}
                                </span>
                            </div>
                        </div>
                        <RecentOnboardingHistory />
                    </div>
                </aside>
            </section>
        </main>
    );
}
