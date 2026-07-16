import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AtlasDevtools } from "./AtlasDevtools";
import { setAtlasDevtoolsSnapshot } from "../lib/devtools-store";

describe("AtlasDevtools", () => {
  it("renders captured run state", () => {
    setAtlasDevtoolsSnapshot({
      prompt: "Review supplier quote",
      model: "GPT-5",
      latencyMs: 4100,
      inputTokens: 1000,
      outputTokens: 284,
      costUsd: 0.0042,
      agentState: "waiting_approval",
      contextUsed: 1284,
      contextLimit: 8192,
      toolCalls: [{ id: "search", name: "Search records", status: "success" }]
    });

    render(<AtlasDevtools />);

    expect(screen.getByText("Review supplier quote")).toBeInTheDocument();
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
    expect(screen.getByText("Search records")).toBeInTheDocument();
  });
});
