import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@atlas-ui/core";

export interface ExtractionField {
  id: string;
  label: string;
  value: string;
  confidence?: number;
}

export interface ExtractionReviewProps {
  fields: ExtractionField[];
  onConfirm?: (field: ExtractionField) => void;
  onChange?: (id: string, value: string) => void;
}

export function ExtractionReview({ fields, onConfirm, onChange }: ExtractionReviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extraction Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {fields.map((field) => (
          <div key={field.id} className="grid gap-2 rounded-lg border border-atlas-line bg-atlas-panel p-3 md:grid-cols-[10rem_1fr_5rem_auto] md:items-center">
            <label className="text-sm font-medium text-atlas-ink" htmlFor={`field-${field.id}`}>
              {field.label}
            </label>
            <Input id={`field-${field.id}`} value={field.value} onChange={(event) => onChange?.(field.id, event.target.value)} />
            <span className="text-sm text-atlas-muted">{field.confidence ?? "-"}%</span>
            <Button variant="secondary" onClick={() => onConfirm?.(field)}>
              Confirm
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
