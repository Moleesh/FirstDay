/**
 * @module StepFormBuilder
 * @description Form field builder step for document templates.
 * @author auto
 * @since 1.0.0
 */
import { AIExtractStatus } from "./AIExtractStatus";
import { FieldCard } from "./FieldCard";
import { ManualFieldForm } from "./ManualFieldForm";

export function StepFormBuilder(): JSX.Element {
  return (
    <div className="stack-sm">
      <AIExtractStatus />
      <FieldCard />
      <ManualFieldForm />
    </div>
  );
}
