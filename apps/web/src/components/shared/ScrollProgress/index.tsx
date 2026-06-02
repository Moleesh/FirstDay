/**
 * @format
 * @module ScrollProgress
 * @description Persistent scroll progress rail for scrollable shell content.
 * @author auto
 * @since 1.0.0
 */

'use client';

import type { JSX } from 'react';
import { useEffect, useState } from 'react';

/**
 * Renders a vertical scroll progress rail for the app shell content.
 * @returns Scroll progress element.
 */
export const ScrollProgress = (): JSX.Element | null => {
    const [progress, setProgress] = useState(0);
    const [scrollable, setScrollable] = useState(false);

    useEffect(() => {
        const scroller = document.querySelector<HTMLElement>('.app-scroll-surface');

        if (!scroller) return;

        const update = (): void => {
            const limit = scroller.scrollHeight - scroller.clientHeight;
            setScrollable(limit > 0);
            setProgress(limit > 0 ? Math.min(scroller.scrollTop / limit, 1) : 0);
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(scroller);
        scroller.addEventListener('scroll', update, { passive: true });

        return (): void => {
            observer.disconnect();
            scroller.removeEventListener('scroll', update);
        };
    }, []);

    if (!scrollable) return null;

    return (
        <span aria-hidden="true" className="scroll-progress">
            <span style={{ transform: `scaleY(${Math.max(progress, 0.08)})` }} />
        </span>
    );
};
