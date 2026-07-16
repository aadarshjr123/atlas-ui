import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfidenceScore } from "./ConfidenceScore";

describe("ConfidenceScore", () => {
  it("renders the confidence value and label", () => {
    render(<ConfidenceScore value={94} />);
    expect(screen.getByText("94%")).toBeInTheDocument();
    expect(screen.getByText("High confidence")).toBeInTheDocument();
  });
});
