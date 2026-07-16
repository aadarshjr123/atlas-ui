import { Badge, Card, CardContent } from "@atlas-ui/core";

export interface EvalResultCardProps {
  label: string;
  model: string;
  accuracy: number;
  latencyMs: number;
  costUsd: number;
}

export function EvalResultCard({ label, model, accuracy, latencyMs, costUsd }: EvalResultCardProps) {
  const tone = accuracy >= 90 ? "success" : accuracy >= 80 ? "warning" : "danger";

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-atlas-ink">{label}</p>
            <p className="text-sm text-atlas-muted">{model}</p>
          </div>
          <Badge tone={tone}>{accuracy}%</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md bg-atlas-surface p-2">
            <p className="text-xs text-atlas-muted">Latency</p>
            <p className="font-semibold text-atlas-ink">{(latencyMs / 1000).toFixed(1)}s</p>
          </div>
          <div className="rounded-md bg-atlas-surface p-2">
            <p className="text-xs text-atlas-muted">Cost</p>
            <p className="font-semibold text-atlas-ink">${costUsd.toFixed(4)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
