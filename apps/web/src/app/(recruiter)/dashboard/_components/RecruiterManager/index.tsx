/**
 * @format
 * @module RecruiterManager
 * @description Trial admin workspace for inviting and listing recruiters.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { type FormEvent, useState } from 'react';
import { Plus, ShieldCheck } from 'lucide-react';
import { Button } from '@onboarding/ui';

type RecruiterSummary = {
    email: string;
    name: string;
    role: 'ADMIN' | 'RECRUITER';
    status: 'ACTIVE' | 'INVITED';
};

const initialRecruiters: RecruiterSummary[] = [
    { email: 'recruiter@firstday.dev', name: 'Trial admin', role: 'ADMIN', status: 'ACTIVE' },
];

/**
 * Renders admin recruiter management controls.
 * @returns Recruiter manager workspace.
 */
export function RecruiterManager(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [recruiters, setRecruiters] = useState(initialRecruiters);

    function submit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const recruiterEmail = email.trim();
        const recruiterName = name.trim();
        if (!recruiterEmail || !recruiterName) return;
        setRecruiters((current) => [
            { email: recruiterEmail, name: recruiterName, role: 'RECRUITER', status: 'INVITED' },
            ...current,
        ]);
        setEmail('');
        setName('');
    }

    return (
        <section className="app-card stack-md">
            <div className="app-card__heading">
                <span>Admin controls</span>
                <h2>Recruiter access</h2>
            </div>
            <p className="app-muted">
                Invite recruiters to manage joinee onboarding for your workspace.
            </p>
            <form className="recruiter-form" onSubmit={submit}>
                <input
                    aria-label="Recruiter name"
                    className="app-input"
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Recruiter name"
                    value={name}
                />
                <input
                    aria-label="Recruiter email"
                    className="app-input"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Recruiter email"
                    type="email"
                    value={email}
                />
                <Button className="app-button app-button--primary" type="submit">
                    <Plus size={16} />
                    Add recruiter
                </Button>
            </form>
            <div className="recruiter-list">
                {recruiters.map((recruiter) => (
                    <article className="recruiter-card" key={recruiter.email}>
                        <div>
                            <strong>{recruiter.name}</strong>
                            <span>{recruiter.email}</span>
                        </div>
                        <div className="recruiter-card__badges">
                            {recruiter.role === 'ADMIN' ? <ShieldCheck size={15} /> : null}
                            <span className="role-badge">{recruiter.role}</span>
                            <span className="status-badge">{recruiter.status}</span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
