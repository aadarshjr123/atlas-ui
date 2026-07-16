import { CostTracker } from "./CostTracker";
import { LatencyMonitor } from "./LatencyMonitor";
import { ModelUsage } from "./ModelUsage";
import { TokenUsage } from "./TokenUsage";

export interface RunMetricsProps {
  model: string;
  provider?: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  contextLimit?: number;
}

export function RunMetrics(props: RunMetricsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Run metrics">
      <ModelUsage model={props.model} provider={props.provider} />
      <LatencyMonitor latencyMs={props.latencyMs} />
      <TokenUsage inputTokens={props.inputTokens} outputTokens={props.outputTokens} contextLimit={props.contextLimit} />
      <CostTracker costUsd={props.costUsd} />
    </section>
  );
}
