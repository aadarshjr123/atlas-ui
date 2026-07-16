import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";

describe("Tooltip", () => {
  it("shows tooltip content on hover", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Info</Button>
          </TooltipTrigger>
          <TooltipContent>More context</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(screen.getByRole("button", { name: "Info" }));

    expect((await screen.findAllByText("More context")).length).toBeGreaterThan(0);
  });

  it("shows tooltip content on keyboard focus", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Info</Button>
          </TooltipTrigger>
          <TooltipContent>More context</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.tab();

    expect(screen.getByRole("button", { name: "Info" })).toHaveFocus();
    expect((await screen.findAllByText("More context")).length).toBeGreaterThan(0);
  });
});
