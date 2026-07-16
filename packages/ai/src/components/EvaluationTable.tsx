export interface EvaluationRow {
  id: string;
  model: string;
  prompt: string;
  accuracy: number;
  latencyMs: number;
  costUsd: number;
}

export interface EvaluationTableProps {
  rows: EvaluationRow[];
}

export function EvaluationTable({ rows }: EvaluationTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-atlas-line bg-atlas-panel">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-atlas-surface text-xs uppercase text-atlas-muted">
          <tr>
            <th className="px-3 py-2">Model</th>
            <th className="px-3 py-2">Prompt</th>
            <th className="px-3 py-2">Accuracy</th>
            <th className="px-3 py-2">Latency</th>
            <th className="px-3 py-2">Cost</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-atlas-line">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-3 py-3 font-medium text-atlas-ink">{row.model}</td>
              <td className="px-3 py-3 text-atlas-muted">{row.prompt}</td>
              <td className="px-3 py-3 text-atlas-ink">{row.accuracy}%</td>
              <td className="px-3 py-3 text-atlas-muted">{(row.latencyMs / 1000).toFixed(1)}s</td>
              <td className="px-3 py-3 text-atlas-muted">${row.costUsd.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
