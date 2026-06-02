/**
 * @format
 * @module DashboardTabs
 * @description Switches between recruiter template and joinee workspaces.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { FileText, PenTool, UserCog, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DocumentBuilder } from '@/app/(recruiter)/dashboard/_components/DocumentBuilder';
import { DocumentLibrary } from '@/app/(recruiter)/dashboard/_components/DocumentLibrary';
import { JoineeManager } from '@/app/(recruiter)/dashboard/_components/JoineeManager';
import { RecruiterManager } from '@/app/(recruiter)/dashboard/_components/RecruiterManager';

type Workspace = 'documents' | 'joinees' | 'recruiters';

const tabs = [
    { icon: FileText, id: 'documents', label: 'Documents' },
    { icon: Users, id: 'joinees', label: 'Joinee workspace' },
    { icon: UserCog, id: 'recruiters', label: 'Recruiter admin' },
] as const;

/**
 * Renders dashboard workspace tabs.
 * @returns Tabbed recruiter workspace.
 */
export const DashboardTabs = (): JSX.Element => {
    const [activeTab, setActiveTab] = useState<Workspace>('documents');
    const [builderOpen, setBuilderOpen] = useState(false);

    useEffect((): (() => void) | undefined => {
        if (!builderOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return (): void => {
            document.body.style.overflow = previousOverflow;
        };
    }, [builderOpen]);

    return (
        <section className="dashboard-workspaces">
            <div className="workspace-toolbar">
                <div aria-label="Recruiter workspaces" className="workspace-tabs" role="tablist">
                    {tabs.map(({ icon: Icon, id, label }) => (
                        <button
                            aria-controls={`${id}-panel`}
                            aria-selected={activeTab === id}
                            className="workspace-tab"
                            id={`${id}-tab`}
                            key={id}
                            onClick={() => setActiveTab(id)}
                            role="tab"
                            type="button"
                        >
                            <Icon size={17} />
                            {label}
                        </button>
                    ))}
                </div>
                <button
                    className="button button--secondary workspace-launcher"
                    onClick={() => setBuilderOpen(true)}
                    type="button"
                >
                    <PenTool size={16} />
                    Open builder pop
                </button>
            </div>
            <div
                aria-labelledby="documents-tab"
                hidden={activeTab !== 'documents'}
                id="documents-panel"
                role="tabpanel"
            >
                <DocumentLibrary />
            </div>
            <div
                aria-labelledby="joinees-tab"
                hidden={activeTab !== 'joinees'}
                id="joinees-panel"
                role="tabpanel"
            >
                <JoineeManager />
            </div>
            <div
                aria-labelledby="recruiters-tab"
                hidden={activeTab !== 'recruiters'}
                id="recruiters-panel"
                role="tabpanel"
            >
                <RecruiterManager />
            </div>
            {builderOpen ? (
                <div
                    className="builder-modal__backdrop"
                    onClick={() => setBuilderOpen(false)}
                    role="presentation"
                >
                    <section
                        aria-label="Document builder pop"
                        aria-modal="true"
                        className="builder-modal"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                    >
                        <button
                            aria-label="Close builder pop"
                            className="builder-modal__close"
                            onClick={() => setBuilderOpen(false)}
                            type="button"
                        >
                            <X size={16} />
                        </button>
                        <DocumentBuilder />
                    </section>
                </div>
            ) : null}
        </section>
    );
};
