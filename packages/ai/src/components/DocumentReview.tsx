import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, cn } from "@aadarshjr123/atlas-core";

export interface ReviewField {
  id: string;
  label: string;
  extractedValue: string;
  reviewedValue?: string;
  confidence?: number;
}

export interface DocumentReviewProps {
  documentTitle: string;
  documentPreview?: React.ReactNode;
  fields: ReviewField[];
}

export function DocumentReview({ documentTitle, documentPreview, fields }: DocumentReviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Review</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-atlas-line bg-atlas-surface p-4">
          <p className="mb-3 text-sm font-semibold text-atlas-ink">{documentTitle}</p>
          <div className="min-h-52 rounded-md border border-dashed border-atlas-line bg-atlas-panel p-4 text-sm leading-6 text-atlas-muted">
            {documentPreview ?? "Original document preview"}
          </div>
        </section>
        <section className="overflow-hidden rounded-lg border border-atlas-line bg-atlas-panel">
          <div className="grid grid-cols-[1fr_1fr_5rem] border-b border-atlas-line bg-atlas-surface px-3 py-2 text-xs font-semibold uppercase text-atlas-muted">
            <span>Field</span>
            <span>Reviewed value</span>
            <span>Score</span>
          </div>
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_5rem] gap-3 border-b border-atlas-line px-3 py-3 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-atlas-ink">{field.label}</p>
                <p className="text-xs text-atlas-muted">AI: {field.extractedValue}</p>
              </div>
              <p className="text-sm text-atlas-ink">{field.reviewedValue ?? field.extractedValue}</p>
              <p className={cn("text-sm font-medium", (field.confidence ?? 0) >= 85 ? "text-emerald-700" : "text-amber-700")}>
                {field.confidence ?? "-"}%
              </p>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
