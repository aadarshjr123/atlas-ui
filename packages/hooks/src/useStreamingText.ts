import { useEffect, useState } from "react";

export interface UseStreamingTextOptions {
  text: string;
  enabled?: boolean;
  intervalMs?: number;
}

export function useStreamingText({ text, enabled = true, intervalMs = 18 }: UseStreamingTextOptions) {
  const [displayedText, setDisplayedText] = useState(enabled ? "" : text);
  const [isStreaming, setIsStreaming] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsStreaming(false);
      return;
    }

    setDisplayedText("");
    setIsStreaming(true);
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
        setIsStreaming(false);
      }
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [enabled, intervalMs, text]);

  return { displayedText, isStreaming };
}
