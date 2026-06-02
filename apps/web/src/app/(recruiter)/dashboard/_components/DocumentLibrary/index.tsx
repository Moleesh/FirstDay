/**
 * @format
 * @module DocumentLibrary
 * @description Created-document session for reviewing completed onboarding packs.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { FileText } from 'lucide-react';

type DocumentStatus = 'Signed' | 'Draft' | 'Needs review';

type CreatedDocument = {
    completedBy: string;
    createdOn: string;
    label: string;
    link: string;
    pages: number;
    status: DocumentStatus;
};

const createdDocuments: Array<CreatedDocument> = [
    {
        completedBy: 'Maya Rao',
        createdOn: 'May 28, 2026',
        label: 'Aarav Mehta - Design onboarding pack',
        link: 'https://moleesh.github.io/FirstDay/dashboard/?document=aarav-mehta',
        pages: 8,
        status: 'Signed',
    },
    {
        completedBy: 'Arjun Singh',
        createdOn: 'May 27, 2026',
        label: 'Priya Nair - Software engineer pack',
        link: 'https://moleesh.github.io/FirstDay/dashboard/?document=priya-nair',
        pages: 6,
        status: 'Needs review',
    },
    {
        completedBy: 'Maya Rao',
        createdOn: 'May 26, 2026',
        label: 'Rohan Shah - Finance analyst pack',
        link: 'https://moleesh.github.io/FirstDay/dashboard/?document=rohan-shah',
        pages: 7,
        status: 'Draft',
    },
];

function statusTone(status: DocumentStatus): string {
    switch (status) {
        case 'Signed':
            return 'document-status--good';
        case 'Needs review':
            return 'document-status--warning';
        default:
            return 'document-status--neutral';
    }
}

export function DocumentLibrary(): JSX.Element {
    return (
        <section className="document-library app-card stack-md">
            <div className="app-card__heading">
                <span>Session view</span>
                <h2>Documents</h2>
            </div>
            <p className="app-muted">
                Read-only display of the created onboarding packs for quick reference.
            </p>
            <div className="document-library__list" aria-label="Documents">
                {createdDocuments.map((document) => (
                    <article className="document-library__row" key={document.link}>
                        <span className="document-library__icon">
                            <FileText size={16} />
                        </span>
                        <span className="document-library__rowCopy">
                            <strong>{document.label}</strong>
                            <span>
                                {document.createdOn} • {document.pages} pages • {document.completedBy}
                            </span>
                        </span>
                        <span className={`document-status ${statusTone(document.status)}`}>
                            {document.status}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}
