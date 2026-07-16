# Atlas UI 4-Phase Product Plan

## Summary

Build **Atlas UI** as an open-source React/TypeScript design system for AI-native applications.

Atlas should not try to become another generic UI kit. Its focus should be AI product patterns that teams repeatedly rebuild:

- Chat interfaces
- Streaming responses
- Citations
- Tool calls
- Agent traces
- Human approval flows
- Document review
- AI workflow state
- Observability
- Evaluation tools

Recommended stack:

- `pnpm`
- `turbo`
- `typescript`
- `vite`
- `storybook`
- `vitest`
- `tailwind`
- `radix`
- `lucide-react`

---

## Phase 1: MVP AI Component Library

### Goal

Create a small, polished v0.1 that developers understand quickly.

### Repo Structure

```txt
atlas-ui/
  apps/
    docs/
    storybook/
  packages/
    core/
    ai/
    hooks/
    tokens/
```

### Core Components

- `Button`
- `Input`
- `Textarea`
- `Dialog`
- `Tooltip`
- `Badge`
- `Card`
- `Tabs`

### AI Components

- `Chat`
- `Message`
- `StreamingMessage`
- `Citation`
- `ToolCall`
- `AgentTrace`
- `ApprovalCard`
- `ConfidenceScore`

### Hooks

- `useChat`
- `useStreamingText`
- `useAgentTrace`
- `useApproval`
- `useCopyToClipboard`

### Demo App

Build one strong demo:

**AI Procurement Review Workspace**

Demo flow:

1. User asks AI to review a supplier quote.
2. AI streams a response.
3. Response includes citations.
4. UI shows tool calls.
5. UI displays an agent trace.
6. Human approves, rejects, or edits the recommendation.

### Success Criteria

- Components render in Storybook.
- Demo app works with mocked data.
- README clearly explains Atlas.
- Packages are ready for npm publishing.
- Dark mode works.
- Keyboard accessibility is included.
- MIT license, changelog, and contribution guide exist.

---

## Phase 2: AI Workflow Layer

### Goal

Move from isolated components to reusable AI workflows.

### Workflow Components

- `ApprovalFlow`
- `DocumentReview`
- `ExtractionReview`
- `PromptPlayground`
- `EvidencePanel`
- `ReasoningBlock`
- `TraceTimeline`
- `TraceNode`

### Workflow Hooks

- `useAgentState`
- `useCitation`
- `useToolCall`
- `useWorkflowStatus`
- `useHumanApproval`

### Agent State Model

```ts
type AgentState =
  | "idle"
  | "generating"
  | "tool_calling"
  | "waiting_approval"
  | "completed"
  | "failed";
```

Example API:

```tsx
const agent = useAgentState();

<AgentStatus state={agent.state} />;
```

### Docs To Add

- Chat Interface Pattern
- Streaming Response Pattern
- Citation Pattern
- Tool Call Pattern
- Human-in-the-Loop Pattern
- Agent Trace Pattern
- Document Review Pattern

### Success Criteria

- Users can compose realistic AI workflows.
- Workflow components are built from smaller primitives.
- Docs explain when to use each workflow.
- Docs explain tradeoffs clearly.

---

## Phase 3: Differentiating Platform Features

### Goal

Make Atlas memorable and harder to replace with shadcn plus custom components.

### Observability Components

- `CostTracker`
- `TokenUsage`
- `LatencyMonitor`
- `ModelUsage`
- `RunMetrics`

### Evaluation Components

- `EvaluationTable`
- `ModelComparison`
- `PromptBenchmark`
- `EvalResultCard`

### Advanced Agent Visualization

- `AgentGraph`
- `AgentNetwork`
- Replayable `AgentTrace`

Example API:

```tsx
<AgentTrace
  trace={trace}
  showTiming
  showTokens
  showCosts
  replayable
/>;
```

### Developer Tooling

Add:

```tsx
<AtlasDevtools />;
```

The devtools panel should show:

- Current prompt
- Model used
- Latency
- Token usage
- Estimated cost
- Tool calls
- Current agent state
- Context window usage

### Success Criteria

- Atlas feels like an AI frontend toolkit, not just a component library.
- Agent traces can be visually inspected and replayed.
- Developers can see latency, cost, and tokens during development.
- Evaluation UI supports comparing prompts and models.

---

## Phase 4: Launch, Distribution, And Growth

### Goal

Publish Atlas, reach users, and make the project trustworthy.

### Packages To Publish

- `@atlas-ui/core`
- `@atlas-ui/ai`
- `@atlas-ui/hooks`
- `@atlas-ui/tokens`

### Documentation Site

Deploy docs to Vercel.

Docs should include:

- Getting Started
- Installation
- Components
- Hooks
- AI Workflows
- AI UX Patterns
- Examples
- Accessibility
- Bundle Size
- Tradeoffs
- Roadmap

### Launch Channels

- GitHub
- npm
- LinkedIn
- X/Twitter
- Reddit `r/reactjs`
- Reddit `r/webdev`
- Dev.to
- Hashnode
- Product Hunt
- Hacker News Show HN
- Indie Hackers

### Launch Positioning

> Atlas UI is an open-source React design system for AI-native applications: chat interfaces, streaming responses, citations, tool calls, agent traces, approvals, and human-in-the-loop workflows.

### Build-In-Public Content Plan

- Day 1: Why AI apps need new UI primitives
- Day 3: Building an Agent Trace component
- Day 5: Designing approval flows for AI apps
- Day 7: Making streaming messages accessible
- Day 10: Atlas UI v0.1 is live

### Success Criteria

- Public GitHub repo is live.
- npm packages are published.
- Docs site is live.
- Demo is easy to try.
- Launch posts clearly explain the problem Atlas solves.
- First users can install, copy examples, and build a basic AI interface quickly.

---

## Test Plan

Before each phase is considered complete, run:

- Unit tests with `vitest`
- Component render tests
- Storybook checks
- Keyboard navigation checks
- ARIA checks
- Dark mode visual checks
- Demo app smoke test
- Package build test
- TypeScript declaration output check
- Bundle size check

---

## Assumptions

- Atlas UI starts as a greenfield project.
- React is the first supported framework.
- TypeScript is required.
- Tailwind and Radix are used for speed, accessibility, and composability.
- Phase 1 prioritizes polish over component count.
- Backend and real AI provider integrations are not required in Phase 1.
- Mocked demo data is enough for the first release.
- The first target audience is frontend developers building AI SaaS tools, internal copilots, RAG apps, agent dashboards, and approval workflows.
