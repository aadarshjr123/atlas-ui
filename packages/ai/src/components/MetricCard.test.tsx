import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Latency" value="4.1s" />);
    expect(screen.getByText("Latency")).toBeInTheDocument();
    expect(screen.getByText("4.1s")).toBeInTheDocument();
  });

  it("renders detail when provided", () => {
    render(<MetricCard label="Cost" value="$0.0042" detail="Estimated run cost" />);
    expect(screen.getByText("Estimated run cost")).toBeInTheDocument();
  });

  it("does not render detail when not provided", () => {
    const { container } = render(<MetricCard label="Model" value="GPT-5" />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2); // label + value only
  });
});
