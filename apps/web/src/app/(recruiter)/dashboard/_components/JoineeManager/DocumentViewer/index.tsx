/**
 * @format
 * @module DocumentViewer
 * @description Recruiter delivery actions for joinee onboarding packs.
 */

'use client';

import type { JSX } from 'react';
import { CheckCircle2, Clipboard, Download, FileText } from 'lucide-react';
import { useState } from 'react';

const welcomeLink = 'https://moleesh.github.io/FirstDay/login?role=joinee';

const downloadSample = (name: string): void => {
    const content = `FirstDay trial document\n${name}\nJoinee: Demo joinee\nID: JN-2026-00042`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([content], { type: 'application/pdf' }));
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
};

export const DocumentViewer = (): JSX.Element => {
    const [copied, setCopied] = useState(false);
    const welcomeMessage = `Welcome to FirstDay. Complete your onboarding pack here: ${welcomeLink}`;

    const copyWelcomeMessage = async (): Promise<void> => {
        await navigator.clipboard.writeText(welcomeMessage);
        setCopied(true);
    };

    return (
        <section className="delivery-panel">
            <div>
                <span>Joinee pack delivery</span>
                <h3>Download or share onboarding files</h3>
                <p>
                    Keep an unsigned working copy, download the completed pack, or share the welcome
                    link.
                </p>
            </div>
            <div className="delivery-panel__actions">
                <button onClick={() => downloadSample('firstday-unsigned-pack.pdf')} type="button">
                    <FileText size={17} />
                    Unsigned PDF
                </button>
                <button onClick={() => downloadSample('firstday-signed-pack.pdf')} type="button">
                    <Download size={17} />
                    Signed PDF
                </button>
                <button onClick={() => void copyWelcomeMessage()} type="button">
                    {copied ? <CheckCircle2 size={17} /> : <Clipboard size={17} />}
                    {copied ? 'Copied welcome link' : 'Copy welcome link'}
                </button>
            </div>
        </section>
    );
};
