/**
 * @format
 * @module DocumentBuilderTests
 * @description Component tests for the recruiter template wizard.
 * @author auto
 * @since 1.0.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DocumentBuilder } from '../index';

describe('DocumentBuilder', () => {
    it('offers common documents and accepts a custom requirement', async () => {
        localStorage.clear();
        const { unmount } = render(<DocumentBuilder />);

        expect(screen.getByRole('checkbox', { name: 'Require Aadhaar card' })).toBeChecked();
        expect(screen.getByRole('checkbox', { name: 'Require Passport' })).not.toBeChecked();
        await userEvent.type(screen.getByLabelText('Custom document'), 'Degree certificate');
        await userEvent.click(screen.getByRole('button', { name: 'Add document' }));
        expect(screen.getByRole('checkbox', { name: 'Require Degree certificate' })).toBeChecked();

        const editableLabel = screen.getByLabelText('Edit Degree certificate');
        await userEvent.clear(editableLabel);
        await userEvent.type(editableLabel, 'University degree certificate');
        unmount();
        render(<DocumentBuilder />);
        expect(screen.getByDisplayValue('University degree certificate')).toBeInTheDocument();
    });

    it('advances through the template wizard', async () => {
        render(<DocumentBuilder />);

        expect(screen.getByRole('heading', { name: 'Documents' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('heading', { name: 'Fields' })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('heading', { name: 'PDF review' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('reorders PDF pages and accepts mapping annotations', async () => {
        render(<DocumentBuilder />);

        await userEvent.click(screen.getByRole('button', { name: '3 PDF review' }));
        await userEvent.click(screen.getByRole('button', { name: 'Move Personal details right' }));
        expect(screen.getByText('Page 1').closest('article')).toHaveTextContent('Identity proof');

        await userEvent.click(screen.getByRole('button', { name: 'Page 2 Personal details' }));
        await userEvent.type(
            screen.getByLabelText('Annotation note'),
            'Move full name below header',
        );
        expect(screen.getByLabelText('Annotation note')).toHaveValue('Move full name below header');
    });

    it('extracts uploaded template fields and supports custom fields', async () => {
        render(<DocumentBuilder />);

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        await userEvent.upload(
            screen.getByLabelText('Upload reference template'),
            new File(['template'], 'joining-form.pdf', { type: 'application/pdf' }),
        );
        expect(screen.getByText(/joining-form.pdf processed/)).toBeInTheDocument();
        expect(screen.getByText('PAN number')).toBeInTheDocument();

        await userEvent.type(screen.getByLabelText('Custom field'), 'Emergency contact');
        await userEvent.click(screen.getByRole('button', { name: 'Add field' }));
        expect(screen.getByText('Emergency contact')).toBeInTheDocument();
    });
});
