import * as React from "react";
import { cn } from "../lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md border font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-atlas-accent disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && "border-atlas-accent bg-atlas-accent text-white hover:bg-atlas-accentDark",
          variant === "secondary" && "border-atlas-line bg-atlas-panel text-atlas-ink hover:bg-atlas-surface",
          variant === "ghost" && "border-transparent bg-transparent text-atlas-ink hover:bg-atlas-surface",
          variant === "danger" && "border-atlas-danger bg-atlas-danger text-white hover:brightness-95",
          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-11 px-5 text-base",
          size === "icon" && "h-9 w-9 p-0",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
