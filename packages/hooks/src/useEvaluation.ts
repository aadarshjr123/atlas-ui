import { useMemo, useState } from "react";

export interface EvaluationResult {
  id: string;
  label: string;
  model: string;
  accuracy: number;
  latencyMs: number;
  costUsd: number;
}

export function useEvaluation(initialResults: EvaluationResult[] = []) {
  const [results, setResults] = useState<EvaluationResult[]>(initialResults);

  const bestAccuracy = useMemo(
    () => results.reduce<EvaluationResult | null>((best, result) => (!best || result.accuracy > best.accuracy ? result : best), null),
    [results]
  );

  const lowestCost = useMemo(
    () => results.reduce<EvaluationResult | null>((best, result) => (!best || result.costUsd < best.costUsd ? result : best), null),
    [results]
  );

  return { results, setResults, bestAccuracy, lowestCost };
}
