export type DocPage = {
  id: string;
  title: string;
  group: "Guides" | "Components" | "Hooks";
  description: string;
  packageName?: string;
  importCode?: string;
  usage?: string;
  props?: Array<[string, string, string]>;
  details: string[];
};

export const trace = [
  { id: "search", title: "Search records", description: "Found policy and contract evidence.", status: "success" as const, durationMs: 250, inputTokens: 180, outputTokens: 42, costUsd: 0.0008 },
  { id: "review", title: "Prepare approval", description: "Human review is required.", status: "running" as const, durationMs: 870, inputTokens: 420, outputTokens: 96, costUsd: 0.0016 }
];

export const fields = [
  { id: "supplier", label: "Supplier", extractedValue: "Microsoft", value: "Microsoft", confidence: 98 },
  { id: "amount", label: "Amount", extractedValue: "$52,000", value: "$52,000", confidence: 94 },
  { id: "term", label: "Term", extractedValue: "12 months", value: "12 months", confidence: 91 }
];

export const guideDocs: DocPage[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    group: "Guides",
    description: "Atlas UI is a React and TypeScript design system for building clear, trustworthy AI product interfaces.",
    details: [
      "Atlas focuses on the interface patterns AI products need again and again: chat, streaming responses, citations, tool calls, agent traces, human approval, document review, observability, and evaluation.",
      "It is designed to work alongside your application and existing UI stack. Use it where AI workflows need structure, clarity, and consistent behavior.",
      "The packages are intentionally modular: core provides accessible primitives, AI provides higher-level product patterns, hooks manage local workflow state, and tokens keep styling consistent."
    ]
  },
  {
    id: "installation",
    title: "Installation",
    group: "Guides",
    description: "Install the packages that match the parts of Atlas UI you want to use.",
    usage: `pnpm add @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens`,
    details: ["React and React DOM are peer dependencies, so they should be installed by your app.", "Each package ships ESM, CommonJS, and TypeScript declarations for common build setups.", "Start with @atlas-ui/core for primitives, then add @atlas-ui/ai, @atlas-ui/hooks, or @atlas-ui/tokens as your product needs grow."]
  }
];

export const componentDocs: DocPage[] = [
  {
    id: "button",
    title: "Button",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Button is the standard action control for submitting forms, approving decisions, opening surfaces, and running commands.",
    importCode: `import { Button } from "@atlas-ui/core";`,
    usage: `<Button variant="primary">Approve quote</Button>`,
    props: [["variant", `"primary" | "secondary" | "ghost" | "danger"`, "Sets the visual priority and intent of the action."], ["size", `"sm" | "md" | "lg" | "icon"`, "Controls the button density for toolbars, forms, and primary actions."], ["disabled", "boolean", "Prevents pointer and keyboard interaction when the action is unavailable."]],
    details: ["Use one primary button for the main action in a local decision area.", "Use danger only for destructive, rejecting, or irreversible actions.", "For icon-only buttons, provide an accessible label so the action is clear to screen-reader users."]
  },
  {
    id: "input",
    title: "Input",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Input is a single-line text field for prompts, filters, metadata, search, and short review values.",
    importCode: `import { Input } from "@atlas-ui/core";`,
    usage: `<Input placeholder="Search tools..." />`,
    props: [["placeholder", "string", "A short hint that explains the expected value."], ["disabled", "boolean", "Prevents users from editing the field."], ["type", "HTML input type", "Supports native input types such as text, email, number, search, and range."]],
    details: ["Always pair the input with a visible label or an aria-label.", "The component keeps native input behavior, so browser autofill and keyboard editing continue to work.", "Focus styling is visible in both light and dark themes."]
  },
  {
    id: "textarea",
    title: "Textarea",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Textarea is a multi-line field for longer prompts, reviewer notes, explanations, and feedback.",
    importCode: `import { Textarea } from "@atlas-ui/core";`,
    usage: `<Textarea placeholder="Write a reviewer note..." />`,
    props: [["placeholder", "string", "A short hint for the kind of longer text expected."], ["disabled", "boolean", "Prevents users from editing the field."], ["rows", "number", "Sets the initial visible height of the control."]],
    details: ["Use it when content benefits from multiple lines or paragraph breaks.", "The field is resizable by default, which helps users review longer content.", "Use explicit labels in forms so the purpose of the field is clear."]
  },
  {
    id: "dialog",
    title: "Dialog",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Dialog provides an accessible modal surface for focused tasks such as source previews, confirmations, and short editing flows.",
    importCode: `import { Dialog, DialogTrigger, DialogContent } from "@atlas-ui/core";`,
    usage: `<Dialog><DialogTrigger asChild><Button>Open</Button></DialogTrigger><DialogContent title="Source">...</DialogContent></Dialog>`,
    props: [["title", "string", "Required title used for both visible context and accessibility."], ["description", "string", "Optional supporting text that explains the purpose of the dialog."], ["children", "ReactNode", "The main dialog content."]],
    details: ["Focus moves into the dialog when it opens and returns when it closes.", "Users can dismiss the dialog with Escape or the close button.", "Use descriptions when the dialog contains evidence, warnings, or decision-heavy content."]
  },
  {
    id: "tooltip",
    title: "Tooltip",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Tooltip provides short, non-critical helper text for compact controls and icon-only actions.",
    importCode: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@atlas-ui/core";`,
    usage: `<TooltipProvider><Tooltip><TooltipTrigger asChild><Button>Info</Button></TooltipTrigger><TooltipContent>More context</TooltipContent></Tooltip></TooltipProvider>`,
    props: [["children", "ReactNode", "The trigger and tooltip content."], ["sideOffset", "number", "Controls the space between the trigger and tooltip."], ["asChild", "boolean", "Uses your own element as the trigger while preserving tooltip behavior."]],
    details: ["Use tooltips for helpful clarification, not required instructions.", "Tooltip content appears on hover and keyboard focus.", "Keep the copy short enough to read at a glance."]
  },
  {
    id: "badge",
    title: "Badge",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Badge is a compact label for status, confidence, workflow state, tool results, and metadata.",
    importCode: `import { Badge } from "@atlas-ui/core";`,
    usage: `<Badge tone="success">High confidence</Badge>`,
    props: [["tone", `"neutral" | "success" | "warning" | "danger"`, "Sets the semantic color treatment for the label."], ["children", "ReactNode", "The visible badge text or inline content."]],
    details: ["Do not rely on color alone to communicate status.", "Use short labels such as Approved, Low risk, Running, or Needs review.", "Badges work well inside cards, tables, traces, headers, and compact toolbars."]
  },
  {
    id: "card",
    title: "Card",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Card groups related content into a reusable surface for lists, summaries, tools, and focused panels.",
    importCode: `import { Card, CardHeader, CardTitle, CardContent } from "@atlas-ui/core";`,
    usage: `<Card><CardHeader><CardTitle>Review</CardTitle></CardHeader><CardContent>...</CardContent></Card>`,
    props: [["className", "string", "Adds layout or spacing classes at the usage site."], ["children", "ReactNode", "The content rendered inside the card."]],
    details: ["Use cards for repeated items, summaries, or a focused tool surface.", "Avoid placing cards inside other cards because it makes hierarchy harder to read.", "Use page sections, grids, or panels for broad layout instead of forcing every area into a card."]
  },
  {
    id: "tabs",
    title: "Tabs",
    group: "Components",
    packageName: "@atlas-ui/core",
    description: "Tabs switch between related views without leaving the current page or workflow.",
    importCode: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@atlas-ui/core";`,
    usage: `<Tabs defaultValue="source"><TabsList><TabsTrigger value="source">Source</TabsTrigger></TabsList><TabsContent value="source">...</TabsContent></Tabs>`,
    props: [["defaultValue", "string", "Sets the initially selected tab for uncontrolled usage."], ["value", "string", "Controls the selected tab from application state."], ["onValueChange", "function", "Runs when the selected tab changes."]],
    details: ["Keyboard interaction is handled by Radix Tabs.", "Use short, unique labels such as Preview, Evidence, Trace, or Code.", "Do not hide required actions or validation errors inside inactive tabs."]
  },
  {
    id: "chat",
    title: "Chat",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "Chat provides the main conversation surface for user, assistant, and system messages in AI products.",
    importCode: `import { Chat, Message } from "@atlas-ui/ai";`,
    usage: `<Chat><Message role="user">Review this quote.</Message><Message role="assistant">Approved with finance review.</Message></Chat>`,
    props: [["children", "ReactNode", "Messages and related conversation content."], ["className", "string", "Adds layout or spacing classes around the chat surface."]],
    details: ["Use Chat as the visual composition root for a conversation.", "Pair it with useChat when you want Atlas to manage local message state.", "Preserve message roles so users can clearly distinguish user, assistant, and system content."]
  },
  {
    id: "message",
    title: "Message",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "Message renders a single conversation entry with styling that reflects whether it came from the user, assistant, or system.",
    importCode: `import { Message } from "@atlas-ui/ai";`,
    usage: `<Message role="assistant">The quote matches the contract.</Message>`,
    props: [["role", `"user" | "assistant" | "system"`, "Controls alignment, tone, and message treatment."], ["actions", "boolean", "Shows copy and feedback actions for assistant messages."], ["children", "ReactNode", "The rendered message body."]],
    details: ["Assistant messages can include copy and feedback actions.", "User messages align separately so conversation flow is easy to scan.", "Keep system messages brief and operational."]
  },
  {
    id: "streaming-message",
    title: "StreamingMessage",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "StreamingMessage displays assistant output while text is still being generated.",
    importCode: `import { StreamingMessage } from "@atlas-ui/ai";`,
    usage: `<StreamingMessage isStreaming content="Analyzing documents..." />`,
    props: [["content", "string", "The text currently available to render."], ["isStreaming", "boolean", "Shows a visible cursor while generation is active."]],
    details: ["Use it when model output arrives over time.", "Pair with useStreamingText for demos or controlled token reveal.", "In production generation flows, provide an obvious way to stop or cancel long responses."]
  },
  {
    id: "citation",
    title: "Citation",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "Citation links an AI claim to its source and opens a detail view without breaking reading context.",
    importCode: `import { Citation } from "@atlas-ui/ai";`,
    usage: `<Citation label="1" source={{ title: "Annual Report", page: 18 }} />`,
    props: [["label", "string", "The visible citation label, usually a number."], ["source", "CitationSource", "Source title, page, excerpt, url, and metadata."], ["className", "string", "Adds custom classes to the citation trigger."]],
    details: ["Use citations next to claims that users may need to verify.", "The detail dialog keeps users in context while they inspect the source.", "Include page numbers, URLs, or excerpts when the source material supports them."]
  },
  {
    id: "tool-call",
    title: "ToolCall",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "ToolCall shows what external tool or internal system the AI used, its status, and the result summary.",
    importCode: `import { ToolCall } from "@atlas-ui/ai";`,
    usage: `<ToolCall name="Search records" status="success" durationMs={430} resultSummary="12 records" />`,
    props: [["name", "string", "The human-readable tool name."], ["status", `"idle" | "running" | "success" | "error"`, "The current execution state."], ["durationMs", "number", "How long the tool took to run, in milliseconds."]],
    details: ["Use specific names such as Search contracts or Query CRM, not generic labels like Tool 1.", "Show duration and result summaries when they help users understand what happened.", "For errors, place recovery guidance or next steps near the failed tool call."]
  },
  {
    id: "agent-trace",
    title: "AgentTrace",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "AgentTrace displays the steps an AI agent took, including optional timing, token, cost, and replay details.",
    importCode: `import { AgentTrace } from "@atlas-ui/ai";`,
    usage: `<AgentTrace trace={trace} showTiming showTokens showCosts replayable />`,
    props: [["trace", "AgentTraceStep[]", "The ordered list of agent steps."], ["showTiming", "boolean", "Shows duration for each step when available."], ["showTokens", "boolean", "Shows input and output token counts."], ["showCosts", "boolean", "Shows estimated cost per step."], ["replayable", "boolean", "Adds visual replay controls for the trace."]],
    details: ["Use it for debugging, auditability, and explaining agent behavior.", "Replay is a visual inspection feature and does not rerun backend work.", "Write concise step titles and descriptions so the trace is readable under pressure."]
  },
  {
    id: "approval-card",
    title: "ApprovalCard",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "ApprovalCard presents one AI-suggested action and gives the user clear approve, reject, and edit choices.",
    importCode: `import { ApprovalCard } from "@atlas-ui/ai";`,
    usage: `<ApprovalCard title="Approve refund" amount="$4,500" />`,
    props: [["title", "string", "The action the user is being asked to review."], ["description", "string", "Supporting context for the decision."], ["amount", "string", "An important value to highlight, such as money or volume."], ["onApprove", "function", "Runs when the user approves the action."]],
    details: ["Use it when the AI recommends a concrete action that needs human confirmation.", "Make the consequence of approval clear before the user commits.", "Pair approvals with evidence in enterprise, financial, healthcare, or regulated workflows."]
  },
  {
    id: "approval-flow",
    title: "ApprovalFlow",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "ApprovalFlow combines workflow progress with a human approval decision.",
    importCode: `import { ApprovalFlow } from "@atlas-ui/ai";`,
    usage: `<ApprovalFlow title="Approve renewal" amount="$52,000" steps={steps} />`,
    props: [["steps", "ApprovalFlowStep[]", "The ordered progress steps shown above the approval card."], ["title", "string", "The approval action title."], ["amount", "string", "The value highlighted in the approval card."]],
    details: ["Use it for human-in-the-loop flows where the user needs to understand progress before deciding.", "Steps should communicate what happened, what is happening now, and what remains.", "Callbacks connect approval decisions to your real product behavior."]
  },
  {
    id: "document-review",
    title: "DocumentReview",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "DocumentReview pairs a document preview with extracted fields so a person can verify AI output against the source.",
    importCode: `import { DocumentReview } from "@atlas-ui/ai";`,
    usage: `<DocumentReview documentTitle="Invoice.pdf" fields={fields} />`,
    props: [["documentTitle", "string", "The document name shown to the reviewer."], ["documentPreview", "ReactNode", "The document preview or source content."], ["fields", "ReviewField[]", "The extracted fields users need to check."]],
    details: ["Use it for invoices, contracts, forms, claims, and structured document review.", "Show confidence per field when the extraction model provides it.", "Help users compare the source value and extracted value without switching context."]
  },
  {
    id: "extraction-review",
    title: "ExtractionReview",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "ExtractionReview shows extracted fields as editable values with explicit confirmation actions.",
    importCode: `import { ExtractionReview } from "@atlas-ui/ai";`,
    usage: `<ExtractionReview fields={fields} onChange={handleChange} />`,
    props: [["fields", "ExtractionField[]", "The editable extraction fields."], ["onConfirm", "function", "Runs when the user confirms the reviewed values."], ["onChange", "function", "Runs when a field value changes."]],
    details: ["Use it after automated extraction when a person must verify or correct values.", "Keep the original extracted value available so edits can be compared.", "Use explicit confirmation actions for reviewed data."]
  },
  {
    id: "prompt-playground",
    title: "PromptPlayground",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "PromptPlayground provides a practical workspace for editing prompts, running them, and reviewing outputs with metrics.",
    importCode: `import { PromptPlayground } from "@atlas-ui/ai";`,
    usage: `<PromptPlayground initialPrompt="Review this quote." response="Approved after finance review." />`,
    props: [["initialPrompt", "string", "The prompt text shown when the playground loads."], ["response", "string", "The response rendered in the output area."], ["metrics", "Metric[]", "Latency, cost, token, or quality metrics."], ["onRun", "function", "Runs when the user starts a prompt run."]],
    details: ["Use it for prompt engineering, internal QA, and model comparison workflows.", "Place metrics close to the result so quality and cost can be judged together.", "Keep prompts editable so teams can iterate quickly."]
  },
  {
    id: "evidence-panel",
    title: "EvidencePanel",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "EvidencePanel lists the sources, facts, or records that support an AI response or recommendation.",
    importCode: `import { EvidencePanel } from "@atlas-ui/ai";`,
    usage: `<EvidencePanel items={evidence} />`,
    props: [["items", "EvidenceItem[]", "The evidence rows shown in the panel."], ["title", "string", "The panel heading."]],
    details: ["Use it when users need to inspect why an answer or recommendation was produced.", "Evidence should be specific enough to verify, not just decorative.", "Pair evidence with a rationale when users are making a decision."]
  },
  {
    id: "reasoning-block",
    title: "ReasoningBlock",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "ReasoningBlock presents a concise, user-facing rationale for an AI recommendation.",
    importCode: `import { ReasoningBlock } from "@atlas-ui/ai";`,
    usage: `<ReasoningBlock>Approval is recommended because...</ReasoningBlock>`,
    props: [["title", "string", "The heading for the rationale section."], ["children", "ReactNode", "The rationale content shown to users."]],
    details: ["Use concise rationale that helps users understand the recommendation.", "Do not expose hidden chain-of-thought or private model reasoning when policy or product rules disallow it.", "Ground rationale in visible evidence, policy, or business rules."]
  },
  {
    id: "run-metrics",
    title: "RunMetrics",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "RunMetrics summarizes operational details such as model, latency, token usage, and estimated cost.",
    importCode: `import { RunMetrics } from "@atlas-ui/ai";`,
    usage: `<RunMetrics model="GPT-5" latencyMs={4100} inputTokens={1000} outputTokens={284} costUsd={0.0042} />`,
    props: [["model", "string", "The model used for the run."], ["latencyMs", "number", "The total runtime in milliseconds."], ["inputTokens", "number", "The number of input tokens."], ["outputTokens", "number", "The number of output tokens."], ["costUsd", "number", "The estimated cost in US dollars."]],
    details: ["Use it in debugging surfaces, admin tools, and evaluation workflows.", "Treat costs as estimates unless they come directly from provider billing data.", "Show context usage when it affects quality, latency, or cost."]
  },
  {
    id: "prompt-benchmark",
    title: "PromptBenchmark",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "PromptBenchmark compares prompts, models, or configurations using quality, latency, and cost metrics.",
    importCode: `import { PromptBenchmark } from "@atlas-ui/ai";`,
    usage: `<PromptBenchmark results={results} />`,
    props: [["results", "EvaluationRow[]", "The benchmark rows to compare."]],
    details: ["Use it for prompt iteration, model selection, and release checks.", "Compare quality with operational cost so the best choice is not judged by accuracy alone.", "Keep row labels stable across runs to make changes easy to scan."]
  },
  {
    id: "agent-network",
    title: "AgentNetwork",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "AgentNetwork visualizes how multiple agents or specialized workers are connected in a workflow.",
    importCode: `import { AgentNetwork } from "@atlas-ui/ai";`,
    usage: `<AgentNetwork nodes={nodes} edges={edges} />`,
    props: [["nodes", "AgentGraphNode[]", "The agents or workflow nodes."], ["edges", "AgentGraphEdge[]", "The connections between nodes."]],
    details: ["Use it when multiple agents contribute to a result and users need to understand responsibility.", "Label each agent by its job, such as Research, Retrieval, Review, or Compliance.", "Keep networks small enough to scan in one view."]
  },
  {
    id: "atlas-devtools",
    title: "AtlasDevtools",
    group: "Components",
    packageName: "@atlas-ui/ai",
    description: "AtlasDevtools gives developers an internal view of prompt, model, latency, tokens, cost, tool calls, context usage, and agent state.",
    importCode: `import { AtlasDevtools, setAtlasDevtoolsSnapshot } from "@atlas-ui/ai";`,
    usage: `<AtlasDevtools />`,
    props: [["store", "external", "Update the devtools snapshot with setAtlasDevtoolsSnapshot."]],
    details: ["Use it during development and internal debugging.", "The store follows React external-store subscription behavior.", "Avoid exposing sensitive prompts, private context, or customer data in production."]
  }
];

export const hookDocs: DocPage[] = [
  {
    id: "use-chat",
    title: "useChat",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Manages local chat messages, send behavior, regeneration, reset, and loading state.",
    importCode: `import { useChat } from "@atlas-ui/hooks";`,
    usage: `const { messages, sendMessage, isLoading } = useChat({ onSend });`,
    props: [["initialMessages", "ChatMessage[]", "Messages used to seed the conversation."], ["onSend", "function", "Runs when the user sends a message and returns assistant content."]],
    details: ["Use it when you need straightforward local chat state.", "Connect onSend to your API, server action, or mock data.", "For streaming APIs, combine it with useStreamingText or a provider-driven stream."]
  },
  {
    id: "use-streaming-text",
    title: "useStreamingText",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Reveals text over time and reports whether the reveal is still active.",
    importCode: `import { useStreamingText } from "@atlas-ui/hooks";`,
    usage: `const { displayedText, isStreaming } = useStreamingText({ text, enabled: true });`,
    props: [["text", "string", "The full text to reveal."], ["enabled", "boolean", "When true, text is revealed gradually; when false, it appears immediately."], ["intervalMs", "number", "The delay between reveal steps."]],
    details: ["Use it for demos, prototypes, or controlled streaming experiences.", "Real provider streams can drive visible content directly instead.", "Expose stop or cancel controls in production streaming flows."]
  },
  {
    id: "use-agent-trace",
    title: "useAgentTrace",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Stores agent trace steps and provides helpers to add, update, and reset them.",
    importCode: `import { useAgentTrace } from "@atlas-ui/hooks";`,
    usage: `const { trace, addStep, updateStep } = useAgentTrace();`,
    props: [["initialSteps", "TraceStep[]", "Steps used to seed the trace."]],
    details: ["Use it for local agent timeline state.", "Update steps as tools start, complete, or fail.", "Render the result with AgentTrace or TraceTimeline."]
  },
  {
    id: "use-agent-state",
    title: "useAgentState",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Tracks high-level AI workflow state and keeps a history of state transitions.",
    importCode: `import { useAgentState } from "@atlas-ui/hooks";`,
    usage: `const agent = useAgentState(); agent.transition("waiting_approval");`,
    props: [["initialState", "AgentState", "The state used when the hook first loads."]],
    details: ["States include idle, generating, tool_calling, waiting_approval, completed, and failed.", "Derived flags make status UI easier to render.", "Transition history helps developers debug workflow behavior."]
  },
  {
    id: "use-approval",
    title: "useApproval",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Manages a simple approval decision with pending, approved, rejected, and edited states.",
    importCode: `import { useApproval } from "@atlas-ui/hooks";`,
    usage: `const { status, approve, reject, markEdited } = useApproval();`,
    props: [["initialStatus", "ApprovalStatus", "The decision state used when the hook first loads."]],
    details: ["Use it for simple local approval cards.", "Use useHumanApproval when decisions need notes, timestamps, or richer audit data.", "Keep approval, rejection, and edit actions visually explicit."]
  },
  {
    id: "use-human-approval",
    title: "useHumanApproval",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Stores human approval decisions together with optional reviewer notes and timestamps.",
    importCode: `import { useHumanApproval } from "@atlas-ui/hooks";`,
    usage: `const { approval, approve, reject, edit } = useHumanApproval();`,
    props: [["initialState", "HumanApprovalState", "The initial decision, note, and timestamp values."]],
    details: ["Use it in regulated or enterprise workflows that require review context.", "Notes help reviewers explain why they approved, rejected, or edited a recommendation.", "Persist approval records server-side when audit requirements matter."]
  },
  {
    id: "use-tool-call",
    title: "useToolCall",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Tracks tool calls from start through success or failure.",
    importCode: `import { useToolCall } from "@atlas-ui/hooks";`,
    usage: `const { toolCalls, startToolCall, finishToolCall } = useToolCall();`,
    props: [["initialToolCalls", "ToolCallRecord[]", "Tool call records used to seed the state."]],
    details: ["Use it with ToolCall components to show execution status.", "Duration is calculated when a started tool is finished.", "Store useful error messages with failToolCall so users understand what failed."]
  },
  {
    id: "use-citation",
    title: "useCitation",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Maintains a citation list and the currently selected citation.",
    importCode: `import { useCitation } from "@atlas-ui/hooks";`,
    usage: `const { citations, activeCitation, setActiveCitationId } = useCitation();`,
    props: [["initialCitations", "CitationRecord[]", "Citation records used to seed the state."]],
    details: ["Use it in RAG and document-grounded interfaces.", "Keep citation ids stable so selections remain predictable.", "Pair it with Citation and EvidencePanel for source inspection."]
  },
  {
    id: "use-workflow-status",
    title: "useWorkflowStatus",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Calculates current step, progress percentage, completion, and failure state for a workflow.",
    importCode: `import { useWorkflowStatus } from "@atlas-ui/hooks";`,
    usage: `const status = useWorkflowStatus(steps);`,
    props: [["steps", "WorkflowStepStatus[]", "The ordered workflow steps to evaluate."]],
    details: ["Use it for progress indicators, review flows, and multi-step AI tasks.", "Completed percentage is derived from completed steps.", "Any failed step sets hasFailed so error UI can respond quickly."]
  },
  {
    id: "use-run-metrics",
    title: "useRunMetrics",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Summarizes run count, total tokens, total cost, and average latency across AI runs.",
    importCode: `import { useRunMetrics } from "@atlas-ui/hooks";`,
    usage: `const { runs, summary } = useRunMetrics(initialRuns);`,
    props: [["initialRuns", "RunMetric[]", "Run records used to seed the metric state."]],
    details: ["Use it in evaluation dashboards, prompt labs, and internal observability views.", "Cost is summed from the run records you provide.", "Render the summary with RunMetrics or custom cards."]
  },
  {
    id: "use-evaluation",
    title: "useEvaluation",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Stores evaluation results and derives the best accuracy and lowest cost entries.",
    importCode: `import { useEvaluation } from "@atlas-ui/hooks";`,
    usage: `const { results, bestAccuracy, lowestCost } = useEvaluation(results);`,
    props: [["initialResults", "EvaluationResult[]", "Evaluation rows used to seed the state."]],
    details: ["Use it for prompt, model, or configuration comparisons.", "Best accuracy and lowest cost are derived values.", "Pair it with PromptBenchmark for a ready-made comparison surface."]
  },
  {
    id: "use-copy-to-clipboard",
    title: "useCopyToClipboard",
    group: "Hooks",
    packageName: "@atlas-ui/hooks",
    description: "Copies text to the clipboard and exposes a short-lived copied state for user feedback.",
    importCode: `import { useCopyToClipboard } from "@atlas-ui/hooks";`,
    usage: `const { copied, copy } = useCopyToClipboard();`,
    props: [["timeoutMs", "number", "How long the copied state remains true after a copy action."]],
    details: ["Use it for copy response, copy prompt, and copy source actions.", "Clipboard access depends on browser permissions and security context.", "Show visible feedback so users know the copy action worked."]
  }
];

export const allPages = [...guideDocs, ...componentDocs, ...hookDocs];
