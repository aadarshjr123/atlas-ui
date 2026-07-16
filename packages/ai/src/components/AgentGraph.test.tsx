import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AgentGraph } from "./AgentGraph";

describe("AgentGraph", () => {
  const nodes = [
    { id: "research", label: "Research Agent", role: "Finds evidence" },
    { id: "analysis", label: "Analysis Agent", role: "Checks risk" },
    { id: "approval", label: "Approval Agent" }
  ];
  const edges = [
    { from: "research", to: "analysis" },
    { from: "analysis", to: "approval" }
  ];

  it("renders all node labels", () => {
    render(<AgentGraph nodes={nodes} edges={edges} />);
    expect(screen.getByText("Research Agent")).toBeInTheDocument();
    expect(screen.getByText("Analysis Agent")).toBeInTheDocument();
    expect(screen.getByText("Approval Agent")).toBeInTheDocument();
  });

  it("renders node roles when provided", () => {
    render(<AgentGraph nodes={nodes} edges={edges} />);
    expect(screen.getByText("Finds evidence")).toBeInTheDocument();
    expect(screen.getByText("Checks risk")).toBeInTheDocument();
  });

  it("renders section with aria-label", () => {
    render(<AgentGraph nodes={nodes} edges={edges} />);
    expect(screen.getByRole("region", { name: "Agent graph" })).toBeInTheDocument();
  });
});
