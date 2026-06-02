/**
 * @format
 * @module StepPDFConsolidate
 * @description PDF consolidation and page placement step.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';
import { PageReorder } from './PageReorder';

interface StepPDFConsolidateProps {
    fields: string[];
    title: string;
    uploadedDocuments: string[];
}

export function StepPDFConsolidate({
    fields,
    title,
    uploadedDocuments,
}: StepPDFConsolidateProps): JSX.Element {
    return (
        <div className="stack-md">
            <div className="field-builder__status field-builder__status--quiet">
                <span>
                    Reviewing <strong>{title}</strong> with {uploadedDocuments.length} uploaded
                    document{uploadedDocuments.length === 1 ? '' : 's'} and {fields.length}{' '}
                    extracted field{fields.length === 1 ? '' : 's'}.
                </span>
            </div>
            <PageReorder />
        </div>
    );
}
