/**
 * @format
 * @module StepFormBuilder
 * @description AI field extraction and manual field editing for uploaded documents.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { type FormEvent, useState } from 'react';
import { BrainCircuit, Plus, Sparkles } from 'lucide-react';
import { Button } from '@onboarding/ui';

const extractedDefaults = ['Full name', 'Date of birth', 'Address', 'PAN number'];

interface StepFormBuilderProps {
    documents: string[];
    fields: string[];
    onFieldsChange: (fields: string[]) => void;
}

export function StepFormBuilder({
    documents,
    fields,
    onFieldsChange,
}: StepFormBuilderProps): JSX.Element {
    const [customField, setCustomField] = useState('');
    const hasDocuments = documents.length > 0;

    function extractFields(): void {
        if (!hasDocuments) return;
        onFieldsChange(extractedDefaults);
    }

    function addField(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const label = customField.trim();
        if (!label || fields.includes(label)) return;
        onFieldsChange([...fields, label]);
        setCustomField('');
    }

    return (
        <div className="field-builder">
            <div className="field-builder__status">
                <BrainCircuit size={16} />
                {hasDocuments
                    ? `${documents.length} uploaded document${documents.length === 1 ? '' : 's'} ready for AI extraction.`
                    : 'Upload documents in the previous step to unlock AI extraction.'}
            </div>
            <button
                className="field-builder__extract"
                disabled={!hasDocuments}
                onClick={extractFields}
                type="button"
            >
                <Sparkles size={16} />
                Extract fields with AI
            </button>
            {hasDocuments ? (
                <div className="field-builder__documents" aria-label="Uploaded documents summary">
                    {documents.map((document) => (
                        <span className="field-builder__document" key={document}>
                            {document}
                        </span>
                    ))}
                </div>
            ) : null}
            {!fields.length ? (
                <div className="field-builder__status field-builder__status--quiet">
                    Extracted fields will appear here after AI processing.
                </div>
            ) : null}
            {fields.length ? (
                <div className="field-builder__fields">
                    {fields.map((field) => (
                        <label className="field-builder__field" key={field}>
                            <span>{field}</span>
                            <input
                                className="app-input"
                                placeholder={`Enter ${field.toLowerCase()}`}
                            />
                        </label>
                    ))}
                </div>
            ) : null}
            <form className="field-builder__custom" onSubmit={addField}>
                <input
                    aria-label="Custom field"
                    className="app-input"
                    onChange={(event) => setCustomField(event.target.value)}
                    placeholder="Add custom field for later reference"
                    value={customField}
                />
                <Button className="app-button app-button--primary" type="submit">
                    <Plus size={16} />
                    Add field
                </Button>
            </form>
        </div>
    );
}
