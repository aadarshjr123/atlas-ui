import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TraceTimeline } from "./TraceTimeline";

describe("TraceTimeline", () => {
  const steps = [
    { id: "1", title: "Retrieve policy", status: "success" as const },
    { id: "2", title: "Extract fields", status: "running" as const }
  ];

  it("renders an ordered list with aria-label", () => {
    render(<TraceTimeline steps={steps} />);
    expect(screen.getByRole("list", { name: "Trace timeline" })).toBeInTheDocument();
  });

  it("renders all step titles", () => {
    render(<TraceTimeline steps={steps} />);
    expect(screen.getByText("Retrieve policy")).toBeInTheDocument();
    expect(screen.getByText("Extract fields")).toBeInTheDocument();
  });

  it("renders list items for each step", () => {
    render(<TraceTimeline steps={steps} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
