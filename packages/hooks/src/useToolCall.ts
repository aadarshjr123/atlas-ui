import { useCallback, useMemo, useState } from "react";

export type ToolCallState = "idle" | "running" | "success" | "error";

export interface ToolCallRecord {
  id: string;
  name: string;
  status: ToolCallState;
  startedAt?: Date;
  completedAt?: Date;
  durationMs?: number;
  resultSummary?: string;
  errorMessage?: string;
}

export function useToolCall(initialToolCalls: ToolCallRecord[] = []) {
  const [toolCalls, setToolCalls] = useState<ToolCallRecord[]>(initialToolCalls);

  const startToolCall = useCallback((id: string, name: string) => {
    setToolCalls((current) => [
      ...current,
      {
        id,
        name,
        status: "running",
        startedAt: new Date()
      }
    ]);
  }, []);

  const finishToolCall = useCallback((id: string, resultSummary?: string) => {
    setToolCalls((current) =>
      current.map((toolCall) => {
        if (toolCall.id !== id) return toolCall;
        const completedAt = new Date();
        const durationMs = toolCall.startedAt ? completedAt.getTime() - toolCall.startedAt.getTime() : undefined;
        return { ...toolCall, status: "success", completedAt, durationMs, resultSummary };
      })
    );
  }, []);

  const failToolCall = useCallback((id: string, errorMessage?: string) => {
    setToolCalls((current) =>
      current.map((toolCall) => {
        if (toolCall.id !== id) return toolCall;
        const completedAt = new Date();
        const durationMs = toolCall.startedAt ? completedAt.getTime() - toolCall.startedAt.getTime() : undefined;
        return { ...toolCall, status: "error", completedAt, durationMs, errorMessage };
      })
    );
  }, []);

  const runningToolCalls = useMemo(() => toolCalls.filter((toolCall) => toolCall.status === "running"), [toolCalls]);

  return { toolCalls, runningToolCalls, setToolCalls, startToolCall, finishToolCall, failToolCall };
}
