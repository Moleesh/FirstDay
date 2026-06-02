/**
 * @format
 * @module JoineeStatusBadge
 * @description Displays a joinee onboarding status.
 * @author auto
 * @since 1.0.0
 */

import type { JSX } from 'react';

export const JoineeStatusBadge = ({ status }: { status: string }): JSX.Element => {
    return <span className="status-badge">{status}</span>;
};
