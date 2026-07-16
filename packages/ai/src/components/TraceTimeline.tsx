import { TraceNode, type TraceNodeProps } from "./TraceNode";

export interface TraceTimelineProps {
  steps: Array<TraceNodeProps & { id: string }>;
}

export function TraceTimeline({ steps }: TraceTimelineProps) {
  return (
    <ol className="space-y-3" aria-label="Trace timeline">
      {steps.map((step, index) => (
        <li key={step.id} className="grid grid-cols-[1rem_1fr] gap-3">
          <div className="flex flex-col items-center">
            <div className="mt-5 h-2 w-2 rounded-full bg-atlas-accent" />
            {index < steps.length - 1 ? <div className="mt-2 h-full min-h-8 w-px bg-atlas-line" /> : null}
          </div>
          <TraceNode title={step.title} description={step.description} status={step.status} durationMs={step.durationMs} />
        </li>
      ))}
    </ol>
  );
}
