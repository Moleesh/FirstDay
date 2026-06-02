/**
 * @format
 * @module CreateJoineeForm
 * @description Form for creating joinee assignments.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { type FormEvent, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@onboarding/ui';
import { en } from '@/i18n/en';

export const CreateJoineeForm = ({
    onCreate,
}: {
    onCreate: (fullName: string) => void;
}): JSX.Element => {
    const [fullName, setFullName] = useState('');

    const submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const value = fullName.trim();
        if (!value) {
            return;
        }
        onCreate(value);
        setFullName('');
    };

    return (
        <form className="stack-sm" onSubmit={submit}>
            <input
                className="app-input"
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Joinee full name"
                value={fullName}
            />
            <Button className="app-button app-button--primary" type="submit">
                <Plus size={16} />
                {en.createJoinee}
            </Button>
        </form>
    );
};
