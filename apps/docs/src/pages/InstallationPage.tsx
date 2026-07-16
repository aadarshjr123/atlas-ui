import React from "react";
import { CodeBlock } from "../components/ui";

export function InstallationPage() {
  const packages = [
    ["@atlas-ui/core", "Accessible primitives for actions, form fields, cards, dialogs, tabs, tooltips, badges, and layout surfaces."],
    ["@atlas-ui/ai", "Higher-level AI interface patterns for chat, citations, tool calls, traces, approvals, document review, metrics, and devtools."],
    ["@atlas-ui/hooks", "Local state helpers for chat, streaming text, tool calls, citations, approvals, traces, workflow status, and evaluations."],
    ["@atlas-ui/tokens", "Shared design tokens for color, spacing, radius, shadows, and theme integration."]
  ];

  return (
    <article className="mx-auto w-full max-w-5xl">
      <div className="docs-card rounded-[2rem] border border-atlas-line p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-atlas-accent">Guide</p>
        <h1 className="mt-2 text-3xl font-semibold text-atlas-ink sm:text-4xl">Installation</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-atlas-muted">
          Install only the packages your app needs. Atlas is split by responsibility, so you can start with the core primitives and add AI workflow components, hooks, or tokens as your interface grows.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-atlas-ink">Package Manager</h2>
        <div className="mt-3 grid gap-3">
          <CodeBlock>{`pnpm add @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens`}</CodeBlock>
          <CodeBlock>{`npm install @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens`}</CodeBlock>
          <CodeBlock>{`yarn add @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens`}</CodeBlock>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-atlas-ink">Choose Packages</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          {packages.map(([name, description]) => (
            <div key={name} className="docs-card rounded-2xl border border-atlas-line p-5 shadow-sm">
              <p className="font-mono text-sm font-semibold text-atlas-ink">{name}</p>
              <p className="mt-2 text-sm leading-6 text-atlas-muted">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Peer Dependencies", "React and React DOM should come from your app. Keep them installed at the app level so Atlas does not bundle a second copy of React."],
          ["Styles", "Use the Atlas CSS setup from your app or include the Atlas package paths in Tailwind content scanning so the required utility classes are generated."],
          ["Build Output", "Each package publishes ESM, CommonJS, and TypeScript declarations. Import from the package root in normal application code."]
        ].map(([title, description]) => (
          <div key={title} className="docs-card rounded-2xl border border-atlas-line p-5 shadow-sm">
            <p className="text-sm font-semibold text-atlas-ink">{title}</p>
            <p className="mt-2 text-sm leading-6 text-atlas-muted">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-atlas-ink">First Import</h2>
        <div className="mt-3">
          <CodeBlock>{`import { Button } from "@atlas-ui/core";\nimport { Chat, Message } from "@atlas-ui/ai";\nimport { useChat } from "@atlas-ui/hooks";\n\nexport function ReviewPanel() {\n  return <Button>Approve quote</Button>;\n}`}</CodeBlock>
        </div>
      </section>
    </article>
  );
}
