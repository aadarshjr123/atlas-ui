import React, { Suspense, lazy } from "react";
import { Badge } from "@atlas-ui/core";
import { DocPage as DocPageType } from "../data";
import { CodeBlock, PropsTable } from "../components/ui";

const ComponentPreview = lazy(() => import("../previews").then((module) => ({ default: module.ComponentPreview })));
const HookPreview = lazy(() => import("../previews").then((module) => ({ default: module.HookPreview })));

function getUsageGuidance(page: DocPageType) {
  const componentGuidance: Record<string, { use: string[]; avoid: string[]; a11y: string[]; examples: string[] }> = {
    button: {
      use: ["Use it for submitting a form, approving a recommendation, opening a modal, or running a clearly scoped command.", "Choose primary for the main action, secondary for alternatives, ghost for low-emphasis actions, and danger for destructive decisions."],
      avoid: ["Avoid multiple primary buttons in the same local decision area.", "Avoid icon-only buttons unless they have an accessible label."],
      a11y: ["Button text should describe the result of the action.", "If a button is disabled, provide nearby context that explains why the action is unavailable."],
      examples: [`<Button>Approve quote</Button>`, `<Button variant="danger">Reject renewal</Button>`]
    },
    dialog: {
      use: ["Use it for focused decisions, source previews, destructive confirmations, and short editing flows.", "Use it when focus should stay inside the surface until the user completes or dismisses the task."],
      avoid: ["Avoid dialogs for long multi-step workflows that deserve their own page.", "Avoid putting critical information in a dialog if users need to compare it with the underlying page."],
      a11y: ["Always provide a clear title and useful description.", "Confirm that focus returns to the trigger after closing."],
      examples: [`<DialogContent title="Source" description="Annual report excerpt">...</DialogContent>`]
    },
    tabs: {
      use: ["Use tabs to switch between sibling views such as Preview, Code, Evidence, and Trace.", "Use them to keep related panels together without navigating away."],
      avoid: ["Avoid hiding required actions or validation errors inside inactive tabs.", "Avoid tabs when the content is unrelated or should be read in sequence."],
      a11y: ["Keep tab labels short and unique.", "Verify arrow-key navigation and focus rings remain visible."],
      examples: [`<Tabs defaultValue="preview"><TabsList>...</TabsList></Tabs>`]
    },
    citation: {
      use: ["Use citations for claims that need evidence, RAG answers, audit trails, and document-grounded recommendations.", "Use inline citations when opening a source detail dialog helps preserve reading context."],
      avoid: ["Avoid decorative source markers that do not contain useful source data.", "Avoid long inline excerpts when a dialog or evidence panel would be easier to scan."],
      a11y: ["Citation triggers should expose the source title or label.", "Citation detail content should include enough context for screen-reader users."],
      examples: [`Revenue increased by 32% <Citation label="1" source={source} />`]
    }
  };

  if (componentGuidance[page.id]) return componentGuidance[page.id];

  if (page.group === "Hooks") {
    return {
      use: ["Use it when you want Atlas to manage local UI state while your app still controls backend calls and persistence.", "Use it when a workflow needs predictable derived state for rendering."],
      avoid: ["Do not treat hooks as a server cache, database, or security boundary.", "Do not store sensitive audit data only in client memory."],
      a11y: ["Render hook state through components that expose status with text, not color alone.", "Make loading, error, and completed states available to assistive technology."],
      examples: [page.usage ?? `const state = ${page.title}();`]
    };
  }

  return {
    use: ["Use it when the pattern appears repeatedly across AI product surfaces.", "Use it when the Atlas component provides accessible structure and consistent visual behavior."],
    avoid: ["Avoid it for one-off layouts where plain application markup is clearer.", "Avoid replacing domain-specific copy with generic component labels."],
    a11y: ["Check keyboard order, focus visibility, and status text in both themes.", "Use explicit labels for icon-only or visually compact controls."],
    examples: [page.usage ?? ""].filter(Boolean)
  };
}

export function DocPage({ page }: { page: DocPageType }) {
  const guidance = getUsageGuidance(page);

  return (
    <article className="mx-auto w-full max-w-5xl">
      <div className="docs-card rounded-[2rem] border border-atlas-line p-6 shadow-sm md:p-7">
        <p className="text-xs font-semibold uppercase tracking-wide text-atlas-accent">{page.group}</p>
        <h1 className="mt-2 text-3xl font-semibold text-atlas-ink sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-atlas-muted">{page.description}</p>

        {page.packageName ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="neutral">{page.packageName}</Badge>
            {page.group === "Components" ? <Badge tone="success">Live playground</Badge> : null}
            {page.group === "Hooks" ? <Badge tone="warning">State demo</Badge> : null}
          </div>
        ) : null}
      </div>

      {page.importCode ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-atlas-ink">Import</h2>
          <div className="mt-3"><CodeBlock>{page.importCode}</CodeBlock></div>
        </section>
      ) : null}

      {page.usage ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-atlas-ink">Basic Usage</h2>
          <div className="mt-3"><CodeBlock>{page.usage}</CodeBlock></div>
        </section>
      ) : null}

      {page.group === "Components" ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-atlas-ink">Live Playground</h2>
          <div className="mt-3">
            <Suspense fallback={<div className="docs-card rounded-2xl border border-atlas-line p-5 text-sm text-atlas-muted">Loading playground...</div>}>
              <ComponentPreview id={page.id} />
            </Suspense>
          </div>
        </section>
      ) : null}

      {page.group === "Hooks" ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-atlas-ink">Live Workflow</h2>
          <div className="mt-3">
            <Suspense fallback={<div className="docs-card rounded-2xl border border-atlas-line p-5 text-sm text-atlas-muted">Loading workflow...</div>}>
              <HookPreview id={page.id} />
            </Suspense>
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-atlas-ink">Details</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {page.details.map((detail) => (
            <div key={detail} className="docs-card rounded-2xl border border-atlas-line p-4 text-sm leading-6 text-atlas-muted shadow-sm">
              {detail}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="docs-card rounded-2xl border border-atlas-line p-5 shadow-sm">
          <h2 className="text-base font-semibold text-atlas-ink">When to use</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-atlas-muted">
            {guidance.use.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="docs-card rounded-2xl border border-atlas-line p-5 shadow-sm">
          <h2 className="text-base font-semibold text-atlas-ink">When not to use</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-atlas-muted">
            {guidance.avoid.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="docs-card rounded-2xl border border-atlas-line p-5 shadow-sm">
          <h2 className="text-base font-semibold text-atlas-ink">Accessibility</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-atlas-muted">
            {guidance.a11y.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      {guidance.examples.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-atlas-ink">More Examples</h2>
          <div className="mt-3 grid gap-3">
            {guidance.examples.map((example) => <CodeBlock key={example}>{example}</CodeBlock>)}
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-atlas-ink">{page.group === "Hooks" ? "Parameters" : "Props"}</h2>
        <div className="mt-3"><PropsTable rows={page.props} /></div>
      </section>
    </article>
  );
}
