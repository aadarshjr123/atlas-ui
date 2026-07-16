import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: TabsPrimitive.TabsListProps) {
  return <TabsPrimitive.List className={cn("inline-flex rounded-md border border-atlas-line bg-atlas-panel p-1", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "rounded px-3 py-1.5 text-sm text-atlas-muted outline-none transition data-[state=active]:bg-atlas-surface data-[state=active]:text-atlas-ink focus-visible:ring-2 focus-visible:ring-atlas-accent",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: TabsPrimitive.TabsContentProps) {
  return <TabsPrimitive.Content className={cn("mt-3 outline-none", className)} {...props} />;
}
