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
export function ScrollProgress(): JSX.Element | null {
    const [progress, setProgress] = useState(0);
    const [scrollable, setScrollable] = useState(false);

    useEffect(() => {
        const scroller = document.querySelector<HTMLElement>('.app-shell__content');

        if (!scroller) return;

        const contentScroller = scroller;

        function update(): void {
            const limit = contentScroller.scrollHeight - contentScroller.clientHeight;
            setScrollable(limit > 0);
            setProgress(limit > 0 ? Math.min(contentScroller.scrollTop / limit, 1) : 0);
        }

        update();
        const observer = new ResizeObserver(update);
        observer.observe(contentScroller);
        contentScroller.addEventListener('scroll', update, { passive: true });

        return (): void => {
            observer.disconnect();
            contentScroller.removeEventListener('scroll', update);
        };
    }, []);

    if (!scrollable) return null;

    return (
        <span aria-hidden="true" className="scroll-progress">
            <span style={{ transform: `scaleY(${Math.max(progress, 0.08)})` }} />
        </span>
    );
}
