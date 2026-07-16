import * as React from "react";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, cn } from "@atlas-ui/core";

export interface MessageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  role: "user" | "assistant" | "system";
  actions?: boolean;
  children?: React.ReactNode;
}

export function Message({ role, actions = true, className, children, ...props }: MessageProps) {
  const isUser = role === "user";

  const renderContent = () => {
    if (typeof children === "string") {
      return (
        <div className={cn("prose prose-sm max-w-none", isUser ? "prose-invert" : "dark:prose-invert")}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
        </div>
      );
    }
    return <div>{children}</div>;
  };

  return (
    <article
      className={cn("flex w-full", isUser ? "justify-end" : "justify-start", className)}
      data-role={role}
      {...props}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-lg border px-4 py-3 text-sm leading-6",
          isUser
            ? "border-atlas-accent bg-atlas-accent text-white"
            : "border-atlas-line bg-atlas-surface text-atlas-ink"
        )}
      >
        {renderContent()}
        {actions && role === "assistant" ? (
          <div className="mt-3 flex items-center gap-1">
            <Button aria-label="Copy response" size="icon" variant="ghost">
              <Copy size={15} />
            </Button>
            <Button aria-label="Good response" size="icon" variant="ghost">
              <ThumbsUp size={15} />
            </Button>
            <Button aria-label="Bad response" size="icon" variant="ghost">
              <ThumbsDown size={15} />
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
