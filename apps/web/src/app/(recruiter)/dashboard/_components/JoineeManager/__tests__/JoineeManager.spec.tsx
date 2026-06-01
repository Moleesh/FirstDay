/**
 * @format
 * @module JoineeManagerTests
 * @description Tests joinee creation and delivery actions.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { JoineeManager } from '@/app/(recruiter)/dashboard/_components/JoineeManager';

describe('JoineeManager', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('creates a trimmed joinee assignment with an access code', async () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
        render(<JoineeManager />);

        await userEvent.type(screen.getByPlaceholderText('Joinee full name'), '  Maya Rao  ');
        await userEvent.click(screen.getByRole('button', { name: /Create joinee/ }));

        expect(screen.getByText('Maya Rao')).toBeVisible();
        expect(screen.getByText(/Access code:/)).toBeVisible();
        expect(screen.getAllByText('PENDING')).toHaveLength(2);
    });

    it('does not create an empty assignment', async () => {
        render(<JoineeManager />);

        await userEvent.type(screen.getByPlaceholderText('Joinee full name'), '   ');
        await userEvent.click(screen.getByRole('button', { name: /Create joinee/ }));

        expect(screen.getAllByText('PENDING')).toHaveLength(1);
    });

    it('copies the welcome message and downloads both PDF variants', async () => {
        const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        vi.stubGlobal('URL', {
            ...URL,
            createObjectURL: vi.fn(() => 'blob:firstday'),
            revokeObjectURL: vi.fn(),
        });
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, { clipboard: { writeText } });
        render(<JoineeManager />);

        fireEvent.click(screen.getByRole('button', { name: 'Unsigned PDF' }));
        fireEvent.click(screen.getByRole('button', { name: 'Signed PDF' }));
        await userEvent.click(screen.getByRole('button', { name: 'Copy welcome link' }));

        expect(click).toHaveBeenCalledTimes(2);
        expect(writeText).toHaveBeenCalledWith(expect.stringContaining('/login?role=joinee'));
        await waitFor(() => expect(screen.getByText('Copied welcome link')).toBeVisible());
    });
});
