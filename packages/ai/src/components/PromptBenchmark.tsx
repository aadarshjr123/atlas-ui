import { EvaluationTable, type EvaluationRow } from "./EvaluationTable";
import { ModelComparison } from "./ModelComparison";

export interface PromptBenchmarkProps {
  results: EvaluationRow[];
}

export function PromptBenchmark({ results }: PromptBenchmarkProps) {
  return (
    <section className="space-y-4" aria-label="Prompt benchmark">
      <ModelComparison
        results={results.map((result) => ({
          label: result.prompt,
          model: result.model,
          accuracy: result.accuracy,
          latencyMs: result.latencyMs,
          costUsd: result.costUsd
        }))}
      />
      <EvaluationTable rows={results} />
    </section>
  );
}
