import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CostTracker } from "./CostTracker";

describe("CostTracker", () => {
  it("renders formatted cost", () => {
    render(<CostTracker costUsd={0.0042} />);
    expect(screen.getByText("$0.0042")).toBeInTheDocument();
  });

  it("shows budget percentage when budget is provided", () => {
    render(<CostTracker costUsd={0.005} budgetUsd={0.01} />);
    expect(screen.getByText(/50% of \$0\.01 budget/)).toBeInTheDocument();
  });

  it("shows default detail when no budget", () => {
    render(<CostTracker costUsd={0.001} />);
    expect(screen.getByText("Estimated run cost")).toBeInTheDocument();
  });
});
