/**
 * @module RecentOnboardingHistory
 * @description Expandable quick details for recently onboarded joinees.
 * @author auto
 * @since 1.0.0
 */
"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import previewStyles from "@/app/_styles/HomePreview.module.scss";
import { en } from "@/i18n/en";

type OnboardedPerson = {
  completedOn: string;
  department: string;
  name: string;
  recruiter: string;
  role: string;
};

const people: Array<OnboardedPerson> = [
  {
    completedOn: "May 28, 2026",
    department: "Design",
    name: "Aarav Mehta",
    recruiter: "Maya Rao",
    role: "Product designer",
  },
  {
    completedOn: "May 27, 2026",
    department: "Engineering",
    name: "Priya Nair",
    recruiter: "Maya Rao",
    role: "Software engineer",
  },
  {
    completedOn: "May 26, 2026",
    department: "Finance",
    name: "Rohan Shah",
    recruiter: "Arjun Singh",
    role: "Finance analyst",
  },
];

/**
 * Renders recently onboarded joinees with expandable quick details.
 * @returns History list.
 */
export function RecentOnboardingHistory(): JSX.Element {
  const [selectedName, setSelectedName] = useState<string>();

  return (
    <section className={previewStyles.history} aria-label={en.homeHistoryTitle}>
      <h2 className={previewStyles.historyTitle}>{en.homeHistoryTitle}</h2>
      <div className={previewStyles.historyList}>
        {people.map((person) => {
          const isSelected = person.name === selectedName;
          return (
            <div className={previewStyles.historyItem} key={person.name}>
              <button
                aria-expanded={isSelected}
                className={previewStyles.historyRow}
                onClick={() => setSelectedName(isSelected ? undefined : person.name)}
                type="button"
              >
                <span>
                  <span className={previewStyles.historyName}>{person.name}</span>
                  <span className={previewStyles.historyRole}>{person.role}</span>
                </span>
                <span className={previewStyles.historyMeta}>
                  <span className={previewStyles.historyDate}>
                    {person.completedOn.replace(", 2026", "")}
                  </span>
                  <ChevronDown aria-hidden="true" size={15} />
                </span>
              </button>
              {isSelected ? (
                <div className={previewStyles.quickDetails}>
                  <span>{en.homeHistoryStatus}</span>
                  <strong>{en.homeHistorySigned}</strong>
                  <span>Department</span>
                  <strong>{person.department}</strong>
                  <span>Recruiter</span>
                  <strong>{person.recruiter}</strong>
                  <span>Completed</span>
                  <strong>{person.completedOn}</strong>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
