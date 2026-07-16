# @aadarshjr123/atlas-hooks

React hooks for AI interaction state.

## Install

```sh
pnpm add @aadarshjr123/atlas-hooks
```

React is a peer dependency.

```tsx
import { useChat, useAgentState, useRunMetrics } from "@aadarshjr123/atlas-hooks";
```

## Included

Chat, streaming, agent trace, approval, citation, tool call, workflow status, human approval, evaluation, and run metrics hooks.

## Usage

```tsx
import { useChat } from "@aadarshjr123/atlas-hooks";

export function AssistantState() {
  const { messages, sendMessage, isLoading } = useChat({
    onSend: async (message) => `Reviewed: ${message.content}`
  });

  return { messages, sendMessage, isLoading };
}
```

## Notes

Hooks manage local interaction state. Persist approval decisions, audit data, and long-running workflow state in your application backend.
