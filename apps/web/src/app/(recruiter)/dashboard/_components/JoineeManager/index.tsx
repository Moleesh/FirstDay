/**
 * @format
 * @module JoineeManager
 * @description Recruiter joinee assignment and monitoring panel.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { CreateJoineeForm } from './CreateJoineeForm';
import { DocumentViewer } from './DocumentViewer';
import { JoineeList } from './JoineeList';

export type JoineeSummary = {
    accessCode?: string;
    displayId: string;
    fullName: string;
    status: string;
};

export function JoineeManager(): JSX.Element {
    const [joinees, setJoinees] = useState<Array<JoineeSummary>>([
        { displayId: 'JN-2026-00042', fullName: 'Demo joinee', status: 'PENDING' },
    ]);

    function createJoinee(fullName: string): void {
        const sequence = joinees.length + 43;
        setJoinees((current) => [
            {
                accessCode: Math.random().toString(36).slice(2, 10).toUpperCase(),
                displayId: `JN-${new Date().getFullYear()}-${sequence.toString().padStart(5, '0')}`,
                fullName,
                status: 'PENDING',
            },
            ...current,
        ]);
    }

    return (
        <section className="app-card stack-md">
            <div className="app-card__heading">
                <span>Live assignments</span>
                <h2>Joinee workspace</h2>
            </div>
            <CreateJoineeForm onCreate={createJoinee} />
            <JoineeList joinees={joinees} />
            <DocumentViewer />
        </section>
    );
}
