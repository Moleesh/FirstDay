/**
 * @format
 * @module PageReorder
 * @description Reorderable PDF preview pages with editable field mapping annotations.
 */

'use client';

import { ChevronLeft, ChevronRight, FileText, GripVertical } from 'lucide-react';
import { useState } from 'react';

const fallbackPage = {
    id: 'personal',
    label: 'Personal details',
    fields: ['Full name', 'Date of birth'],
};
const initialPages = [
    fallbackPage,
    { id: 'identity', label: 'Identity proof', fields: ['PAN number', 'Address'] },
    { id: 'consent', label: 'Consent and signature', fields: ['Signature'] },
];

export function PageReorder(): React.JSX.Element {
    const [pages, setPages] = useState(initialPages);
    const [activeId, setActiveId] = useState('personal');
    const [annotation, setAnnotation] = useState('');
    const activePage = pages.find(({ id }) => id === activeId) ?? fallbackPage;

    function movePage(index: number, direction: number): void {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= pages.length) return;
        setPages((current) => {
            const next = [...current];
            const currentPage = next[index];
            const targetPage = next[nextIndex];
            if (!currentPage || !targetPage) return current;
            next[index] = targetPage;
            next[nextIndex] = currentPage;
            return next;
        });
    }

    return (
        <div className="pdf-review">
            <div className="pdf-review__pages" aria-label="PDF pages">
                {pages.map((page, index) => (
                    <article className="pdf-page" key={page.id}>
                        <button
                            className="pdf-page__preview"
                            onClick={() => setActiveId(page.id)}
                            type="button"
                        >
                            <GripVertical size={14} />
                            <FileText size={22} />
                            <span>Page {index + 1}</span>
                            <strong>{page.label}</strong>
                        </button>
                        <div className="pdf-page__actions">
                            <button
                                aria-label={`Move ${page.label} left`}
                                disabled={index === 0}
                                onClick={() => movePage(index, -1)}
                                type="button"
                            >
                                <ChevronLeft size={15} />
                            </button>
                            <button
                                aria-label={`Move ${page.label} right`}
                                disabled={index === pages.length - 1}
                                onClick={() => movePage(index, 1)}
                                type="button"
                            >
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
            <section className="pdf-review__mapping">
                <h4>{activePage.label} field mapping</h4>
                <p>Check extracted fields and note any area that needs manual placement.</p>
                {activePage.fields.map((field) => (
                    <input
                        aria-label={`Map ${field}`}
                        className="app-input"
                        defaultValue={field}
                        key={field}
                    />
                ))}
                <textarea
                    aria-label="Annotation note"
                    className="app-input"
                    onChange={(event) => setAnnotation(event.target.value)}
                    placeholder="Add annotation for an unmatched area"
                    value={annotation}
                />
            </section>
        </div>
    );
}
