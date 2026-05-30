/**
 * @module DocumentBuilder
 * @description Recruiter workflow for document template creation.
 * @author auto
 * @since 1.0.0
 */
"use client";

import { StepChecklist } from "./StepChecklist";
import { StepFormBuilder } from "./StepFormBuilder";
import { StepPDFConsolidate } from "./StepPDFConsolidate";
import { en } from "@/i18n/en";

/**
 * Renders the template builder.
 * @returns Document builder component.
 */
export function DocumentBuilder(): JSX.Element {
  return (
    <section className="app-card stack-md">
      <div className="app-card__heading">
        <span>Template studio</span>
        <h2>{en.documentBuilder}</h2>
      </div>
      <StepChecklist />
      <StepFormBuilder />
      <StepPDFConsolidate />
    </section>
  );
}
