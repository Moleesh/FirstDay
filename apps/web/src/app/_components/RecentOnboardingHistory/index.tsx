/**
 * @format
 * @module RecentOnboardingHistory
 * @description Expandable quick details for recently onboarded joinees.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import previewStyles from '@/app/_styles/HomePreview.module.scss';
import modalStyles from '@/app/_styles/HomePreviewModal.module.scss';
import { en } from '@/i18n/en';

type OnboardedPerson = {
    completedOn: string;
    department: string;
    name: string;
    photoUrl: string;
    recruiter: string;
    role: string;
};

const people: Array<OnboardedPerson> = [
    {
        completedOn: 'May 28, 2026',
        department: 'Design',
        name: 'Aarav Mehta',
        photoUrl:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
        recruiter: 'Maya Rao',
        role: 'Product designer',
    },
    {
        completedOn: 'May 27, 2026',
        department: 'Engineering',
        name: 'Priya Nair',
        photoUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
        recruiter: 'Maya Rao',
        role: 'Software engineer',
    },
    {
        completedOn: 'May 26, 2026',
        department: 'Finance',
        name: 'Rohan Shah',
        photoUrl:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
        recruiter: 'Arjun Singh',
        role: 'Finance analyst',
    },
];
const PAGE_SIZE = 2;

/**
 * Renders paginated onboarding history with modal quick details.
 * @returns History list.
 */
export function RecentOnboardingHistory(): JSX.Element {
    const [selectedName, setSelectedName] = useState<string>();
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const selectedPerson = people.find(({ name }) => name === selectedName);

    return (
        <section className={previewStyles.history} aria-label={en.homeHistoryTitle}>
            <h2 className={previewStyles.historyTitle}>{en.homeHistoryTitle}</h2>
            <div className={previewStyles.historyList}>
                {people.slice(0, visibleCount).map((person) => {
                    return (
                        <div className={previewStyles.historyItem} key={person.name}>
                            <button
                                className={previewStyles.historyRow}
                                onClick={() => setSelectedName(person.name)}
                                type="button"
                            >
                                <span>
                                    <span className={previewStyles.historyName}>{person.name}</span>
                                    <span className={previewStyles.historyRole}>{person.role}</span>
                                </span>
                                <span className={previewStyles.historyMeta}>
                                    <span className={previewStyles.historyDate}>
                                        {person.completedOn.replace(', 2026', '')}
                                    </span>
                                    <ChevronRight aria-hidden="true" size={15} />
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
            {visibleCount < people.length ? (
                <button
                    className={previewStyles.loadMore}
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    type="button"
                >
                    Load more
                </button>
            ) : null}
            {selectedPerson ? (
                <div className={modalStyles.backdrop} role="presentation">
                    <section
                        aria-label={`${selectedPerson.name} quick details`}
                        aria-modal="true"
                        className={modalStyles.modal}
                        role="dialog"
                    >
                        <button
                            aria-label="Close quick details"
                            className={modalStyles.close}
                            onClick={() => setSelectedName(undefined)}
                            type="button"
                        >
                            <X size={16} />
                        </button>
                        <div className={modalStyles.profile}>
                            <Image
                                alt={`${selectedPerson.name} profile`}
                                className={modalStyles.avatar}
                                height={72}
                                src={selectedPerson.photoUrl}
                                width={72}
                            />
                            <div>
                                <span className={modalStyles.eyebrow}>Onboarding complete</span>
                                <h3>{selectedPerson.name}</h3>
                                <p>{selectedPerson.role}</p>
                            </div>
                        </div>
                        <div className={modalStyles.details}>
                            <span>{en.homeHistoryStatus}</span>
                            <strong>{en.homeHistorySigned}</strong>
                            <span>Department</span>
                            <strong>{selectedPerson.department}</strong>
                            <span>Recruiter</span>
                            <strong>{selectedPerson.recruiter}</strong>
                            <span>Completed</span>
                            <strong>{selectedPerson.completedOn}</strong>
                        </div>
                    </section>
                </div>
            ) : null}
        </section>
    );
}
