import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Clock, Loader2, Play, RotateCcw } from "lucide-react";
import { Button, cn } from "@aadarshjr123/atlas-core";

export interface AgentTraceStep {
  id: string;
  title: string;
  description?: string;
  status: "idle" | "running" | "success" | "error";
  durationMs?: number;
  inputTokens?: number;
  outputTokens?: number;
  costUsd?: number;
}

export interface AgentTraceProps {
  trace: AgentTraceStep[];
  className?: string;
  showTiming?: boolean;
  showTokens?: boolean;
  showCosts?: boolean;
  replayable?: boolean;
}

const icons = {
  idle: Clock,
  running: Loader2,
  success: CheckCircle2,
  error: CircleAlert
};

export function AgentTrace({ trace, className, showTiming = false, showTokens = false, showCosts = false, replayable = false }: AgentTraceProps) {
  const [replayIndex, setReplayIndex] = useState(trace.length);
  const visibleTrace = useMemo(() => (replayable ? trace.slice(0, replayIndex) : trace), [replayIndex, replayable, trace]);

  const replay = () => {
    setReplayIndex(0);
    trace.forEach((_, index) => {
      window.setTimeout(() => setReplayIndex(index + 1), 450 * (index + 1));
    });
  };

  return (
    <div className={className}>
      {replayable ? (
        <div className="mb-3 flex justify-end gap-2">
          <Button size="sm" variant="secondary" onClick={() => setReplayIndex(trace.length)}>
            <RotateCcw size={15} />
            Reset
          </Button>
          <Button size="sm" onClick={replay}>
            <Play size={15} />
            Replay
          </Button>
        </div>
      ) : null}
      <ol className="space-y-3" aria-label="Agent trace">
        {visibleTrace.map((step, index) => {
          const Icon = icons[step.status];
          return (
            <li key={step.id} className="grid grid-cols-[1.5rem_1fr] gap-3">
              <div className="flex flex-col items-center">
                <Icon className={cn("mt-1", step.status === "running" && "animate-spin")} size={17} />
                {index < visibleTrace.length - 1 ? <div className="mt-2 h-full min-h-6 w-px bg-atlas-line" /> : null}
              </div>
              <div className="rounded-lg border border-atlas-line bg-atlas-panel p-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-atlas-ink">{step.title}</p>
                  {showTiming && step.durationMs ? <span className="text-xs text-atlas-muted">{step.durationMs}ms</span> : null}
                </div>
                {step.description ? <p className="mt-1 text-sm text-atlas-muted">{step.description}</p> : null}
                {showTokens || showCosts ? (
                  <dl className="mt-3 grid grid-cols-3 gap-2">
                    {showTokens ? (
                      <>
                        <div className="rounded-md bg-atlas-surface p-2">
                          <dt className="text-xs text-atlas-muted">Input</dt>
                          <dd className="text-sm font-semibold text-atlas-ink">{step.inputTokens ?? 0}</dd>
                        </div>
                        <div className="rounded-md bg-atlas-surface p-2">
                          <dt className="text-xs text-atlas-muted">Output</dt>
                          <dd className="text-sm font-semibold text-atlas-ink">{step.outputTokens ?? 0}</dd>
                        </div>
                      </>
                    ) : null}
                    {showCosts ? (
                      <div className="rounded-md bg-atlas-surface p-2">
                        <dt className="text-xs text-atlas-muted">Cost</dt>
                        <dd className="text-sm font-semibold text-atlas-ink">${(step.costUsd ?? 0).toFixed(4)}</dd>
                      </div>
                    ) : null}
                  </dl>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
