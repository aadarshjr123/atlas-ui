import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PromptPlayground } from "./PromptPlayground";

describe("PromptPlayground", () => {
  it("renders title", () => {
    render(<PromptPlayground />);
    expect(screen.getByText("Prompt Playground")).toBeInTheDocument();
  });

  it("renders initial prompt in textarea", () => {
    render(<PromptPlayground initialPrompt="Review this quote." />);
    expect(screen.getByDisplayValue("Review this quote.")).toBeInTheDocument();
  });

  it("renders response text", () => {
    render(<PromptPlayground response="Approved after review." />);
    expect(screen.getByText("Approved after review.")).toBeInTheDocument();
  });

  it("renders metrics when provided", () => {
    const metrics = [{ label: "Latency", value: "4.1s" }, { label: "Tokens", value: "1,284" }];
    render(<PromptPlayground metrics={metrics} />);
    expect(screen.getByText("Latency")).toBeInTheDocument();
    expect(screen.getByText("4.1s")).toBeInTheDocument();
  });

  it("calls onRun with current prompt when Run is clicked", async () => {
    const user = userEvent.setup();
    const onRun = vi.fn();
    render(<PromptPlayground initialPrompt="Test prompt" onRun={onRun} />);
    await user.click(screen.getByRole("button", { name: /run/i }));
    expect(onRun).toHaveBeenCalledWith("Test prompt");
  });
});
