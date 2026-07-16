import { useCallback, useState } from "react";

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: Date;
}

export interface UseChatOptions {
  initialMessages?: ChatMessage[];
  onSend?: (message: ChatMessage) => Promise<string> | string;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(options.initialMessages ?? []);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: new Date()
      };

      setMessages((current) => [...current, userMessage]);

      if (!options.onSend) {
        return userMessage;
      }

      setIsLoading(true);
      try {
        const assistantContent = await options.onSend(userMessage);
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: assistantContent,
          createdAt: new Date()
        };
        setMessages((current) => [...current, assistantMessage]);
        return assistantMessage;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const regenerate = useCallback(async () => {
    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!lastUserMessage) return undefined;
    return sendMessage(lastUserMessage.content);
  }, [messages, sendMessage]);

  const reset = useCallback(() => setMessages([]), []);

  return {
    messages,
    setMessages,
    sendMessage,
    regenerate,
    reset,
    isLoading
  };
}
