import { CheckCircle2, CircleAlert, Clock, Loader2 } from "lucide-react";
import { Badge, cn } from "@atlas-ui/core";

export type TraceNodeStatus = "idle" | "running" | "success" | "error";

export interface TraceNodeProps {
  title: string;
  description?: string;
  status: TraceNodeStatus;
  durationMs?: number;
  className?: string;
}

const icons = {
  idle: Clock,
  running: Loader2,
  success: CheckCircle2,
  error: CircleAlert
};

export function TraceNode({ title, description, status, durationMs, className }: TraceNodeProps) {
  const Icon = icons[status];
  const tone = status === "success" ? "success" : status === "error" ? "danger" : status === "running" ? "warning" : "neutral";

  return (
    <article className={cn("rounded-lg border border-atlas-line bg-atlas-panel p-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <Icon className={cn("mt-0.5 shrink-0", status === "running" && "animate-spin")} size={16} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-atlas-ink">{title}</p>
            {description ? <p className="mt-1 text-sm text-atlas-muted">{description}</p> : null}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {durationMs ? <span className="text-xs text-atlas-muted">{durationMs}ms</span> : null}
          <Badge tone={tone}>{status}</Badge>
        </div>
      </div>
    </article>
  );
}
