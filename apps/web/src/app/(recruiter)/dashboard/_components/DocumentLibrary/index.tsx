/**
 * @format
 * @module DocumentLibrary
 * @description Created-document session for reviewing completed onboarding packs.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { Copy, Download, Eye, FileText, Link2 } from 'lucide-react';
import { useMemo, useState } from 'react';

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
    const [selectedLink, setSelectedLink] = useState(createdDocuments[0]?.link);
    const [copiedLink, setCopiedLink] = useState('');

    const selectedDocument = useMemo(
        () =>
            createdDocuments.find((document) => document.link === selectedLink) ??
            createdDocuments[0],
        [selectedLink],
    );

    async function copyLink(link: string): Promise<void> {
        await navigator.clipboard.writeText(link);
        setCopiedLink(link);
    }

    return (
        <section className="document-library app-card stack-md">
            <div className="app-card__heading">
                <span>Session view</span>
                <h2>Created documents</h2>
            </div>
            <p className="app-muted">
                Review already created onboarding packs, open the PDF preview, or copy a shareable
                link for the team.
            </p>
            <div className="document-library__shell">
                <div className="document-library__list" aria-label="Created documents">
                    {createdDocuments.map((document) => (
                        <button
                            aria-pressed={selectedLink === document.link}
                            className="document-library__row"
                            key={document.link}
                            onClick={() => setSelectedLink(document.link)}
                            type="button"
                        >
                            <span className="document-library__icon">
                                <FileText size={16} />
                            </span>
                            <span className="document-library__rowCopy">
                                <strong>{document.label}</strong>
                                <span>
                                    {document.createdOn} • {document.pages} pages •{' '}
                                    {document.completedBy}
                                </span>
                            </span>
                            <span className={`document-status ${statusTone(document.status)}`}>
                                {document.status}
                            </span>
                        </button>
                    ))}
                </div>
                {selectedDocument ? (
                    <article className="document-library__preview">
                        <div className="document-library__previewHeader">
                            <span>Selected document</span>
                            <h3>{selectedDocument.label}</h3>
                            <p>
                                Completed by {selectedDocument.completedBy} on{' '}
                                {selectedDocument.createdOn}
                            </p>
                        </div>
                        <div className="document-library__meta">
                            <div>
                                <span>Pages</span>
                                <strong>{selectedDocument.pages}</strong>
                            </div>
                            <div>
                                <span>Status</span>
                                <strong>{selectedDocument.status}</strong>
                            </div>
                            <div>
                                <span>Share link</span>
                                <strong>Ready</strong>
                            </div>
                        </div>
                        <div className="document-library__actions">
                            <button type="button">
                                <Eye size={16} />
                                Open preview
                            </button>
                            <button
                                onClick={() => void copyLink(selectedDocument.link)}
                                type="button"
                            >
                                {copiedLink === selectedDocument.link ? (
                                    <Link2 size={16} />
                                ) : (
                                    <Copy size={16} />
                                )}
                                {copiedLink === selectedDocument.link ? 'Link copied' : 'Copy link'}
                            </button>
                            <button type="button">
                                <Download size={16} />
                                Download PDF
                            </button>
                        </div>
                    </article>
                ) : null}
            </div>
        </section>
    );
}
