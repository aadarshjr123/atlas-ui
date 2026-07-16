import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAgentState } from "./useAgentState";

describe("useAgentState", () => {
  it("tracks state transitions and derived flags", () => {
    const { result } = renderHook(() => useAgentState());

    act(() => result.current.transition("waiting_approval", "Needs approval"));

    expect(result.current.state).toBe("waiting_approval");
    expect(result.current.needsHuman).toBe(true);
    expect(result.current.history.at(-1)?.label).toBe("Needs approval");
  });
});
