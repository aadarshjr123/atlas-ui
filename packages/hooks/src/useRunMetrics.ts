import { useMemo, useState } from "react";

export interface RunMetric {
  id: string;
  model: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  createdAt: Date;
}

export function useRunMetrics(initialRuns: RunMetric[] = []) {
  const [runs, setRuns] = useState<RunMetric[]>(initialRuns);

  const summary = useMemo(() => {
    const totalTokens = runs.reduce((total, run) => total + run.inputTokens + run.outputTokens, 0);
    const totalCostUsd = runs.reduce((total, run) => total + run.costUsd, 0);
    const averageLatencyMs = runs.length === 0 ? 0 : Math.round(runs.reduce((total, run) => total + run.latencyMs, 0) / runs.length);

    return { totalTokens, totalCostUsd, averageLatencyMs, runCount: runs.length };
  }, [runs]);

  return { runs, setRuns, summary };
}
