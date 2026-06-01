/**
 * @format
 * @module UiUtilsTests
 * @description Tests shared semantic class name normalization.
 */

import { describe, expect, it } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
    it('joins conditional class names', () => {
        const isHidden = false;

        expect(cn('button', isHidden && 'hidden', { active: true })).toBe('button active');
    });
});
