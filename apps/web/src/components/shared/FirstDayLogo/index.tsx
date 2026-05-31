/**
 * @module FirstDayLogo
 * @description Shared animated FirstDay brand mark and wordmark.
 * @author auto
 * @since 1.0.0
 */
import type { ReactNode } from "react";

export function FirstDayLogo({
  meta,
  size = "default",
}: {
  meta?: ReactNode;
  size?: "compact" | "default";
}): JSX.Element {
  return (
    <span className={`firstday-logo firstday-logo--${size}`}>
      <span className="firstday-logo__mark" aria-hidden="true">
        <span className="firstday-logo__sun" />
        <span className="firstday-logo__path" />
        <span className="firstday-logo__spark firstday-logo__spark--one" />
        <span className="firstday-logo__spark firstday-logo__spark--two" />
        <span className="firstday-logo__spark firstday-logo__spark--three" />
      </span>
      <span className="firstday-logo__copy">
        <strong>FirstDay</strong>
        {meta ? <small>{meta}</small> : null}
      </span>
    </span>
  );
}
