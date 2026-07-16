import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ModelComparison } from "./ModelComparison";

describe("ModelComparison", () => {
  it("renders a card for each result", () => {
    const results = [
      { label: "Approval v3", model: "GPT-5", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
      { label: "Approval v3", model: "Claude", accuracy: 89, latencyMs: 4600, costUsd: 0.0039 }
    ];
    render(<ModelComparison results={results} />);
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("renders section with aria-label", () => {
    render(<ModelComparison results={[]} />);
    expect(screen.getByRole("region", { name: "Model comparison" })).toBeInTheDocument();
  });
});
