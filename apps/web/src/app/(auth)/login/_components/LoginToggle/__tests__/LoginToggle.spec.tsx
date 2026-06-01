/**
 * @format
 * @module LoginToggleTests
 * @description Component tests for the login role toggle.
 * @author auto
 * @since 1.0.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LoginToggle } from '../index';

describe('LoginToggle', () => {
    it('renders both role options', () => {
        render(<LoginToggle selectedRole="recruiter" onRoleChange={() => undefined} />);
        expect(screen.getByText('Recruiter')).toBeInTheDocument();
        expect(screen.getByText('Joinee')).toBeInTheDocument();
    });

    it('emits role changes', async () => {
        let selected = 'recruiter';
        render(<LoginToggle selectedRole="recruiter" onRoleChange={(role) => (selected = role)} />);
        await userEvent.click(screen.getByText('Joinee'));
        expect(selected).toBe('joinee');
    });
});
