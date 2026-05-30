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
        <span>F</span>
      </span>
      <span className="firstday-logo__copy">
        <strong>FirstDay</strong>
        {meta ? <small>{meta}</small> : null}
      </span>
    </span>
  );
}
