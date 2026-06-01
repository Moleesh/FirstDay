/**
 * @format
 * @module JoineeList
 * @description Lists joinees and onboarding statuses.
 * @author auto
 * @since 1.0.0
 */

import { JoineeStatusBadge } from './JoineeStatusBadge';
import type { JoineeSummary } from '@/app/(recruiter)/dashboard/_components/JoineeManager';

export function JoineeList({ joinees }: { joinees: Array<JoineeSummary> }): React.JSX.Element {
    return (
        <div className="joinee-list">
            {joinees.map((joinee) => (
                <div className="joinee-card" key={joinee.displayId}>
                    <div className="joinee-card__row">
                        <div>
                            <div className="joinee-card__name">{joinee.fullName}</div>
                            <div className="app-muted">{joinee.displayId}</div>
                        </div>
                        <JoineeStatusBadge status={joinee.status} />
                    </div>
                    {joinee.accessCode ? (
                        <div className="access-code">
                            Access code: <strong>{joinee.accessCode}</strong>
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
