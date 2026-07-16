import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvaluationTable } from "./EvaluationTable";

describe("EvaluationTable", () => {
  const rows = [
    { id: "gpt-5", model: "GPT-5", prompt: "Approval v3", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
    { id: "claude", model: "Claude", prompt: "Approval v3", accuracy: 89, latencyMs: 4600, costUsd: 0.0039 }
  ];

  it("renders table headers", () => {
    render(<EvaluationTable rows={rows} />);
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Prompt")).toBeInTheDocument();
    expect(screen.getByText("Accuracy")).toBeInTheDocument();
    expect(screen.getByText("Latency")).toBeInTheDocument();
    expect(screen.getByText("Cost")).toBeInTheDocument();
  });

  it("renders model names", () => {
    render(<EvaluationTable rows={rows} />);
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("renders accuracy percentages", () => {
    render(<EvaluationTable rows={rows} />);
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("89%")).toBeInTheDocument();
  });

  it("renders formatted latency", () => {
    render(<EvaluationTable rows={rows} />);
    expect(screen.getByText("4.1s")).toBeInTheDocument();
    expect(screen.getByText("4.6s")).toBeInTheDocument();
  });

  it("renders formatted cost", () => {
    render(<EvaluationTable rows={rows} />);
    expect(screen.getByText("$0.0042")).toBeInTheDocument();
    expect(screen.getByText("$0.0039")).toBeInTheDocument();
  });
});
