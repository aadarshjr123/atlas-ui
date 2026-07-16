# Atlas UI

Accessible React components, workflow hooks, and documentation patterns for AI product interfaces.

Atlas UI is a design system for the parts of AI apps that teams keep rebuilding: chat, streaming responses, citations, tool calls, agent traces, human approval flows, document review, observability, and evaluation. It is built with React, TypeScript, Radix primitives, Tailwind CSS, Vite, Storybook, Vitest, and a small amount of healthy stubbornness about accessibility.

It tries to answer a simple question: what if AI interfaces shipped with the boring-but-important bits already handled, so developers could spend less time naming the seventeenth `isLoading` state and more time building the product?

```tsx
import { Button } from "@atlas-ui/core";
import { AgentTrace, Citation, Message } from "@atlas-ui/ai";
import { useChat } from "@atlas-ui/hooks";
```

## Why Atlas UI?

Most component libraries help with buttons, forms, and layouts. AI products need those, but they also need interfaces that explain what the model did, where an answer came from, when a human should approve something, and how much a run cost.

Atlas UI focuses on those product moments:

| Product need | Atlas gives you |
| --- | --- |
| AI conversations | Chat, Message, StreamingMessage |
| Trust and evidence | Citation, EvidencePanel, ReasoningBlock |
| Tool visibility | ToolCall, AgentTrace, TraceTimeline |
| Human review | ApprovalCard, ApprovalFlow, DocumentReview, ExtractionReview |
| Evaluation | PromptPlayground, PromptBenchmark, EvaluationTable |
| Observability | RunMetrics, TokenUsage, CostTracker, AtlasDevtools |

The goal is not to replace your whole app shell. Atlas is the kit you reach for when your product starts doing AI-shaped things and the UI needs to stay calm, inspectable, and human. The components are allowed to look good; they are just not allowed to be mysterious.

## Packages

```txt
packages/
  core      Accessible UI primitives
  ai        AI workflow and observability components
  hooks     React hooks for AI interaction state
  tokens    Shared design tokens

apps/
  docs      Live documentation and playgrounds
  storybook Component examples and development workspace
```

| Package | Purpose |
| --- | --- |
| `@atlas-ui/core` | Buttons, inputs, cards, dialogs, tabs, tooltips, badges, and theme primitives. |
| `@atlas-ui/ai` | Chat, citations, tool calls, traces, approvals, document review, metrics, and devtools. |
| `@atlas-ui/hooks` | State helpers for chat, streaming, citations, approvals, tools, traces, workflows, and evaluations. |
| `@atlas-ui/tokens` | Shared colors, spacing, radius, shadows, and theme values. |

## Quick Start

Install dependencies:

```bash
pnpm install
```

Run the docs app:

```bash
pnpm dev
```

Open the local docs URL shown by Vite, usually:

```txt
http://localhost:5173/
```

Run Storybook:

```bash
pnpm storybook
```

## Install Packages

After publishing, install only what your app needs:

```bash
pnpm add @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens
```

Example:

```tsx
import { ApprovalFlow } from "@atlas-ui/ai";

export function RenewalReview() {
  const saveDecision = (decision: "approved" | "rejected" | "edited") => {
    // Replace this with your real mutation, API call, or very serious TODO.
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

## What Is Included?

### Core components

- Button
- Input
- Textarea
- Dialog
- Tooltip
- Badge
- Card
- Tabs

### AI components

- Chat and Message
- StreamingMessage
- Citation
- ToolCall
- AgentTrace
- ApprovalCard and ApprovalFlow
- DocumentReview and ExtractionReview
- PromptPlayground
- EvidencePanel and ReasoningBlock
- RunMetrics, TokenUsage, CostTracker, LatencyMonitor
- PromptBenchmark, EvaluationTable, ModelComparison
- AgentGraph, AgentNetwork, AtlasDevtools

### Hooks

- useChat
- useStreamingText
- useAgentTrace
- useAgentState
- useApproval
- useHumanApproval
- useToolCall
- useCitation
- useWorkflowStatus
- useRunMetrics
- useEvaluation
- useCopyToClipboard

## Development

```bash
pnpm test
pnpm typecheck
pnpm build
```

Useful app commands:

```bash
pnpm --filter @atlas-ui/docs dev
pnpm --filter @atlas-ui/docs build
pnpm --filter @atlas-ui/storybook storybook
pnpm --filter @atlas-ui/storybook build
```

## Quality Bar

Atlas UI is built around a few simple rules:

- Components should be keyboard-friendly by default.
- AI output should be inspectable, not mysterious.
- Status should not rely on color alone.
- Human approval flows should make consequences clear.
- Docs should include live examples, not just prop tables.
- If an interface needs five screenshots, three sticky notes, and a meeting called "quick sync", the component is not finished yet.

## Developer Notes

- Built as a monorepo because one package was too small and twelve packages would have been a cry for help.
- Components prefer boring APIs. Boring APIs are the ones people still understand after lunch.
- The docs include live playgrounds because screenshots age faster than dependency lockfiles.
- Accessibility is not a plugin, a phase, or a checkbox. It is part of the component contract.
- There is no global state manager hidden in here. You are safe. Breathe normally.

## Publishing

This workspace uses Changesets for versioning and npm publishing.

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

Before publishing:

```bash
pnpm test
pnpm typecheck
pnpm build
```

The npm packages are configured for public publishing. If the `@atlas-ui` npm scope is unavailable, rename the packages to a scope you own before release.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Storybook
- Vitest
- tsup
- Turborepo
- Changesets

## Project Status

Atlas UI is currently a polished early release candidate. The docs, package structure, tests, and build pipeline are in place. The next steps are public deployment, npm publishing under an available scope, and continued visual/accessibility QA.

## License

MIT
