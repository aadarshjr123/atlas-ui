import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AgentNetwork } from "./AgentNetwork";

describe("AgentNetwork", () => {
  it("renders as an AgentGraph (delegates rendering)", () => {
    const nodes = [{ id: "a", label: "Agent A" }];
    const edges: { from: string; to: string }[] = [];
    render(<AgentNetwork nodes={nodes} edges={edges} />);
    expect(screen.getByText("Agent A")).toBeInTheDocument();
  });
});
