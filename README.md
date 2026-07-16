# Atlas UI

Atlas UI is an open-source React design system for AI-native applications: chat interfaces, streaming responses, citations, tool calls, agent traces, approvals, document review, observability, and evaluation.

## Packages

- `@atlas-ui/core` - accessible UI primitives
- `@atlas-ui/ai` - AI-native components and workflows
- `@atlas-ui/hooks` - reusable AI interaction hooks
- `@atlas-ui/tokens` - shared design tokens

## Quick Start

```bash
pnpm install
pnpm dev
```

Open the docs app:

```bash
http://localhost:5174/
```

## Documentation

The docs app includes:

- Getting Started
- Installation
- Components
- Hooks
- AI Workflows
- AI UX Patterns
- Accessibility
- Bundle Size
- Roadmap

## Development

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm storybook
```

## Publishing

Atlas uses Changesets for versioning and publishing.

```bash
pnpm changeset
pnpm version-packages
pnpm release
```
