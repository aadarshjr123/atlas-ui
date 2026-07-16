import * as React from "react";
import { cn } from "../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success" | "warning" | "danger";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        tone === "neutral" && "border-atlas-line bg-atlas-panel text-atlas-muted",
        tone === "success" && "border-atlas-accent/20 bg-atlas-accent/10 text-atlas-accent",
        tone === "warning" && "border-atlas-warn/20 bg-atlas-warn/10 text-atlas-warn",
        tone === "danger" && "border-atlas-danger/20 bg-atlas-danger/10 text-atlas-danger",
        className
      )}
      {...props}
    />
  );
}
