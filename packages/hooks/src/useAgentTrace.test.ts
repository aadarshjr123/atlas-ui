import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAgentTrace } from "./useAgentTrace";

describe("useAgentTrace", () => {
  it("initializes with empty trace by default", () => {
    const { result } = renderHook(() => useAgentTrace());
    expect(result.current.trace).toHaveLength(0);
  });

  it("initializes with provided steps", () => {
    const steps = [{ id: "1", title: "Search", status: "success" as const }];
    const { result } = renderHook(() => useAgentTrace(steps));
    expect(result.current.trace).toHaveLength(1);
    expect(result.current.trace[0].title).toBe("Search");
  });

  it("adds a step", () => {
    const { result } = renderHook(() => useAgentTrace());
    act(() => {
      result.current.addStep({ id: "1", title: "Search records", status: "running" });
    });
    expect(result.current.trace).toHaveLength(1);
    expect(result.current.trace[0].title).toBe("Search records");
  });

  it("updates a step by id", () => {
    const steps = [{ id: "1", title: "Search", status: "running" as const }];
    const { result } = renderHook(() => useAgentTrace(steps));
    act(() => {
      result.current.updateStep("1", { status: "success", durationMs: 250 });
    });
    expect(result.current.trace[0].status).toBe("success");
    expect(result.current.trace[0].durationMs).toBe(250);
  });

  it("resets trace to empty", () => {
    const steps = [{ id: "1", title: "Search", status: "success" as const }];
    const { result } = renderHook(() => useAgentTrace(steps));
    act(() => {
      result.current.resetTrace();
    });
    expect(result.current.trace).toHaveLength(0);
  });
});
