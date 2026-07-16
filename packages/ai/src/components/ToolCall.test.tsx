import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToolCall } from "./ToolCall";

describe("ToolCall", () => {
  it("renders tool name", () => {
    render(<ToolCall name="Search records" status="idle" />);
    expect(screen.getByText("Search records")).toBeInTheDocument();
  });

  it("shows status badge", () => {
    render(<ToolCall name="Search" status="success" />);
    expect(screen.getByText("success")).toBeInTheDocument();
  });

  it("shows duration when provided", () => {
    render(<ToolCall name="Search" status="success" durationMs={430} />);
    expect(screen.getByText("430ms")).toBeInTheDocument();
  });

  it("shows result summary when provided", () => {
    render(<ToolCall name="Search" status="success" resultSummary="12 records" />);
    expect(screen.getByText("12 records")).toBeInTheDocument();
  });

  it("shows both duration and result summary separated", () => {
    render(<ToolCall name="Search" status="success" durationMs={430} resultSummary="12 records" />);
    expect(screen.getByText("430ms")).toBeInTheDocument();
    expect(screen.getByText("12 records")).toBeInTheDocument();
  });

  it("renders all status types", () => {
    const statuses = ["idle", "running", "success", "error"] as const;
    statuses.forEach((status) => {
      const { unmount } = render(<ToolCall name="Test" status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });
});
