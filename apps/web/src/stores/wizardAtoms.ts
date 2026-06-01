/**
 * @format
 * @module WizardAtoms
 * @description Jotai atoms for joinee wizard step state and field values.
 * @author auto
 * @since 1.0.0
 */

import { atom } from 'jotai';

export const wizardStepAtom = atom(1);
export const wizardFieldValuesAtom = atom<Record<string, string | string[]>>({});
