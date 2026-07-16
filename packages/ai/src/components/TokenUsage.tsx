import { MetricCard } from "./MetricCard";

export interface TokenUsageProps {
  inputTokens: number;
  outputTokens: number;
  contextLimit?: number;
}

export function TokenUsage({ inputTokens, outputTokens, contextLimit }: TokenUsageProps) {
  const total = inputTokens + outputTokens;
  const detail = contextLimit ? `${Math.round((total / contextLimit) * 100)}% of context window` : `${inputTokens} input / ${outputTokens} output`;
  return <MetricCard label="Tokens" value={total.toLocaleString()} detail={detail} />;
}
