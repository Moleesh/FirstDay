/**
 * @format
 * @module FirstDayLogo
 * @description Shared animated FirstDay brand mark and wordmark.
 * @author auto
 * @since 1.0.0
 */

import type { ReactNode } from 'react';

export function FirstDayLogo({
    meta,
    size = 'default',
}: {
    meta?: ReactNode;
    size?: 'compact' | 'default';
}): React.JSX.Element {
    return (
        <span className={`firstday-logo firstday-logo--${size}`}>
            <span className="firstday-logo__mark" aria-hidden="true">
                <span className="firstday-logo__document">
                    <span className="firstday-logo__line firstday-logo__line--one" />
                    <span className="firstday-logo__line firstday-logo__line--two" />
                    <span className="firstday-logo__signature" />
                </span>
                <span className="firstday-logo__seal" />
                <span className="firstday-logo__spark firstday-logo__spark--one" />
                <span className="firstday-logo__spark firstday-logo__spark--two" />
            </span>
            <span className="firstday-logo__copy">
                <strong>FirstDay</strong>
                {meta ? <small>{meta}</small> : null}
            </span>
        </span>
    );
}
