import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Message } from "./Message";

describe("Message", () => {
  it("renders user message aligned to the right", () => {
    render(<Message role="user">Can we approve this?</Message>);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("data-role", "user");
    expect(screen.getByText("Can we approve this?")).toBeInTheDocument();
  });

  it("renders assistant message with action buttons by default", () => {
    render(<Message role="assistant">Approved with review.</Message>);
    expect(screen.getByText("Approved with review.")).toBeInTheDocument();
    expect(screen.getByLabelText("Copy response")).toBeInTheDocument();
    expect(screen.getByLabelText("Good response")).toBeInTheDocument();
    expect(screen.getByLabelText("Bad response")).toBeInTheDocument();
  });

  it("hides action buttons when actions is false", () => {
    render(<Message role="assistant" actions={false}>No actions</Message>);
    expect(screen.queryByLabelText("Copy response")).not.toBeInTheDocument();
  });

  it("does not show action buttons for user messages", () => {
    render(<Message role="user">Hello</Message>);
    expect(screen.queryByLabelText("Copy response")).not.toBeInTheDocument();
  });

  it("renders system messages", () => {
    render(<Message role="system">System message</Message>);
    expect(screen.getByText("System message")).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveAttribute("data-role", "system");
  });
});
