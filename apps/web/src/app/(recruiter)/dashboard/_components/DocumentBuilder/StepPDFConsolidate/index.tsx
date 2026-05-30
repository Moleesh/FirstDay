/**
 * @module StepPDFConsolidate
 * @description PDF consolidation and page placement step.
 * @author auto
 * @since 1.0.0
 */
import { PageReorder } from "./PageReorder";
import { PhotoPlacement } from "./PhotoPlacement";

export function StepPDFConsolidate(): JSX.Element {
  return (
    <div className="stack-sm">
      <PageReorder />
      <PhotoPlacement />
    </div>
  );
}
