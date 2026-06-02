/**
 * @format
 * @module DocumentLibraryTests
 * @description Verifies the read-only created-document session.
 */

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { DocumentLibrary } from '../index';

describe('DocumentLibrary', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('shows a read-only documents display', () => {
        render(<DocumentLibrary />);

        expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
        expect(screen.getByLabelText('Documents')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
});
