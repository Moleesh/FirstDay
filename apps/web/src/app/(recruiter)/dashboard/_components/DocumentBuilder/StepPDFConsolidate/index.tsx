/**
 * @module StepPDFConsolidate
 * @description PDF consolidation and page placement step.
 * @author auto
 * @since 1.0.0
 */
import { PageReorder } from "./PageReorder";

export function StepPDFConsolidate(): JSX.Element {
  return (
    <div>
      <PageReorder />
    </div>
  );
}
