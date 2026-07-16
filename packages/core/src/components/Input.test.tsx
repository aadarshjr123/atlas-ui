import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input aria-label="Test input" />);
    expect(screen.getByRole("textbox", { name: "Test input" })).toBeInTheDocument();
  });

  it("applies placeholder text", () => {
    render(<Input placeholder="Search tools..." aria-label="Search" />);
    expect(screen.getByPlaceholderText("Search tools...")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(<Input disabled aria-label="Disabled" />);
    expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await user.type(input, "Atlas");
    expect(input).toHaveValue("Atlas");
  });

  it("forwards custom className", () => {
    render(<Input className="custom-class" aria-label="Custom" />);
    expect(screen.getByRole("textbox", { name: "Custom" })).toHaveClass("custom-class");
  });
});
