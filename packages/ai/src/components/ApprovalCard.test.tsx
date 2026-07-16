import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApprovalCard } from "./ApprovalCard";

describe("ApprovalCard", () => {
  it("renders title", () => {
    render(<ApprovalCard title="Approve refund" />);
    expect(screen.getByText("Approve refund")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<ApprovalCard title="Approve" description="Customer meets refund policy." />);
    expect(screen.getByText("Customer meets refund policy.")).toBeInTheDocument();
  });

  it("renders amount when provided", () => {
    render(<ApprovalCard title="Approve" amount="$4,500" />);
    expect(screen.getByText("$4,500")).toBeInTheDocument();
  });

  it("renders approve, reject, and edit buttons", () => {
    render(<ApprovalCard title="Test" />);
    expect(screen.getByRole("button", { name: /approve/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reject/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("calls onApprove when approve is clicked", async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    render(<ApprovalCard title="Test" onApprove={onApprove} />);
    await user.click(screen.getByRole("button", { name: /approve/i }));
    expect(onApprove).toHaveBeenCalledOnce();
  });

  it("calls onReject when reject is clicked", async () => {
    const user = userEvent.setup();
    const onReject = vi.fn();
    render(<ApprovalCard title="Test" onReject={onReject} />);
    await user.click(screen.getByRole("button", { name: /reject/i }));
    expect(onReject).toHaveBeenCalledOnce();
  });

  it("calls onEdit when edit is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(<ApprovalCard title="Test" onEdit={onEdit} />);
    await user.click(screen.getByRole("button", { name: /edit/i }));
    expect(onEdit).toHaveBeenCalledOnce();
  });
});
