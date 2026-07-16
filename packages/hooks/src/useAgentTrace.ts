import { useCallback, useState } from "react";

export type TraceStatus = "idle" | "running" | "success" | "error";

export interface TraceStep {
  id: string;
  title: string;
  description?: string;
  status: TraceStatus;
  durationMs?: number;
}

export function useAgentTrace(initialSteps: TraceStep[] = []) {
  const [trace, setTrace] = useState<TraceStep[]>(initialSteps);

  const addStep = useCallback((step: TraceStep) => {
    setTrace((current) => [...current, step]);
  }, []);

  const updateStep = useCallback((id: string, update: Partial<TraceStep>) => {
    setTrace((current) => current.map((step) => (step.id === id ? { ...step, ...update } : step)));
  }, []);

  const resetTrace = useCallback(() => setTrace([]), []);

  return { trace, setTrace, addStep, updateStep, resetTrace };
}
