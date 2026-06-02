/**
 * @format
 * @module DocumentLibraryTests
 * @description Verifies the created-document session and link actions.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DocumentLibrary } from '../index';

describe('DocumentLibrary', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('shows the created documents session and copies a share link', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, { clipboard: { writeText } });

        render(<DocumentLibrary />);

        expect(screen.getByRole('heading', { name: 'Created documents' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));

        await waitFor(() => {
            expect(writeText).toHaveBeenCalledWith(
                expect.stringContaining('https://moleesh.github.io/FirstDay/dashboard/?document='),
            );
        });
        expect(screen.getByRole('button', { name: 'Link copied' })).toBeInTheDocument();
    });
});
