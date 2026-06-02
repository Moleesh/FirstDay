/**
 * @format
 * @module DocumentBuilder
 * @description Recruiter workflow for document template creation.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@onboarding/ui';
import { StepChecklist } from './StepChecklist';
import { StepDocumentUpload } from './StepDocumentUpload';
import { StepFormBuilder } from './StepFormBuilder';
import { StepPDFConsolidate } from './StepPDFConsolidate';
import { en } from '@/i18n/en';

const steps = [
    { copy: 'Choose the documents every joinee must submit.', label: 'Required document' },
    { copy: 'Upload every source document for the pack.', label: 'Upload documents' },
    { copy: 'Let AI extract fields from the uploaded documents.', label: 'AI extraction' },
    {
        copy: 'Reorder pages, confirm field mappings, and annotate unmatched areas.',
        label: 'PDF review',
    },
] as const;

const titleStorageKey = 'firstday-document-builder-title';
const uploadStorageKey = 'firstday-document-builder-uploaded-documents';
const fieldsStorageKey = 'firstday-document-builder-extracted-fields';
const defaultDocumentTitle = 'Untitled onboarding pack';

function loadTitle(): string {
    if (typeof window === 'undefined') return defaultDocumentTitle;
    const saved = localStorage.getItem(titleStorageKey);
    return saved && saved.trim() ? saved : defaultDocumentTitle;
}

function loadUploadedDocuments(): string[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(uploadStorageKey);
    if (!saved) return [];
    try {
        return JSON.parse(saved) as string[];
    } catch {
        return [];
    }
}

function loadExtractedFields(): string[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(fieldsStorageKey);
    if (!saved) return [];
    try {
        return JSON.parse(saved) as string[];
    } catch {
        return [];
    }
}

/**
 * Renders the template builder.
 * @returns Document builder component.
 */
export function DocumentBuilder(): JSX.Element {
    const [currentStep, setCurrentStep] = useState(0);
    const [documentTitle, setDocumentTitle] = useState(loadTitle);
    const [uploadedDocuments, setUploadedDocuments] = useState(loadUploadedDocuments);
    const [extractedFields, setExtractedFields] = useState(loadExtractedFields);
    const resolvedDocumentTitle = documentTitle.trim() || defaultDocumentTitle;
    const step = steps[currentStep] ?? steps[0];

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(uploadStorageKey, JSON.stringify(uploadedDocuments));
    }, [uploadedDocuments]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(fieldsStorageKey, JSON.stringify(extractedFields));
    }, [extractedFields]);

    function updateTitle(value: string): void {
        setDocumentTitle(value);
        if (typeof window !== 'undefined') {
            localStorage.setItem(titleStorageKey, value);
        }
    }

    return (
        <section className="app-card stack-md">
            <div className="app-card__heading">
                <span>Template studio</span>
                <h2>{en.documentBuilder}</h2>
                <label className="builder-title">
                    <span>Document title</span>
                    <input
                        aria-label="Document title"
                        className="app-input"
                        onChange={(event) => updateTitle(event.target.value)}
                        placeholder="Name this pack for future reference"
                        value={documentTitle}
                    />
                </label>
            </div>
            <ol className="builder-steps" aria-label="Template builder progress">
                {steps.map(({ label }, index) => (
                    <li key={label}>
                        <button
                            aria-current={index === currentStep ? 'step' : undefined}
                            aria-label={`${index + 1} ${label}`}
                            className="builder-step"
                            onClick={() => setCurrentStep(index)}
                            type="button"
                        >
                            <span>{index < currentStep ? <Check size={14} /> : index + 1}</span>
                            {label}
                        </button>
                    </li>
                ))}
            </ol>
            <div className="builder-stage">
                <div className="builder-stage__heading">
                    <span>
                        Step {currentStep + 1} of {steps.length}
                    </span>
                    <h3>{step.label}</h3>
                    <p>
                        {step.copy}{' '}
                        {resolvedDocumentTitle ? `Current pack: ${resolvedDocumentTitle}.` : null}
                    </p>
                </div>
                {currentStep === 0 ? <StepChecklist /> : null}
                {currentStep === 1 ? (
                    <StepDocumentUpload
                        documents={uploadedDocuments}
                        onDocumentsChange={setUploadedDocuments}
                    />
                ) : null}
                {currentStep === 2 ? (
                    <StepFormBuilder
                        documents={uploadedDocuments}
                        fields={extractedFields}
                        onFieldsChange={setExtractedFields}
                    />
                ) : null}
                {currentStep === 3 ? (
                    <StepPDFConsolidate
                        fields={extractedFields}
                        title={resolvedDocumentTitle}
                        uploadedDocuments={uploadedDocuments}
                    />
                ) : null}
            </div>
            <div className="builder-actions">
                <Button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((value) => value - 1)}
                    type="button"
                    variant="secondary"
                >
                    <ChevronLeft size={16} />
                    Back
                </Button>
                <Button
                    disabled={currentStep === steps.length - 1}
                    onClick={() => setCurrentStep((value) => value + 1)}
                    type="button"
                >
                    Next
                    <ChevronRight size={16} />
                </Button>
            </div>
        </section>
    );
}
