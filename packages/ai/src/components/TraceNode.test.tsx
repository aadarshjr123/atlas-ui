import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TraceNode } from "./TraceNode";

describe("TraceNode", () => {
  it("renders title", () => {
    render(<TraceNode title="Search records" status="success" />);
    expect(screen.getByText("Search records")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<TraceNode title="Search" status="success" description="Found 12 records." />);
    expect(screen.getByText("Found 12 records.")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<TraceNode title="Search" status="running" />);
    expect(screen.getByText("running")).toBeInTheDocument();
  });

  it("renders duration when provided", () => {
    render(<TraceNode title="Search" status="success" durationMs={430} />);
    expect(screen.getByText("430ms")).toBeInTheDocument();
  });

  it("does not render duration when not provided", () => {
    render(<TraceNode title="Search" status="idle" />);
    expect(screen.queryByText(/ms/)).not.toBeInTheDocument();
  });
});
