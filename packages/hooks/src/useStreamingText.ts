import { useEffect, useState } from "react";

export interface UseStreamingTextOptions {
  text: string;
  enabled?: boolean;
  intervalMs?: number;
}

export function useStreamingText({ text, enabled = true, intervalMs = 18 }: UseStreamingTextOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(enabled && text.length > 0);

  useEffect(() => {
    if (!enabled) return;

    let index = 0;
    const resetTimer = window.setTimeout(() => {
      setDisplayedText("");
      setIsStreaming(text.length > 0);
    }, 0);

    if (text.length === 0) {
      return () => window.clearTimeout(resetTimer);
    }

    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
        setIsStreaming(false);
      }
    }, intervalMs);

    return () => {
      window.clearTimeout(resetTimer);
      window.clearInterval(timer);
    };
  }, [enabled, intervalMs, text]);

  return {
    displayedText: enabled ? displayedText : text,
    isStreaming: enabled ? isStreaming : false
  };
}
