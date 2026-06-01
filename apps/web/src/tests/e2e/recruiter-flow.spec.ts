/**
 * @format
 * @module RecruiterFlowE2E
 * @description End-to-end test for recruiter dashboard access.
 * @author auto
 * @since 1.0.0
 */

import { expect, test } from '@playwright/test';

test('recruiter dashboard renders', async ({ page }) => {
    await page.goto('/FirstDay/login?role=recruiter');
    await page.getByPlaceholder('recruiter').fill('recruiter');
    await page.getByPlaceholder('Password').fill('firstday');
    await page.getByRole('button', { name: /Sign in/ }).click();
    await page.waitForURL('**/dashboard/');
    await expect(page.getByRole('heading', { name: 'Joinee onboarding operations' })).toBeVisible();
});
