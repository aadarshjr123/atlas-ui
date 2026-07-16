# Atlas UI

React components and hooks for AI product interfaces.

```txt
AI app needs trust.
Atlas gives it structure.

Chat -> Tools -> Evidence -> Trace -> Human approval -> Metrics
```

```tsx
import { Button } from "@atlas-ui/core";
import { Message, AgentTrace, ApprovalFlow } from "@atlas-ui/ai";
import { useChat } from "@atlas-ui/hooks";
```

## The Shape

```txt
                          Atlas UI
                             |
        +--------------------+--------------------+
        |                    |                    |
      Core                  AI                  Hooks
  primitives          product patterns       state helpers
        |                    |                    |
 Button, Input        Chat, Citation        useChat
 Dialog, Tabs         ToolCall, Trace       useAgentTrace
 Badge, Card          ApprovalFlow          useApproval
 Tooltip              Devtools              useEvaluation
```

Tiny joke, serious point: Atlas exists so every AI app does not need to reinvent `LoadingButNowWithEvidenceAndAuditTrail.tsx`.

## Product Flow

```txt
User asks
   |
   v
AI responds  ----->  Citations
   |                  |
   v                  v
Tool calls  ----->  Evidence panel
   |
   v
Agent trace
   |
   v
Human approval
   |
   v
Metrics + evaluation
```

## Packages

| Package | What it does |
| --- | --- |
| `@atlas-ui/core` | Buttons, inputs, cards, dialogs, tabs, badges, tooltips |
| `@atlas-ui/ai` | Chat, citations, tool calls, traces, approvals, document review |
| `@atlas-ui/hooks` | Chat, streaming, approvals, traces, tools, evaluation state |
| `@atlas-ui/tokens` | Colors, spacing, radius, shadows, theme values |

```txt
packages/
  core      -> UI primitives
  ai        -> AI workflow components
  hooks     -> React state helpers
  tokens    -> Design tokens

apps/
  docs      -> Live docs + playgrounds
  storybook -> Component workshop
```

## Quick Start

```bash
pnpm install
pnpm dev
```

Open the Vite URL:

```txt
http://localhost:5173/
```

Storybook:

```bash
pnpm storybook
```

## Example

```tsx
import { ApprovalFlow } from "@atlas-ui/ai";

export function RenewalReview() {
  const saveDecision = (decision: "approved" | "rejected" | "edited") => {
    // Replace with your real mutation. Or your fifth TODO. No judgment.
    return decision;
  };

  return (
    <ApprovalFlow
      title="Approve supplier renewal"
      amount="$52,000"
      steps={[
        { id: "extract", label: "Extract", status: "complete" },
        { id: "evidence", label: "Evidence", status: "complete" },
        { id: "review", label: "Review", status: "current" }
      ]}
      onApprove={() => saveDecision("approved")}
      onReject={() => saveDecision("rejected")}
      onEdit={() => saveDecision("edited")}
    />
  );
}
```

## Component Map

```txt
Core
  Button | Input | Textarea | Dialog | Tooltip | Badge | Card | Tabs

AI
  Chat | Message | StreamingMessage | Citation | ToolCall
  AgentTrace | ApprovalFlow | DocumentReview | PromptPlayground
  EvidencePanel | ReasoningBlock | RunMetrics | AtlasDevtools

Hooks
  useChat | useStreamingText | useAgentTrace | useApproval
  useToolCall | useCitation | useEvaluation | useRunMetrics
```

## Quality Checklist

```txt
[x] Keyboard-friendly components
[x] Light and dark themes
[x] Live docs playgrounds
[x] Storybook examples
[x] Tests and typechecks
[x] npm-ready package structure
[x] No mystery meat AI UI
```

Programmer translation:

```txt
If users need a meeting to understand the UI,
the component is not done.
```

## Commands

| Task | Command |
| --- | --- |
| Docs | `pnpm dev` |
| Storybook | `pnpm storybook` |
| Test | `pnpm test` |
| Typecheck | `pnpm typecheck` |
| Build | `pnpm build` |
| Lint | `pnpm lint` |

## Publishing

```txt
changeset -> version packages -> build -> publish
```

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

Before publishing:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

If `@atlas-ui` is not your npm scope, rename packages to a scope you own before publishing.

## Tech Stack

```txt
React + TypeScript + Vite
Tailwind CSS + Radix UI
Storybook + Vitest
Turborepo + tsup + Changesets
```

## Status

```txt
Stage: polished early release candidate
Next: deploy docs, publish packages, keep improving visual/a11y QA
```

## License

MIT
