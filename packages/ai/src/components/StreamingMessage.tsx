import { Message } from "./Message";

export interface StreamingMessageProps {
  content: string;
  isStreaming?: boolean;
}

export function StreamingMessage({ content, isStreaming = false }: StreamingMessageProps) {
  // We append the streaming cursor to the markdown string so it gets rendered nicely.
  // Using a block element if it's the end of a line, or just an inline marker.
  const cursor = isStreaming ? " ▍" : "";
  
  return (
    <Message author="assistant">
      {content + cursor}
    </Message>
  );
}
