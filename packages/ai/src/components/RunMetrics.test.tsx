import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RunMetrics } from "./RunMetrics";

describe("RunMetrics", () => {
  it("renders model, tokens, latency, and cost", () => {
    render(<RunMetrics model="gpt-5" latencyMs={4100} inputTokens={1000} outputTokens={284} costUsd={0.0042} />);

    expect(screen.getByText("gpt-5")).toBeInTheDocument();
    expect(screen.getByText("1,284")).toBeInTheDocument();
    expect(screen.getByText("$0.0042")).toBeInTheDocument();
  });
});
