import { cn } from "@atlas-ui/core";

export interface AgentGraphNode {
  id: string;
  label: string;
  role?: string;
  status?: "idle" | "running" | "success" | "error";
}

export interface AgentGraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface AgentGraphProps {
  nodes: AgentGraphNode[];
  edges: AgentGraphEdge[];
  className?: string;
}

export function AgentGraph({ nodes, edges, className }: AgentGraphProps) {
  return (
    <section className={cn("rounded-lg border border-atlas-line bg-atlas-panel p-4", className)} aria-label="Agent graph">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((node, index) => {
          const outgoing = edges.find((edge) => edge.from === node.id);
          return (
            <div key={node.id} className="flex items-center gap-3">
              <div className="min-w-36 rounded-lg border border-atlas-line bg-atlas-surface p-3 text-center">
                <p className="text-sm font-semibold text-atlas-ink">{node.label}</p>
                {node.role ? <p className="text-xs text-atlas-muted">{node.role}</p> : null}
              </div>
              {index < nodes.length - 1 ? (
                <div className="text-xs font-medium text-atlas-muted" aria-label={outgoing?.label ?? "connects to"}>
                  →
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
