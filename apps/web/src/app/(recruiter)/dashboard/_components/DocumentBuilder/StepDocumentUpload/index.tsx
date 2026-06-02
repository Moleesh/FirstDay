/**
 * @format
 * @module StepDocumentUpload
 * @description Uploads all source documents for later AI extraction.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { type ChangeEvent } from 'react';
import { FileUp, Sparkles, UploadCloud } from 'lucide-react';

interface StepDocumentUploadProps {
    documents: string[];
    onDocumentsChange: (documents: string[]) => void;
}

function uniqueFiles(current: string[], incoming: string[]): string[] {
    return [...new Set([...current, ...incoming])];
}

export function StepDocumentUpload({
    documents,
    onDocumentsChange,
}: StepDocumentUploadProps): JSX.Element {
    function uploadDocuments(event: ChangeEvent<HTMLInputElement>): void {
        const files = Array.from(event.target.files ?? []).map((file) => file.name);
        if (!files.length) return;
        onDocumentsChange(uniqueFiles(documents, files));
        event.target.value = '';
    }

    return (
        <div className="field-builder">
            <label className="field-builder__upload field-builder__upload--documents">
                <span className="field-builder__upload-icon">
                    <UploadCloud size={22} />
                </span>
                <span>
                    <strong>Upload all source documents</strong>
                    <small>Drop every PDF, Word, or Excel file that AI should inspect.</small>
                </span>
                <span className="field-builder__browse">
                    <FileUp size={15} />
                    Browse files
                </span>
                <input
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    aria-label="Upload source documents"
                    multiple
                    onChange={uploadDocuments}
                    type="file"
                />
            </label>
            <div className="field-builder__status">
                <Sparkles size={16} />
                {documents.length
                    ? `${documents.length} document${documents.length === 1 ? '' : 's'} ready for AI extraction.`
                    : 'Upload every source document before starting extraction.'}
            </div>
            {documents.length ? (
                <div className="field-builder__documents" aria-label="Uploaded documents">
                    {documents.map((document) => (
                        <span className="field-builder__document" key={document}>
                            {document}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
