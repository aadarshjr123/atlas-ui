import * as React from "react";
import { cn } from "@aadarshjr123/atlas-core";

export interface ChatProps extends React.HTMLAttributes<HTMLDivElement> {
  bottomSlot?: React.ReactNode;
}

export function Chat({ children, bottomSlot, className, ...props }: ChatProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <section
      aria-label="AI chat"
      className={cn("flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-atlas-line bg-atlas-panel", className)}
      {...props}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {children}
      </div>
      {bottomSlot && (
        <div className="border-t border-atlas-line bg-atlas-surface/50 p-3">
          {bottomSlot}
        </div>
      )}
    </section>
  );
}

