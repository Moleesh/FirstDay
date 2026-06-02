/**
 * @format
 * @module RoleBadge
 * @description Displays the active user role.
 * @author auto
 * @since 1.0.0
 */

import type { ReactElement } from 'react';

export function RoleBadge({ role }: { role: string }): ReactElement {
    return <span className="role-badge">{role}</span>;
}
