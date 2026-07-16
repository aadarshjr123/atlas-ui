import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  className,
  children,
  title,
  description,
  ...props
}: DialogPrimitive.DialogContentProps & { title: string; description?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/30" />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-atlas-line bg-atlas-panel p-5 shadow-md outline-none",
          className
        )}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <DialogPrimitive.Title className="text-base font-semibold text-atlas-ink">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <Button aria-label="Close dialog" size="icon" variant="ghost">
              <X size={16} />
            </Button>
          </DialogPrimitive.Close>
        </div>
        {description ? <DialogPrimitive.Description className="mb-4 text-sm text-atlas-muted">{description}</DialogPrimitive.Description> : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
