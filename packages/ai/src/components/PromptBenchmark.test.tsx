import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PromptBenchmark } from "./PromptBenchmark";

describe("PromptBenchmark", () => {
  const results = [
    { id: "gpt-5", model: "GPT-5", prompt: "Approval v3", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
    { id: "claude", model: "Claude", prompt: "Approval v3", accuracy: 89, latencyMs: 4600, costUsd: 0.0039 }
  ];

  it("renders section with aria-label", () => {
    render(<PromptBenchmark results={results} />);
    expect(screen.getByRole("region", { name: "Prompt benchmark" })).toBeInTheDocument();
  });

  it("renders model comparison cards", () => {
    render(<PromptBenchmark results={results} />);
    // Models appear in both the cards and the table
    expect(screen.getAllByText("GPT-5").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Claude").length).toBeGreaterThanOrEqual(1);
  });

  it("renders evaluation table", () => {
    render(<PromptBenchmark results={results} />);
    // Accuracy appears in both cards and table
    expect(screen.getAllByText("92%").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("89%").length).toBeGreaterThanOrEqual(1);
  });
});
