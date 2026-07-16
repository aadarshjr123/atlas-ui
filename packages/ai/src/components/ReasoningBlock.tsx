import * as React from "react";
import { Brain } from "lucide-react";
import { cn } from "@aadarshjr123/atlas-core";

export interface ReasoningBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export function ReasoningBlock({ title = "Reasoning", className, children, ...props }: ReasoningBlockProps) {
  return (
    <section className={cn("rounded-lg border border-atlas-line bg-atlas-panel p-4", className)} {...props}>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-atlas-ink">
        <Brain size={16} />
        {title}
      </div>
      <div className="text-sm leading-6 text-atlas-muted">{children}</div>
    </section>
  );
}
