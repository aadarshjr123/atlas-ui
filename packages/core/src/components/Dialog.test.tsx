import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog";

describe("Dialog", () => {
  it("opens with keyboard focusable content and closes from the close button", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open review</Button>
        </DialogTrigger>
        <DialogContent title="Review quote" description="Review quote details">
          <p>Approval details</p>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open review" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Approval details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Close dialog" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open review" })).toHaveFocus();
  });

  it("traps focus and closes with Escape", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open review</Button>
        </DialogTrigger>
        <DialogContent title="Review quote" description="Review quote details">
          <Button>Approve</Button>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open review" }));
    await user.tab();

    expect(screen.getByRole("button", { name: "Approve" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open review" })).toHaveFocus();
  });
});
