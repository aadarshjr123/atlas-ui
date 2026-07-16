import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useEvaluation } from "./useEvaluation";

describe("useEvaluation", () => {
  it("finds best accuracy and lowest cost results", () => {
    const { result } = renderHook(() =>
      useEvaluation([
        { id: "a", label: "A", model: "GPT-5", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
        { id: "b", label: "B", model: "Gemini", accuracy: 87, latencyMs: 3900, costUsd: 0.0034 }
      ])
    );

    expect(result.current.bestAccuracy?.model).toBe("GPT-5");
    expect(result.current.lowestCost?.model).toBe("Gemini");
  });
});
