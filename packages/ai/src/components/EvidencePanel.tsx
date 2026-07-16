import { Citation, type CitationSource } from "./Citation";

export interface EvidenceItem {
  id: string;
  label: string;
  title: string;
  description?: string;
  source: CitationSource;
}

export interface EvidencePanelProps {
  items: EvidenceItem[];
  title?: string;
}

export function EvidencePanel({ items, title = "Evidence" }: EvidencePanelProps) {
  return (
    <section className="rounded-lg border border-atlas-line bg-atlas-panel">
      <div className="border-b border-atlas-line px-4 py-3">
        <h3 className="text-sm font-semibold text-atlas-ink">{title}</h3>
      </div>
      <div className="divide-y divide-atlas-line">
        {items.map((item) => (
          <article key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-atlas-ink">{item.title}</p>
                {item.description ? <p className="mt-1 text-sm text-atlas-muted">{item.description}</p> : null}
              </div>
              <Citation label={item.label} source={item.source} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
