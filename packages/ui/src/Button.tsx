/**
 * @format
 * @module Button
 * @description Shared Shadcn-compatible button primitive wrapper.
 * @author auto
 * @since 1.0.0
 */

import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from './utils';

const buttonVariants = {
    ghost: 'button--ghost',
    primary: 'button--primary',
    secondary: 'button--secondary',
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    children: ReactNode;
    variant?: keyof typeof buttonVariants;
};

/**
 * Renders a reusable platform button.
 * @param props - Button rendering and variant props.
 * @returns A styled button element.
 */
export function Button({ asChild, className, variant, ...props }: ButtonProps): JSX.Element {
    const Comp = asChild ? Slot : 'button';
    return (
        <Comp
            className={cn('button', buttonVariants[variant ?? 'primary'], className)}
            {...props}
        />
    );
}
