/**
 * @format
 * @module UiUtils
 * @description Utility helpers for shared UI primitives.
 * @author auto
 * @since 1.0.0
 */

import { clsx, type ClassValue } from 'clsx';

/**
 * Joins conditional semantic class names.
 * @param inputs - Class name fragments.
 * @returns A normalized class name string.
 */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}
