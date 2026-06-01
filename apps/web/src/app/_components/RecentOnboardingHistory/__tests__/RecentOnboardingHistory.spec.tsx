/**
 * @format
 * @module RecentOnboardingHistoryTests
 * @description Component tests for recently onboarded quick details.
 * @author auto
 * @since 1.0.0
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { RecentOnboardingHistory } from '../index';

describe('RecentOnboardingHistory', () => {
	it('opens modal details and lazily loads more people', async () => {
		render(<RecentOnboardingHistory />);

		const person = screen.getByRole('button', { name: /Aarav Mehta/ });
		await userEvent.click(person);

		expect(screen.queryByText('Rohan Shah')).not.toBeInTheDocument();
		await userEvent.click(screen.getByRole('button', { name: 'Load more' }));
		expect(screen.getByText('Rohan Shah')).toBeInTheDocument();

		await userEvent.click(person);
		expect(screen.getByRole('dialog', { name: /Aarav Mehta/ })).toBeInTheDocument();
		expect(screen.getByText('Signed and complete')).toBeInTheDocument();
		expect(screen.getByText('Maya Rao')).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: 'Close quick details' }));
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
