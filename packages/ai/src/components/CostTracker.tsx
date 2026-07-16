import { MetricCard } from "./MetricCard";

export interface CostTrackerProps {
  costUsd: number;
  budgetUsd?: number;
}

export function CostTracker({ costUsd, budgetUsd }: CostTrackerProps) {
  const detail = budgetUsd ? `${Math.round((costUsd / budgetUsd) * 100)}% of $${budgetUsd.toFixed(2)} budget` : "Estimated run cost";
  return <MetricCard label="Cost" value={`$${costUsd.toFixed(4)}`} detail={detail} />;
}
