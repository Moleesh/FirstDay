/**
 * @format
 * @module RecruiterManagerTests
 * @description Tests recruiter invitation controls.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { RecruiterManager } from '@/app/(recruiter)/dashboard/_components/RecruiterManager';

describe('RecruiterManager', () => {
    it('adds a trimmed recruiter invitation and clears the form', async () => {
        render(<RecruiterManager />);
        const name = screen.getByLabelText('Recruiter name');
        const email = screen.getByLabelText('Recruiter email');

        await userEvent.type(name, '  Priya Nair  ');
        await userEvent.type(email, '  priya@example.com  ');
        await userEvent.click(screen.getByRole('button', { name: 'Add recruiter' }));

        expect(screen.getByText('Priya Nair')).toBeVisible();
        expect(screen.getByText('priya@example.com')).toBeVisible();
        expect(screen.getByText('INVITED')).toBeVisible();
        expect(name).toHaveValue('');
        expect(email).toHaveValue('');
    });

    it('keeps only the trial admin when required fields are missing', async () => {
        render(<RecruiterManager />);

        await userEvent.click(screen.getByRole('button', { name: 'Add recruiter' }));

        expect(screen.getByText('Trial admin')).toBeVisible();
        expect(screen.queryByText('INVITED')).not.toBeInTheDocument();
    });
});
