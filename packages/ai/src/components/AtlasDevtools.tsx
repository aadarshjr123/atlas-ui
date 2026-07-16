import { useSyncExternalStore } from "react";
import { Activity, Gauge, Wrench } from "lucide-react";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@atlas-ui/core";
import { getAtlasDevtoolsSnapshot, subscribeAtlasDevtools } from "../lib/devtools-store";

export function AtlasDevtools() {
  const snapshot = useSyncExternalStore(subscribeAtlasDevtools, getAtlasDevtoolsSnapshot, getAtlasDevtoolsSnapshot);
  const totalTokens = snapshot.inputTokens + snapshot.outputTokens;
  const contextPercent = snapshot.contextLimit === 0 ? 0 : Math.round((snapshot.contextUsed / snapshot.contextLimit) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Atlas Devtools</CardTitle>
          <Badge tone="neutral">development</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-atlas-line bg-atlas-surface p-3">
          <p className="text-xs font-semibold uppercase text-atlas-muted">Current prompt</p>
          <p className="mt-2 text-sm leading-6 text-atlas-ink">{snapshot.prompt || "No prompt captured."}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="flex items-center gap-2 text-xs text-atlas-muted">
              <Activity size={14} />
              Model
            </dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">{snapshot.model}</dd>
          </div>
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="flex items-center gap-2 text-xs text-atlas-muted">
              <Gauge size={14} />
              Latency
            </dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">{(snapshot.latencyMs / 1000).toFixed(1)}s</dd>
          </div>
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="text-xs text-atlas-muted">Tokens</dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">{totalTokens.toLocaleString()}</dd>
          </div>
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="text-xs text-atlas-muted">Cost</dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">${snapshot.costUsd.toFixed(4)}</dd>
          </div>
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="text-xs text-atlas-muted">Agent state</dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">{snapshot.agentState}</dd>
          </div>
          <div className="rounded-md bg-atlas-surface p-3">
            <dt className="text-xs text-atlas-muted">Context</dt>
            <dd className="mt-1 text-sm font-semibold text-atlas-ink">{contextPercent}%</dd>
          </div>
        </dl>
        <div>
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-atlas-ink">
            <Wrench size={15} />
            Tool calls
          </p>
          <div className="space-y-2">
            {snapshot.toolCalls.length === 0 ? (
              <p className="text-sm text-atlas-muted">No tool calls captured.</p>
            ) : (
              snapshot.toolCalls.map((toolCall) => (
                <div key={toolCall.id} className="flex items-center justify-between gap-3 rounded-md border border-atlas-line bg-atlas-panel p-2 text-sm">
                  <span className="text-atlas-ink">{toolCall.name}</span>
                  <Badge tone={toolCall.status === "success" ? "success" : toolCall.status === "error" ? "danger" : "warning"}>
                    {toolCall.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
