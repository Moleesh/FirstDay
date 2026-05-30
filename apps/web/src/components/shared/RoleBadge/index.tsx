/**
 * @module RoleBadge
 * @description Displays the active user role.
 * @author auto
 * @since 1.0.0
 */
export function RoleBadge({ role }: { role: string }): JSX.Element {
  return <span className="role-badge">{role}</span>;
}
