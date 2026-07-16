import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvalResultCard } from "./EvalResultCard";

describe("EvalResultCard", () => {
  it("renders label and model", () => {
    render(<EvalResultCard label="Approval v3" model="GPT-5" accuracy={92} latencyMs={4100} costUsd={0.0042} />);
    expect(screen.getByText("Approval v3")).toBeInTheDocument();
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
  });

  it("renders accuracy badge with success tone for high accuracy", () => {
    render(<EvalResultCard label="Test" model="GPT-5" accuracy={92} latencyMs={4100} costUsd={0.0042} />);
    expect(screen.getByText("92%")).toBeInTheDocument();
  });

  it("renders formatted latency and cost", () => {
    render(<EvalResultCard label="Test" model="GPT-5" accuracy={92} latencyMs={4100} costUsd={0.0042} />);
    expect(screen.getByText("4.1s")).toBeInTheDocument();
    expect(screen.getByText("$0.0042")).toBeInTheDocument();
  });
});
