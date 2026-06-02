/**
 * @format
 * @module StepChecklist
 * @description Checklist step for required onboarding documents.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { type FormEvent, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@onboarding/ui';
import './_styles/StepChecklist.scss';

interface RequiredDocument {
    id: string;
    label: string;
}

const defaultDocuments = [
    'Aadhaar card',
    'PAN card',
    'Passport',
    'Voter ID',
    'Driving licence',
    'Bank account proof',
    'Address proof',
    'Profile photo',
] as const;

const storageKey = 'firstday-required-documents';
const selectedStorageKey = 'firstday-selected-documents';
const initialSelected = ['Aadhaar card', 'PAN card', 'Bank account proof', 'Profile photo'];
const defaultDocumentRecords = defaultDocuments.map((label) => ({
    id: label.toLowerCase().replaceAll(' ', '-'),
    label,
}));

const createDocument = (label: string): RequiredDocument => {
    return {
        id: `${label.toLowerCase().replaceAll(' ', '-')}-${Math.random().toString(36).slice(2)}`,
        label,
    };
};

const loadDocuments = (): RequiredDocument[] => {
    if (typeof window === 'undefined') return [...defaultDocumentRecords];
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as RequiredDocument[]) : [...defaultDocumentRecords];
};

export const StepChecklist = (): JSX.Element => {
    const [customLabel, setCustomLabel] = useState('');
    const [documents, setDocuments] = useState<RequiredDocument[]>(loadDocuments);
    const [selected, setSelected] = useState<string[]>(() => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem(selectedStorageKey);
        if (saved) return JSON.parse(saved) as string[];
        return documents.filter(({ label }) => initialSelected.includes(label)).map(({ id }) => id);
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(documents));
        localStorage.setItem(selectedStorageKey, JSON.stringify(selected));
    }, [documents, selected]);

    const addDocument = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const label = customLabel.trim();
        if (!label || documents.some((document) => document.label === label)) return;
        const document = createDocument(label);
        setDocuments((current) => [...current, document]);
        setSelected((current) => [...current, document.id]);
        setCustomLabel('');
    };

    const editDocument = (id: string, label: string): void => {
        setDocuments((current) =>
            current.map((document) => (document.id === id ? { ...document, label } : document)),
        );
    };

    const toggleDocument = (id: string): void => {
        setSelected((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
    };

    return (
        <div className="document-checklist">
            <div className="document-checklist__grid">
                {documents.map(({ id, label }) => (
                    <label className="document-checklist__item" key={id}>
                        <input
                            aria-label={`Require ${label}`}
                            checked={selected.includes(id)}
                            onChange={() => toggleDocument(id)}
                            type="checkbox"
                        />
                        <input
                            aria-label={`Edit ${label}`}
                            className="document-checklist__label"
                            onChange={(event) => editDocument(id, event.target.value)}
                            value={label}
                        />
                    </label>
                ))}
            </div>
            <form className="document-checklist__custom" onSubmit={addDocument}>
                <input
                    aria-label="Custom document"
                    className="app-input"
                    onChange={(event) => setCustomLabel(event.target.value)}
                    placeholder="Add another required document"
                    value={customLabel}
                />
                <Button className="app-button app-button--primary" type="submit">
                    <Plus size={16} />
                    Add document
                </Button>
            </form>
        </div>
    );
};
