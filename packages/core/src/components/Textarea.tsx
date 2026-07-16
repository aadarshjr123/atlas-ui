import * as React from "react";
import { cn } from "../lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-24 w-full resize-y rounded-md border border-atlas-line bg-atlas-panel px-3 py-2 text-sm text-atlas-ink outline-none transition placeholder:text-atlas-muted focus:border-atlas-accent focus:ring-2 focus:ring-atlas-accent/20 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
