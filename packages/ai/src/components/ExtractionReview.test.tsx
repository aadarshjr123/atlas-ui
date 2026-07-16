import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExtractionReview } from "./ExtractionReview";

describe("ExtractionReview", () => {
  const fields = [
    { id: "supplier", label: "Supplier", value: "Microsoft", confidence: 98 },
    { id: "amount", label: "Amount", value: "$52,000", confidence: 94 }
  ];

  it("renders title", () => {
    render(<ExtractionReview fields={fields} />);
    expect(screen.getByText("Extraction Review")).toBeInTheDocument();
  });

  it("renders field labels", () => {
    render(<ExtractionReview fields={fields} />);
    expect(screen.getByText("Supplier")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });

  it("renders field values in inputs", () => {
    render(<ExtractionReview fields={fields} />);
    expect(screen.getByDisplayValue("Microsoft")).toBeInTheDocument();
    expect(screen.getByDisplayValue("$52,000")).toBeInTheDocument();
  });

  it("renders confidence values", () => {
    render(<ExtractionReview fields={fields} />);
    expect(screen.getByText("98%")).toBeInTheDocument();
    expect(screen.getByText("94%")).toBeInTheDocument();
  });

  it("renders confirm buttons for each field", () => {
    render(<ExtractionReview fields={fields} />);
    const confirmButtons = screen.getAllByRole("button", { name: /confirm/i });
    expect(confirmButtons).toHaveLength(2);
  });

  it("calls onConfirm with the field when confirm is clicked", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<ExtractionReview fields={fields} onConfirm={onConfirm} />);
    const buttons = screen.getAllByRole("button", { name: /confirm/i });
    await user.click(buttons[0]);
    expect(onConfirm).toHaveBeenCalledWith(fields[0]);
  });
});
