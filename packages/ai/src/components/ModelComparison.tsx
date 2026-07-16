import { EvalResultCard, type EvalResultCardProps } from "./EvalResultCard";

export interface ModelComparisonProps {
  results: EvalResultCardProps[];
}

export function ModelComparison({ results }: ModelComparisonProps) {
  return (
    <section className="grid gap-3 md:grid-cols-3" aria-label="Model comparison">
      {results.map((result) => (
        <EvalResultCard key={`${result.model}-${result.label}`} {...result} />
      ))}
    </section>
  );
}
