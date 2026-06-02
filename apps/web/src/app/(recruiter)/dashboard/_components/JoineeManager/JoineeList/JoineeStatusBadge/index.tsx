/**
 * @format
 * @module JoineeStatusBadge
 * @description Displays a joinee onboarding status.
 * @author auto
 * @since 1.0.0
 */

import type { ReactElement } from 'react';

export function JoineeStatusBadge({ status }: { status: string }): ReactElement {
    return <span className="status-badge">{status}</span>;
}
