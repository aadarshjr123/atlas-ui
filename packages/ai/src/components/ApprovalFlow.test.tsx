import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApprovalFlow } from "./ApprovalFlow";

describe("ApprovalFlow", () => {
  it("renders approval steps and calls approve handler", async () => {
    const onApprove = vi.fn();
    const user = userEvent.setup();

    render(
      <ApprovalFlow
        title="Approve quote"
        amount="$52,000"
        onApprove={onApprove}
        steps={[
          { id: "extract", label: "Extract", status: "complete" },
          { id: "review", label: "Review", status: "current" }
        ]}
      />
    );

    expect(screen.getByText("Extract")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Approve/i }));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });
});
