import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, cn } from "@aadarshjr123/atlas-core";

export interface CitationSource {
  title: string;
  excerpt?: string;
  url?: string;
  page?: number;
  metadata?: Record<string, string | number>;
}

export interface CitationProps {
  label: string;
  source: CitationSource;
  className?: string;
}

export function Citation({ label, source, className }: CitationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn("inline-flex rounded border border-atlas-line bg-atlas-panel px-1.5 py-0.5 text-xs font-semibold text-atlas-accent", className)}
          aria-label={`Open citation ${label}`}
        >
          [{label}]
        </button>
      </DialogTrigger>
      <DialogContent title={`Source ${label}`} description={`Citation source details for ${source.title}`}>
        <div className="space-y-3 text-sm text-atlas-ink">
          <p className="font-medium">{source.title}</p>
          {source.page ? <p className="text-atlas-muted">Page {source.page}</p> : null}
          {source.excerpt ? <p className="rounded-md bg-atlas-surface p-3 leading-6">{source.excerpt}</p> : null}
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-atlas-line bg-atlas-panel px-4 text-sm font-medium text-atlas-ink hover:bg-atlas-surface"
            >
              <ExternalLink size={15} />
              Open source
            </a>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
