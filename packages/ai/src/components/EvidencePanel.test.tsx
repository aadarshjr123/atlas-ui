import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EvidencePanel } from "./EvidencePanel";

describe("EvidencePanel", () => {
  const items = [
    {
      id: "policy",
      label: "1",
      title: "Procurement policy",
      description: "Renewal is allowed.",
      source: { title: "Policy", page: 18, excerpt: "Approved vendors may renew." }
    }
  ];

  it("renders default title", () => {
    render(<EvidencePanel items={items} />);
    expect(screen.getByText("Evidence")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<EvidencePanel items={items} title="Supporting Sources" />);
    expect(screen.getByText("Supporting Sources")).toBeInTheDocument();
  });

  it("renders evidence item titles", () => {
    render(<EvidencePanel items={items} />);
    expect(screen.getByText("Procurement policy")).toBeInTheDocument();
  });

  it("renders evidence item descriptions", () => {
    render(<EvidencePanel items={items} />);
    expect(screen.getByText("Renewal is allowed.")).toBeInTheDocument();
  });
});
