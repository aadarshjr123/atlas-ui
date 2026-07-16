import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToolCall } from "./useToolCall";

describe("useToolCall", () => {
  it("tracks tool call lifecycle", () => {
    const { result } = renderHook(() => useToolCall());

    act(() => result.current.startToolCall("search", "Search records"));
    expect(result.current.runningToolCalls).toHaveLength(1);

    act(() => result.current.finishToolCall("search", "12 records"));
    expect(result.current.toolCalls[0].status).toBe("success");
    expect(result.current.toolCalls[0].resultSummary).toBe("12 records");
  });
});
