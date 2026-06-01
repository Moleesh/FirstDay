/**
 * @format
 * @module ScrollProgress
 * @description Persistent vertical scroll affordance for long application pages.
 * @author auto
 * @since 1.0.0
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Renders a visual page-scroll progress rail.
 * @returns Scroll progress element.
 */
export function ScrollProgress(): JSX.Element | null {
    const [progress, setProgress] = useState(0);
    const [scrollable, setScrollable] = useState(false);

    useEffect(() => {
        function update(): void {
            const limit = document.documentElement.scrollHeight - window.innerHeight;
            setScrollable(limit > 0);
            setProgress(limit > 0 ? Math.min(window.scrollY / limit, 1) : 0);
        }

        update();
        const observer = new ResizeObserver(update);
        observer.observe(document.documentElement);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, { passive: true });
        return (): void => {
            observer.disconnect();
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update);
        };
    }, []);

    if (!scrollable) return null;

    return (
        <span aria-hidden="true" className="scroll-progress">
            <span style={{ transform: `scaleY(${Math.max(progress, 0.08)})` }} />
        </span>
    );
}
