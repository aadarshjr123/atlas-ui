import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chat } from "./Chat";

describe("Chat", () => {
  it("renders a section with aria-label", () => {
    render(<Chat>messages</Chat>);
    expect(screen.getByRole("region", { name: "AI chat" })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Chat><p>Hello</p></Chat>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("forwards custom className", () => {
    const { container } = render(<Chat className="extra">content</Chat>);
    expect(container.querySelector("section")).toHaveClass("extra");
  });
});
