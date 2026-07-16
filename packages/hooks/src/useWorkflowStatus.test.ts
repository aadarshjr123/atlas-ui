import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useWorkflowStatus } from "./useWorkflowStatus";

describe("useWorkflowStatus", () => {
  it("returns 0 progress for empty steps", () => {
    const { result } = renderHook(() => useWorkflowStatus([]));
    expect(result.current.progress).toBe(0);
    expect(result.current.isComplete).toBe(false);
  });

  it("calculates progress from completed steps", () => {
    const steps = [
      { id: "1", label: "Extract", state: "completed" as const },
      { id: "2", label: "Review", state: "generating" as const },
      { id: "3", label: "Approve", state: "idle" as const }
    ];
    const { result } = renderHook(() => useWorkflowStatus(steps));
    expect(result.current.progress).toBe(33);
    expect(result.current.completedCount).toBe(1);
  });

  it("identifies current active step", () => {
    const steps = [
      { id: "1", label: "Extract", state: "completed" as const },
      { id: "2", label: "Review", state: "waiting_approval" as const },
      { id: "3", label: "Approve", state: "idle" as const }
    ];
    const { result } = renderHook(() => useWorkflowStatus(steps));
    expect(result.current.currentStep?.id).toBe("2");
  });

  it("reports complete when all steps done", () => {
    const steps = [
      { id: "1", label: "Extract", state: "completed" as const },
      { id: "2", label: "Review", state: "completed" as const }
    ];
    const { result } = renderHook(() => useWorkflowStatus(steps));
    expect(result.current.isComplete).toBe(true);
    expect(result.current.progress).toBe(100);
  });

  it("reports failure", () => {
    const steps = [
      { id: "1", label: "Extract", state: "completed" as const },
      { id: "2", label: "Review", state: "failed" as const }
    ];
    const { result } = renderHook(() => useWorkflowStatus(steps));
    expect(result.current.hasFailed).toBe(true);
    expect(result.current.failedCount).toBe(1);
  });
});
