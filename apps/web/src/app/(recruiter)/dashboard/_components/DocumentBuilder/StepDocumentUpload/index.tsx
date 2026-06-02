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
import { FileText, FileUp, FolderUp, Sparkles, X } from 'lucide-react';
import { Button } from '@onboarding/ui';
import './_styles/StepDocumentUpload.scss';

export type StepDocumentUploadProps = {
    documents: string[];
    onContinueExtraction: () => void;
    onDocumentsChange: (documents: string[]) => void;
};

const uniqueFiles = (current: string[], incoming: string[]): string[] => {
    return [...new Set([...current, ...incoming])];
};

export const StepDocumentUpload = ({
    documents,
    onContinueExtraction,
    onDocumentsChange,
}: StepDocumentUploadProps): JSX.Element => {
    const uploadDocuments = (event: ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(event.target.files ?? []).map((file) => file.name);
        if (!files.length) return;
        onDocumentsChange(uniqueFiles(documents, files));
        event.target.value = '';
    };

    const removeDocument = (name: string): void => {
        onDocumentsChange(documents.filter((document) => document !== name));
    };

    return (
        <div className="document-upload">
            <label className="document-upload__dropzone">
                <span className="document-upload__icon">
                    <FolderUp size={22} />
                </span>
                <span className="document-upload__copy">
                    <strong>Upload all source documents</strong>
                    <small>Drop every PDF, Word, or Excel file that AI should inspect.</small>
                </span>
                <span className="document-upload__browse">
                    <FileUp size={16} />
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
            <div className="document-upload__status">
                <Sparkles size={16} />
                {documents.length
                    ? `${documents.length} source document${documents.length === 1 ? '' : 's'} ready for extraction.`
                    : 'Upload every source document before starting extraction.'}
            </div>
            <div className="document-upload__list" aria-label="Uploaded source documents">
                {documents.length ? (
                    documents.map((document) => (
                        <div className="document-upload__item" key={document}>
                            <FileText size={16} />
                            <span className="document-upload__name">{document}</span>
                            <button
                                aria-label={`Remove ${document}`}
                                className="document-upload__remove"
                                onClick={() => removeDocument(document)}
                                type="button"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="document-upload__empty">
                        Add your source files here so the next step can read them together.
                    </div>
                )}
            </div>
            <div className="document-upload__hint">
                Tip: upload identity, employment, and supporting docs together so the extracted
                fields stay consistent.
            </div>
            <Button
                className="app-button app-button--primary"
                disabled={!documents.length}
                onClick={onContinueExtraction}
                type="button"
            >
                Continue with extraction
            </Button>
        </div>
    );
};
