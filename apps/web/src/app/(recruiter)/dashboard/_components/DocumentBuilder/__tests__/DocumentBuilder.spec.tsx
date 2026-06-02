/**
 * @format
 * @module DocumentBuilderTests
 * @description Component tests for the recruiter template wizard.
 * @author auto
 * @since 1.0.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { DocumentBuilder } from '../index';

describe('DocumentBuilder', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('offers common documents and accepts a custom requirement', async () => {
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

    it('advances through the four-step template wizard', async () => {
        render(<DocumentBuilder />);

        expect(screen.getByRole('heading', { name: 'Required document' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
        expect(screen.getByRole('button', { name: '3 AI extraction' })).toBeDisabled();

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('heading', { name: 'Upload documents' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: '4 PDF review' })).toBeDisabled();

        await userEvent.upload(
            screen.getByLabelText('Upload source documents'),
            new File(['doc-1'], 'identity-proof.pdf', { type: 'application/pdf' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Continue with extraction' }));

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('heading', { name: 'AI extraction' })).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(screen.getByRole('heading', { name: 'PDF review' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('uploads all documents before extracting fields with AI', async () => {
        render(<DocumentBuilder />);

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        await userEvent.upload(screen.getByLabelText('Upload source documents'), [
            new File(['doc-1'], 'identity-proof.pdf', { type: 'application/pdf' }),
            new File(['doc-2'], 'employment-letter.docx', {
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }),
        ]);

        expect(screen.getByText('identity-proof.pdf')).toBeInTheDocument();
        expect(screen.getByText('employment-letter.docx')).toBeInTheDocument();

        await userEvent.click(screen.getByRole('button', { name: 'Continue with extraction' }));
        expect(screen.getByRole('heading', { name: 'AI extraction' })).toBeInTheDocument();
        await userEvent.click(screen.getByRole('button', { name: 'Extract fields with AI' }));
        expect(screen.getByText('Full name')).toBeInTheDocument();
        expect(screen.getByText('PAN number')).toBeInTheDocument();
    });

    it('reorders PDF pages and accepts mapping annotations', async () => {
        render(<DocumentBuilder />);

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        await userEvent.upload(
            screen.getByLabelText('Upload source documents'),
            new File(['source'], 'employment-record.pdf', { type: 'application/pdf' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Continue with extraction' }));
        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        await userEvent.click(screen.getByRole('button', { name: 'Next' }));

        await userEvent.click(screen.getByRole('button', { name: 'Move Personal details right' }));
        expect(screen.getByText('Page 1').closest('article')).toHaveTextContent('Identity proof');

        await userEvent.click(screen.getByRole('button', { name: 'Page 2 Personal details' }));
        await userEvent.type(
            screen.getByLabelText('Annotation note'),
            'Move full name below header',
        );
        expect(screen.getByLabelText('Annotation note')).toHaveValue('Move full name below header');
    });

    it('persists the document title for future reference', async () => {
        const { unmount } = render(<DocumentBuilder />);

        const titleInput = screen.getByLabelText('Document title');
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, 'Design onboarding pack');
        expect(titleInput).toHaveValue('Design onboarding pack');
        expect(screen.getByText(/Current pack: Design onboarding pack\./)).toBeInTheDocument();

        unmount();
        render(<DocumentBuilder />);

        expect(screen.getByLabelText('Document title')).toHaveValue('Design onboarding pack');
    });

    it('continues from upload into extraction', async () => {
        render(<DocumentBuilder />);

        await userEvent.click(screen.getByRole('button', { name: 'Next' }));
        await userEvent.upload(
            screen.getByLabelText('Upload source documents'),
            new File(['source'], 'employment-record.pdf', { type: 'application/pdf' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Continue with extraction' }));

        expect(screen.getByRole('heading', { name: 'AI extraction' })).toBeInTheDocument();
    });
});
