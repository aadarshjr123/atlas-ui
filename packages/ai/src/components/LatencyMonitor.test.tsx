import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LatencyMonitor } from "./LatencyMonitor";

describe("LatencyMonitor", () => {
  it("renders latency in seconds", () => {
    render(<LatencyMonitor latencyMs={4100} />);
    expect(screen.getByText("4.1s")).toBeInTheDocument();
  });

  it("shows fast response for low latency", () => {
    render(<LatencyMonitor latencyMs={800} />);
    expect(screen.getByText("Fast response")).toBeInTheDocument();
  });

  it("shows normal response for medium latency", () => {
    render(<LatencyMonitor latencyMs={3000} />);
    expect(screen.getByText("Normal response")).toBeInTheDocument();
  });

  it("shows slow response for high latency", () => {
    render(<LatencyMonitor latencyMs={8000} />);
    expect(screen.getByText("Slow response")).toBeInTheDocument();
  });
});
