import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRunMetrics } from "./useRunMetrics";

describe("useRunMetrics", () => {
  it("summarizes run metrics", () => {
    const { result } = renderHook(() =>
      useRunMetrics([
        {
          id: "run-1",
          model: "gpt-5",
          latencyMs: 4000,
          inputTokens: 1000,
          outputTokens: 250,
          costUsd: 0.004,
          createdAt: new Date()
        }
      ])
    );

    expect(result.current.summary.totalTokens).toBe(1250);
    expect(result.current.summary.averageLatencyMs).toBe(4000);
  });
});
