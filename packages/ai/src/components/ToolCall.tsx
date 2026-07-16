import { CheckCircle2, CircleAlert, Clock, Loader2 } from "lucide-react";
import { Badge, cn } from "@atlas-ui/core";

export type ToolCallStatus = "idle" | "running" | "success" | "error";

export interface ToolCallProps {
  name: string;
  status: ToolCallStatus;
  durationMs?: number;
  resultSummary?: string;
  className?: string;
}

const statusIcon = {
  idle: Clock,
  running: Loader2,
  success: CheckCircle2,
  error: CircleAlert
};

export function ToolCall({ name, status, durationMs, resultSummary, className }: ToolCallProps) {
  const Icon = statusIcon[status];
  const tone = status === "success" ? "success" : status === "error" ? "danger" : status === "running" ? "warning" : "neutral";

  return (
    <div className={cn("rounded-lg border border-atlas-line bg-atlas-panel p-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className={cn("shrink-0", status === "running" && "animate-spin")} size={17} />
          <span className="truncate text-sm font-medium text-atlas-ink">{name}</span>
        </div>
        <Badge tone={tone}>{status}</Badge>
      </div>
      {durationMs || resultSummary ? (
        <div className="mt-2 text-xs text-atlas-muted">
          {durationMs ? <span>{durationMs}ms</span> : null}
          {durationMs && resultSummary ? <span> · </span> : null}
          {resultSummary ? <span>{resultSummary}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
