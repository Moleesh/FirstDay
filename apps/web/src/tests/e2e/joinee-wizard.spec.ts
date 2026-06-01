/**
 * @format
 * @module JoineeWizardE2E
 * @description End-to-end test for joinee onboarding wizard access.
 * @author auto
 * @since 1.0.0
 */

import { expect, test } from '@playwright/test';

test('joinee wizard renders', async ({ page }) => {
	await page.goto('/login?role=joinee');
	await page.getByPlaceholder('JN-2026-00042').fill('JN-2026-00042');
	await page.getByPlaceholder('Access code').fill('123456');
	await page.getByRole('button', { name: /Continue onboarding/ }).click();
	await page.waitForURL('**/onboarding');
	await expect(page.getByText('Joinee onboarding')).toBeVisible();
	await page.getByRole('button', { name: /Next/ }).click();
	await expect(page.getByText('Review fields')).toBeVisible();
});
