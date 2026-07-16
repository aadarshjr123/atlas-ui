import { useCallback, useMemo, useState } from "react";

export type AgentState = "idle" | "generating" | "tool_calling" | "waiting_approval" | "completed" | "failed";

export interface AgentStateEvent {
  state: AgentState;
  label: string;
  createdAt: Date;
}

export function useAgentState(initialState: AgentState = "idle") {
  const [state, setState] = useState<AgentState>(initialState);
  const [history, setHistory] = useState<AgentStateEvent[]>([
    { state: initialState, label: "Initialized", createdAt: new Date() }
  ]);

  const transition = useCallback((nextState: AgentState, label = nextState.replace("_", " ")) => {
    setState(nextState);
    setHistory((current) => [...current, { state: nextState, label, createdAt: new Date() }]);
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setHistory([{ state: "idle", label: "Reset", createdAt: new Date() }]);
  }, []);

  const isBusy = useMemo(() => state === "generating" || state === "tool_calling", [state]);
  const needsHuman = state === "waiting_approval";
  const isTerminal = state === "completed" || state === "failed";

  return { state, history, transition, reset, isBusy, needsHuman, isTerminal };
}
