import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReasoningBlock } from "./ReasoningBlock";

describe("ReasoningBlock", () => {
  it("renders default title", () => {
    render(<ReasoningBlock>Some reasoning</ReasoningBlock>);
    expect(screen.getByText("Reasoning")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<ReasoningBlock title="AI Rationale">Content</ReasoningBlock>);
    expect(screen.getByText("AI Rationale")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<ReasoningBlock>Approval is recommended because the quote matches.</ReasoningBlock>);
    expect(screen.getByText("Approval is recommended because the quote matches.")).toBeInTheDocument();
  });
});
