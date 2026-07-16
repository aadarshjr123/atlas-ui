import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (typeof navigator.clipboard?.writeText !== "function") return;
    await navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[hsl(220_24%_7%)] shadow-2xl shadow-black/10">
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 inline-flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 text-xs font-medium text-white/80 backdrop-blur transition hover:bg-white/15"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 pt-14 text-sm leading-6 text-white/90 sm:p-5 sm:pr-28">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function explainProp(name: string, description: string) {
  const guidance: Record<string, string> = {
    children: "Pass any renderable React content. Keep nested interactive controls intentional so keyboard order remains predictable.",
    className: "Use this for layout adjustments at the usage site. Prefer built-in variants for visual meaning and state.",
    disabled: "When true, the control is unavailable to pointer and keyboard users and should not run callbacks.",
    variant: "Choose the variant by the action's meaning first, then adjust placement and surrounding copy.",
    size: "Use smaller sizes in dense toolbars and larger sizes for important page or modal actions.",
    title: "Use a short, human-readable label. In dialogs and approval surfaces, the title also gives screen readers important context.",
    description: "Use supporting copy to explain why the user is seeing the surface or what decision is expected.",
    status: "Use stable status values so color, icon, text, and assistive labels all communicate the same state.",
    onChange: "Called when user-editable state changes. Keep the handler fast and persist externally when the value matters.",
    onApprove: "Called after the user confirms the positive decision. Connect this to the real approval mutation in your app.",
    onReject: "Called after the user rejects the suggestion. Provide nearby context for what happens next.",
    onRun: "Called when the user starts a prompt or evaluation run. Use it to trigger your backend workflow.",
    trace: "Each step should include a stable id, concise title, and status metadata so replay and inspection remain useful.",
    fields: "Each field should include a stable id, display label, extracted value, current value, and confidence when available.",
    items: "Each item should include a stable id and enough source context for users to verify the claim.",
    results: "Rows should use stable ids and comparable metrics so users can scan model or prompt quality.",
    initialMessages: "Use this for seeded conversations, examples, or restoring a prior session before sending new messages.",
    initialResults: "Use this to preload evaluation rows from fixtures, server data, or cached benchmark results."
  };

  return guidance[name] ? `${description} ${guidance[name]}` : description;
}

export function PropsTable({ rows = [] }: { rows?: Array<[string, string, string]> }) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-x-auto rounded-2xl border border-atlas-line bg-atlas-panel shadow-sm">
      <table className="min-w-[42rem] w-full border-collapse text-left text-sm">
        <thead className="bg-atlas-surface/80 text-xs uppercase text-atlas-muted">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Type</th>
            <th className="px-3 py-2">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-atlas-line bg-atlas-panel">
          {rows.map(([name, type, description]) => (
            <tr key={name}>
              <td className="align-top px-4 py-4 font-medium text-atlas-ink">{name}</td>
              <td className="align-top px-4 py-4 font-mono text-xs leading-6 text-atlas-muted">{type}</td>
              <td className="align-top px-4 py-4 leading-6 text-atlas-muted">{explainProp(name, description)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="grid gap-2 text-xs font-medium uppercase tracking-wide text-atlas-muted">
      {label}
      <span className="inline-flex w-full flex-wrap gap-1 rounded-2xl border border-atlas-line bg-atlas-panel/70 p-1 shadow-sm sm:w-fit sm:rounded-full">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-8 rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
              value === option ? "bg-atlas-accent text-white shadow-sm" : "text-atlas-muted hover:bg-atlas-surface hover:text-atlas-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </span>
    </label>
  );
}

export function PlaygroundFrame({ controls, children }: { controls?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="docs-playground overflow-hidden rounded-[1.25rem] border border-atlas-line p-2 shadow-xl shadow-black/10 sm:rounded-[1.75rem] sm:p-3">
      <div className="rounded-[1rem] border border-atlas-line bg-atlas-panel/70 p-3 backdrop-blur-xl sm:rounded-[1.35rem] sm:p-4">
        {controls ? <div className="mb-4 flex flex-wrap gap-3">{controls}</div> : null}
        <div className="min-w-0 overflow-x-auto rounded-2xl border border-white/10 bg-atlas-surface/95 p-4 shadow-inner shadow-black/5 sm:p-5">{children}</div>
      </div>
    </div>
  );
}
