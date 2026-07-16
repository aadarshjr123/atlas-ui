import { MetricCard } from "./MetricCard";

export interface LatencyMonitorProps {
  latencyMs: number;
}

export function LatencyMonitor({ latencyMs }: LatencyMonitorProps) {
  const seconds = latencyMs / 1000;
  const detail = latencyMs < 2000 ? "Fast response" : latencyMs < 6000 ? "Normal response" : "Slow response";
  return <MetricCard label="Latency" value={`${seconds.toFixed(1)}s`} detail={detail} />;
}
