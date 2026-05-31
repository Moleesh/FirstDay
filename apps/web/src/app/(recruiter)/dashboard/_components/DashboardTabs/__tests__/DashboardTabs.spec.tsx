/**
 * @module DashboardTabsTests
 * @description Verifies recruiter workspace tab switching.
 */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardTabs } from "../index";

describe("DashboardTabs", () => {
  it("switches between document and joinee workspaces", () => {
    render(<DashboardTabs />);

    expect(screen.getByRole("heading", { name: "Document builder" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Joinee workspace" }));
    expect(screen.getByRole("heading", { name: "Joinee workspace" })).toBeInTheDocument();
  });

  it("allows an admin to add a recruiter invite", () => {
    render(<DashboardTabs />);

    fireEvent.click(screen.getByRole("tab", { name: "Recruiter admin" }));
    fireEvent.change(screen.getByLabelText("Recruiter name"), { target: { value: "Maya Rao" } });
    fireEvent.change(screen.getByLabelText("Recruiter email"), {
      target: { value: "maya@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add recruiter" }));

    expect(screen.getByText("Maya Rao")).toBeInTheDocument();
    expect(screen.getByText("maya@example.com")).toBeInTheDocument();
  });

  it("offers joinee pack downloads and a welcome link", () => {
    render(<DashboardTabs />);

    fireEvent.click(screen.getByRole("tab", { name: "Joinee workspace" }));
    expect(screen.getByRole("button", { name: "Unsigned PDF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signed PDF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy welcome link" })).toBeInTheDocument();
  });
});
