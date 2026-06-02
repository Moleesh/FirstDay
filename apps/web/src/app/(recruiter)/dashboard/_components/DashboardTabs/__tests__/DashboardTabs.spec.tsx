/**
 * @format
 * @module DashboardTabsTests
 * @description Verifies recruiter workspace tab switching and builder modal launch.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DashboardTabs } from '../index';

describe('DashboardTabs', () => {
    it('shows created documents first and opens the builder as a modal pop', () => {
        render(<DashboardTabs />);

        expect(screen.getByRole('heading', { name: 'Created documents' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Open builder pop' }));
        expect(screen.getByRole('dialog', { name: 'Document builder pop' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Close builder pop' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('switches to the joinee workspace and recruiter admin views', () => {
        render(<DashboardTabs />);

        fireEvent.click(screen.getByRole('tab', { name: 'Joinee workspace' }));
        expect(screen.getByRole('heading', { name: 'Joinee workspace' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('tab', { name: 'Recruiter admin' }));
        expect(screen.getByRole('heading', { name: 'Recruiter access' })).toBeInTheDocument();
    });

    it('allows an admin to add a recruiter invite', () => {
        render(<DashboardTabs />);

        fireEvent.click(screen.getByRole('tab', { name: 'Recruiter admin' }));
        fireEvent.change(screen.getByLabelText('Recruiter name'), {
            target: { value: 'Maya Rao' },
        });
        fireEvent.change(screen.getByLabelText('Recruiter email'), {
            target: { value: 'maya@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Add recruiter' }));

        expect(screen.getByText('Maya Rao')).toBeInTheDocument();
        expect(screen.getByText('maya@example.com')).toBeInTheDocument();
    });
});
