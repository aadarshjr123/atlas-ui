import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with text content", () => {
    render(<Badge>High confidence</Badge>);
    expect(screen.getByText("High confidence")).toBeInTheDocument();
  });

  it("defaults to neutral tone", () => {
    const { container } = render(<Badge>Queued</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("border-atlas-line");
  });

  it("applies success tone classes", () => {
    const { container } = render(<Badge tone="success">Approved</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-atlas-accent/10");
  });

  it("applies warning tone classes", () => {
    const { container } = render(<Badge tone="warning">Needs review</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-atlas-warn/10");
  });

  it("applies danger tone classes", () => {
    const { container } = render(<Badge tone="danger">Blocked</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-atlas-danger/10");
  });

  it("forwards custom className", () => {
    const { container } = render(<Badge className="extra">Test</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("extra");
  });
});
