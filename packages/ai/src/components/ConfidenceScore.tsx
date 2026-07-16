import { Badge, cn } from "@aadarshjr123/atlas-core";

export interface ConfidenceScoreProps {
  value: number;
  className?: string;
}

export function ConfidenceScore({ value, className }: ConfidenceScoreProps) {
  const normalized = Math.max(0, Math.min(100, value));
  const label = normalized >= 85 ? "High confidence" : normalized >= 60 ? "Review recommended" : "Low confidence";
  const tone = normalized >= 85 ? "success" : normalized >= 60 ? "warning" : "danger";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-atlas-ink">Confidence</span>
        <Badge tone={tone}>{label}</Badge>
      </div>
      <div className="h-2 rounded-full bg-atlas-line">
        <div className="h-2 rounded-full bg-atlas-accent" style={{ width: `${normalized}%` }} />
      </div>
      <p className="text-xs text-atlas-muted">{normalized}%</p>
    </div>
  );
}
