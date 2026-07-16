import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Content</p></Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("forwards custom className", () => {
    const { container } = render(<Card className="custom"><p>Test</p></Card>);
    expect(container.firstChild).toHaveClass("custom");
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader><span>Header</span></CardHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });
});

describe("CardTitle", () => {
  it("renders as an h3 heading", () => {
    render(<CardTitle>Review</CardTitle>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Review");
  });
});

describe("CardContent", () => {
  it("renders children", () => {
    render(<CardContent><p>Body content</p></CardContent>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });
});

describe("Card composition", () => {
  it("renders a full card with header, title, and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Supplier Review</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the review content.</p>
        </CardContent>
      </Card>
    );
    expect(screen.getByRole("heading", { name: "Supplier Review" })).toBeInTheDocument();
    expect(screen.getByText("This is the review content.")).toBeInTheDocument();
  });
});
