import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DocumentReview } from "./DocumentReview";

describe("DocumentReview", () => {
  it("renders extracted document fields", () => {
    render(
      <DocumentReview
        documentTitle="Invoice.pdf"
        fields={[{ id: "amount", label: "Amount", extractedValue: "$52,000", confidence: 94 }]}
      />
    );

    expect(screen.getByText("Invoice.pdf")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
  });
});
