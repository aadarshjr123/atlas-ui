import { useMemo } from "react";
import type { AgentState } from "./useAgentState";

export interface WorkflowStepStatus {
  id: string;
  label: string;
  state: AgentState;
}

export function useWorkflowStatus(steps: WorkflowStepStatus[]) {
  const currentStep = useMemo(
    () => steps.find((step) => step.state === "generating" || step.state === "tool_calling" || step.state === "waiting_approval") ?? steps.at(-1) ?? null,
    [steps]
  );

  const completedCount = steps.filter((step) => step.state === "completed").length;
  const failedCount = steps.filter((step) => step.state === "failed").length;
  const progress = steps.length === 0 ? 0 : Math.round((completedCount / steps.length) * 100);

  return {
    currentStep,
    completedCount,
    failedCount,
    progress,
    isComplete: steps.length > 0 && completedCount === steps.length,
    hasFailed: failedCount > 0
  };
}
