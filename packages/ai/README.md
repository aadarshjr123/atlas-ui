# @aadarshjr123/atlas-ai

AI-native React components for chat, streaming, citations, tool calls, traces, approvals, document review, observability, and evaluation.

## Install

```sh
pnpm add @aadarshjr123/atlas-ai @aadarshjr123/atlas-core
```

React and React DOM are peer dependencies.

```tsx
import { Chat, Message, AgentTrace, ApprovalFlow } from "@aadarshjr123/atlas-ai";
```

## Included

Chat components, workflow components, observability components, evaluation components, agent visualization, and `AtlasDevtools`.

## Usage

```tsx
import { AgentTrace, Chat, Message, ToolCall } from "@aadarshjr123/atlas-ai";

export function ReviewAssistant() {
  return (
    <Chat>
      <Message author="user">Review this supplier quote.</Message>
      <Message author="assistant">The quote matches the active agreement.</Message>
      <ToolCall name="Search supplier records" status="success" resultSummary="12 records" />
      <AgentTrace trace={[{ id: "search", title: "Search records", status: "success" }]} />
    </Chat>
  );
}
```

## Accessibility

Use visible status text with traces, tools, confidence, and approval states. Do not rely on color alone for workflow state.
