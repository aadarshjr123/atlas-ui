import { MetricCard } from "./MetricCard";

export interface ModelUsageProps {
  model: string;
  provider?: string;
}

export function ModelUsage({ model, provider }: ModelUsageProps) {
  return <MetricCard label="Model" value={model} detail={provider ?? "Active model"} />;
}
