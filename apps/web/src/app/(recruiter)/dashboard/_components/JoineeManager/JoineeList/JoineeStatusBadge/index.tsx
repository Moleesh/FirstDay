/**
 * @format
 * @module JoineeStatusBadge
 * @description Displays a joinee onboarding status.
 * @author auto
 * @since 1.0.0
 */

export function JoineeStatusBadge({ status }: { status: string }): React.JSX.Element {
    return <span className="status-badge">{status}</span>;
}
