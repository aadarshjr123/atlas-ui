import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TokenUsage } from "./TokenUsage";

describe("TokenUsage", () => {
  it("renders total token count", () => {
    render(<TokenUsage inputTokens={1000} outputTokens={284} />);
    expect(screen.getByText("1,284")).toBeInTheDocument();
  });

  it("shows input/output breakdown without context limit", () => {
    render(<TokenUsage inputTokens={1000} outputTokens={284} />);
    expect(screen.getByText("1000 input / 284 output")).toBeInTheDocument();
  });

  it("shows context window percentage when contextLimit is provided", () => {
    render(<TokenUsage inputTokens={1000} outputTokens={284} contextLimit={8192} />);
    expect(screen.getByText(/16% of context window/)).toBeInTheDocument();
  });
});
