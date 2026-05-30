/**
 * @module RecentOnboardingHistoryTests
 * @description Component tests for recently onboarded quick details.
 * @author auto
 * @since 1.0.0
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RecentOnboardingHistory } from "../index";

describe("RecentOnboardingHistory", () => {
  it("toggles quick details for an onboarded person", async () => {
    render(<RecentOnboardingHistory />);

    const person = screen.getByRole("button", { name: /Aarav Mehta/ });
    await userEvent.click(person);

    expect(person).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Signed and complete")).toBeInTheDocument();
    expect(screen.getByText("Maya Rao")).toBeInTheDocument();

    await userEvent.click(person);
    expect(person).toHaveAttribute("aria-expanded", "false");
  });
});
