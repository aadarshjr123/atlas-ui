import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AgentTrace } from "./AgentTrace";

describe("AgentTrace", () => {
  it("supports replay controls and observability details", async () => {
    const user = userEvent.setup();

    render(
      <AgentTrace
        replayable
        showTiming
        showTokens
        showCosts
        trace={[
          { id: "one", title: "Search", status: "success", durationMs: 250, inputTokens: 10, outputTokens: 5, costUsd: 0.001 }
        ]}
      />
    );

    expect(screen.getByRole("button", { name: /Replay/i })).toBeInTheDocument();
    expect(screen.getByText("250ms")).toBeInTheDocument();
    expect(screen.getByText("$0.0010")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(screen.getByText("Search")).toBeInTheDocument();
  });
});
