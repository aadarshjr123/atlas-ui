import * as React from "react";
import { cn } from "@atlas-ui/core";

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  detail?: string;
}

export function MetricCard({ label, value, detail, className, ...props }: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-atlas-line bg-atlas-panel p-4", className)} {...props}>
      <p className="text-xs font-medium uppercase text-atlas-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-atlas-ink">{value}</p>
      {detail ? <p className="mt-1 text-sm text-atlas-muted">{detail}</p> : null}
    </div>
  );
}
