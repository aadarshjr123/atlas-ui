import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea aria-label="Note" />);
    expect(screen.getByRole("textbox", { name: "Note" })).toBeInTheDocument();
  });

  it("applies placeholder text", () => {
    render(<Textarea placeholder="Write a note..." aria-label="Note" />);
    expect(screen.getByPlaceholderText("Write a note...")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Textarea disabled aria-label="Disabled" />);
    expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Content" />);
    const textarea = screen.getByRole("textbox", { name: "Content" });
    await user.type(textarea, "Review notes here");
    expect(textarea).toHaveValue("Review notes here");
  });

  it("forwards custom className", () => {
    render(<Textarea className="custom-class" aria-label="Custom" />);
    expect(screen.getByRole("textbox", { name: "Custom" })).toHaveClass("custom-class");
  });
});
