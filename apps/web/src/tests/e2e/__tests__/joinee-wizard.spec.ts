/**
 * @format
 * @module JoineeWizardE2E
 * @description End-to-end test for joinee onboarding wizard access.
 * @author auto
 * @since 1.0.0
 */

import { expect, test } from '@playwright/test';

test('joinee wizard renders', async ({ page }) => {
    await page.goto('/FirstDay/login?role=joinee');
    await page.getByPlaceholder('JN-2026-00042').fill('JN-2026-00042');
    await page.getByPlaceholder('Access code').fill('firstday');
    await page.getByRole('button', { name: /Continue onboarding/ }).click();
    await page.waitForURL('**/onboarding/');
    await expect(page.getByRole('heading', { name: 'Joinee onboarding' })).toBeVisible();
    await page.getByRole('button', { exact: true, name: 'Next' }).click();
    await expect(page.getByText('Review fields')).toBeVisible();
});
