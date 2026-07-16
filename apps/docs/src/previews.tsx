import React, { useState } from "react";
import {
  AgentNetwork, AgentTrace, AtlasDevtools, ApprovalCard, ApprovalFlow, Chat, Citation,
  DocumentReview, EvidencePanel, ExtractionReview, Message, PromptBenchmark,
  PromptPlayground, ReasoningBlock, RunMetrics, StreamingMessage, ToolCall
} from "@aadarshjr123/atlas-ai";
import {
  Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent,
  DialogTrigger, Input, Tabs, TabsContent, TabsList, TabsTrigger, Textarea,
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "@aadarshjr123/atlas-core";
import {
  useAgentTrace, useApproval, useChat, useEvaluation, useStreamingText, useToolCall
} from "@aadarshjr123/atlas-hooks";
import { trace, fields } from "./data";
import { CodeBlock, PlaygroundFrame, SegmentedControl } from "./components/ui";

type PreviewConfig = { controls?: React.ReactNode; preview: React.ReactNode };

function isPreviewConfig(value: React.ReactNode | PreviewConfig | undefined): value is PreviewConfig {
  return Boolean(value && typeof value === "object" && "preview" in value);
}

export function ComponentPreview({ id }: { id: string }) {
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "ghost" | "danger">("primary");
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [badgeTone, setBadgeTone] = useState<"neutral" | "success" | "warning" | "danger">("success");
  const [messageRole, setMessageRole] = useState<"user" | "assistant" | "system">("assistant");
  const [toolStatus, setToolStatus] = useState<"idle" | "running" | "success" | "error">("success");
  const [showCosts, setShowCosts] = useState(true);
  const [streaming, setStreaming] = useState(true);
  const [amount, setAmount] = useState("$52,000");
  const evidence = [
    { id: "policy", label: "1", title: "Procurement policy", description: "Renewal is allowed.", source: { title: "Policy", page: 18, excerpt: "Approved vendors may renew below $75,000." } }
  ];

  const previews: Record<string, React.ReactNode | PreviewConfig> = {
    button: {
      controls: (
        <>
          <SegmentedControl label="Variant" value={buttonVariant} options={["primary", "secondary", "ghost", "danger"]} onChange={setButtonVariant} />
          <SegmentedControl label="Size" value={buttonSize} options={["sm", "md", "lg"]} onChange={setButtonSize} />
        </>
      ),
      preview: <Button variant={buttonVariant} size={buttonSize}>Approve quote</Button>
    },
    input: <Input aria-label="Search" placeholder="Search tools..." />,
    textarea: <Textarea aria-label="Note" placeholder="Write a reviewer note..." />,
    dialog: (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open source</Button>
        </DialogTrigger>
        <DialogContent title="Source" description="Citation source details">
          <p className="text-sm text-atlas-muted">Annual Report, page 18.</p>
        </DialogContent>
      </Dialog>
    ),
    tooltip: (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful context</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    badge: {
      controls: <SegmentedControl label="Tone" value={badgeTone} options={["neutral", "success", "warning", "danger"]} onChange={setBadgeTone} />,
      preview: <Badge tone={badgeTone}>{badgeTone === "success" ? "High confidence" : badgeTone === "warning" ? "Needs review" : badgeTone === "danger" ? "Blocked" : "Queued"}</Badge>
    },
    card: (
      <Card className="max-w-sm">
        <CardHeader><CardTitle>Review card</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-atlas-muted">A focused content surface.</p></CardContent>
      </Card>
    ),
    tabs: (
      <Tabs defaultValue="source">
        <TabsList><TabsTrigger value="source">Source</TabsTrigger><TabsTrigger value="risk">Risk</TabsTrigger></TabsList>
        <TabsContent value="source"><p className="text-sm text-atlas-muted">Source content.</p></TabsContent>
        <TabsContent value="risk"><p className="text-sm text-atlas-muted">Risk content.</p></TabsContent>
      </Tabs>
    ),
    chat: <Chat><Message author="user">Review this quote.</Message><Message author="assistant">Approved with finance review.</Message></Chat>,
    message: {
      controls: <SegmentedControl label="Role" value={messageRole} options={["assistant", "user", "system"]} onChange={setMessageRole} />,
      preview: <Message author={messageRole}>{messageRole === "user" ? "Can we approve this renewal?" : messageRole === "system" ? "Finance review mode is enabled." : "The quote matches the active contract."}</Message>
    },
    "streaming-message": {
      controls: <SegmentedControl label="State" value={streaming ? "streaming" : "done"} options={["streaming", "done"]} onChange={(next) => setStreaming(next === "streaming")} />,
      preview: <StreamingMessage isStreaming={streaming} content="Analyzing documents and preparing recommendation..." />
    },
    citation: <p className="text-sm text-atlas-ink">Revenue increased by 32% <Citation label="1" source={{ title: "Annual Report", page: 18, excerpt: "Revenue increased by 32%." }} /></p>,
    "tool-call": {
      controls: <SegmentedControl label="Status" value={toolStatus} options={["idle", "running", "success", "error"]} onChange={setToolStatus} />,
      preview: <ToolCall name="Search vendor records" status={toolStatus} durationMs={toolStatus === "running" ? undefined : 430} resultSummary={toolStatus === "error" ? "Provider timeout" : "12 records"} />
    },
    "agent-trace": {
      controls: <SegmentedControl label="Cost" value={showCosts ? "shown" : "hidden"} options={["shown", "hidden"]} onChange={(next) => setShowCosts(next === "shown")} />,
      preview: <AgentTrace trace={trace} showTiming showTokens showCosts={showCosts} replayable />
    },
    "approval-card": {
      controls: (
        <label className="grid gap-2 text-xs font-medium uppercase tracking-wide text-atlas-muted">
          Amount
          <Input className="h-9 w-36" value={amount} onChange={(event) => setAmount(event.target.value)} aria-label="Approval amount" />
        </label>
      ),
      preview: <ApprovalCard title="Approve refund" amount={amount} description="Customer meets refund policy." />
    },
    "approval-flow": <ApprovalFlow title="Approve renewal" amount={amount} steps={[{ id: "extract", label: "Extract", status: "complete" }, { id: "review", label: "Review", status: "current" }, { id: "approve", label: "Approve", status: "pending" }]} />,
    "document-review": <DocumentReview documentTitle="Invoice.pdf" fields={fields} />,
    "extraction-review": <ExtractionReview fields={fields} />,
    "prompt-playground": <PromptPlayground initialPrompt="Review this quote." response="Approval recommended after finance review." metrics={[{ label: "Latency", value: "4.1s" }, { label: "Tokens", value: "1,284" }]} />,
    "evidence-panel": <EvidencePanel items={evidence} />,
    "reasoning-block": <ReasoningBlock>Approval is recommended because the supplier is approved and the quote matches contract terms.</ReasoningBlock>,
    "run-metrics": {
      controls: <SegmentedControl label="Cost" value={showCosts ? "shown" : "hidden"} options={["shown", "hidden"]} onChange={(next) => setShowCosts(next === "shown")} />,
      preview: <RunMetrics model="GPT-5" provider="OpenAI" latencyMs={4100} inputTokens={1000} outputTokens={284} costUsd={showCosts ? 0.0042 : 0} contextLimit={8192} />
    },
    "prompt-benchmark": <PromptBenchmark results={[{ id: "gpt-5", model: "GPT-5", prompt: "Approval v3", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 }, { id: "claude", model: "Claude", prompt: "Approval v3", accuracy: 89, latencyMs: 4600, costUsd: 0.0039 }]} />,
    "agent-network": <AgentNetwork nodes={[{ id: "research", label: "Research Agent", role: "Finds evidence" }, { id: "analysis", label: "Analysis Agent", role: "Checks risk" }, { id: "approval", label: "Approval Agent", role: "Prepares action" }]} edges={[{ from: "research", to: "analysis" }, { from: "analysis", to: "approval" }]} />,
    "atlas-devtools": <AtlasDevtools />
  };

  const item = previews[id];
  const normalized = isPreviewConfig(item) ? item : { preview: item };

  return (
    <PlaygroundFrame controls={normalized?.controls}>
      {normalized?.preview ?? <p className="text-sm text-atlas-muted">Preview coming soon.</p>}
    </PlaygroundFrame>
  );
}

function UseChatDemo() {
  const chat = useChat({
    initialMessages: [{ id: "welcome", role: "assistant", content: "Drop in a task and I will produce a review summary.", createdAt: new Date() }],
    onSend: async (message) => `Reviewed "${message.content}". I found 3 supporting sources and 1 approval step.`
  });
  const [draft, setDraft] = useState("Check the Microsoft renewal");

  return (
    <div className="grid gap-4">
      <Chat>
        {chat.messages.map((message) => (
          <Message key={message.id} author={message.role}>{message.content}</Message>
        ))}
      </Chat>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input value={draft} onChange={(event) => setDraft(event.target.value)} aria-label="Chat prompt" />
        <Button onClick={() => void chat.sendMessage(draft)} disabled={!draft.trim() || chat.isLoading}>Send</Button>
        <Button variant="secondary" onClick={chat.reset}>Reset</Button>
      </div>
    </div>
  );
}

function UseToolCallDemo() {
  const tools = useToolCall([{ id: "search", name: "Search contracts", status: "success", durationMs: 430, resultSummary: "12 records" }]);

  const runTool = () => {
    const id = `tool-${Date.now()}`;
    tools.startToolCall(id, "Check vendor risk");
    window.setTimeout(() => tools.finishToolCall(id, "Risk score: low"), 900);
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={runTool}>Run tool</Button>
        <Button variant="secondary" onClick={() => tools.setToolCalls([])}>Clear</Button>
      </div>
      <div className="grid gap-3">
        {tools.toolCalls.map((tool) => (
          <ToolCall key={tool.id} name={tool.name} status={tool.status} durationMs={tool.durationMs} resultSummary={tool.resultSummary ?? tool.errorMessage} />
        ))}
      </div>
    </div>
  );
}

function UseEvaluationDemo() {
  const evaluation = useEvaluation([
    { id: "approval-v2", label: "Approval v2", model: "GPT-4.1", accuracy: 86, latencyMs: 5200, costUsd: 0.0038 },
    { id: "approval-v3", label: "Approval v3", model: "GPT-5", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
    { id: "fast-check", label: "Fast check", model: "GPT-4.1 mini", accuracy: 81, latencyMs: 1800, costUsd: 0.0011 }
  ]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-atlas-line bg-atlas-panel p-4">
          <p className="text-xs uppercase text-atlas-muted">Best accuracy</p>
          <p className="mt-1 text-lg font-semibold text-atlas-ink">{evaluation.bestAccuracy?.label}</p>
          <p className="text-sm text-atlas-muted">{evaluation.bestAccuracy?.accuracy}% on {evaluation.bestAccuracy?.model}</p>
        </div>
        <div className="rounded-2xl border border-atlas-line bg-atlas-panel p-4">
          <p className="text-xs uppercase text-atlas-muted">Lowest cost</p>
          <p className="mt-1 text-lg font-semibold text-atlas-ink">{evaluation.lowestCost?.label}</p>
          <p className="text-sm text-atlas-muted">${evaluation.lowestCost?.costUsd.toFixed(4)} per run</p>
        </div>
      </div>
      <PromptBenchmark results={evaluation.results.map((result) => ({ id: result.id, model: result.model, prompt: result.label, accuracy: result.accuracy, latencyMs: result.latencyMs, costUsd: result.costUsd }))} />
    </div>
  );
}

function UseAgentTraceDemo() {
  const agent = useAgentTrace(trace);
  const addStep = () => {
    agent.addStep({ id: `step-${Date.now()}`, title: "Notify reviewer", description: "Sent approval task to finance.", status: "success", durationMs: 210 });
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={addStep}>Add step</Button>
        <Button variant="secondary" onClick={agent.resetTrace}>Reset</Button>
      </div>
      <AgentTrace trace={agent.trace} showTiming replayable />
    </div>
  );
}

function UseApprovalDemo() {
  const approval = useApproval();
  return (
    <div className="grid gap-4">
      <div className="rounded-2xl border border-atlas-line bg-atlas-panel p-4">
        <p className="text-xs uppercase text-atlas-muted">Current status</p>
        <p className="mt-1 text-2xl font-semibold capitalize text-atlas-ink">{approval.status}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={approval.approve}>Approve</Button>
        <Button variant="danger" onClick={approval.reject}>Reject</Button>
        <Button variant="secondary" onClick={approval.markEdited}>Mark edited</Button>
        <Button variant="ghost" onClick={approval.reset}>Reset</Button>
      </div>
    </div>
  );
}

function UseStreamingTextDemo() {
  const [enabled, setEnabled] = useState(true);
  const stream = useStreamingText({ text: "Atlas streams model output into a stable message surface while preserving loading state.", enabled, intervalMs: 22 });

  return (
    <div className="grid gap-4">
      <Button variant="secondary" onClick={() => setEnabled((current) => !current)}>{enabled ? "Show immediately" : "Stream text"}</Button>
      <StreamingMessage isStreaming={stream.isStreaming} content={stream.displayedText} />
    </div>
  );
}

export function HookPreview({ id }: { id: string }) {
  const demos: Record<string, React.ReactNode> = {
    "use-chat": <UseChatDemo />,
    "use-tool-call": <UseToolCallDemo />,
    "use-evaluation": <UseEvaluationDemo />,
    "use-agent-trace": <UseAgentTraceDemo />,
    "use-approval": <UseApprovalDemo />,
    "use-human-approval": <UseApprovalDemo />,
    "use-streaming-text": <UseStreamingTextDemo />,
    "use-agent-state": <UseAgentTraceDemo />,
    "use-citation": <EvidencePanel items={[{ id: "source", label: "1", title: "Annual Report", description: "Selected citation state can drive the detail panel.", source: { title: "Annual Report", page: 18 } }]} />,
    "use-workflow-status": <ApprovalFlow title="Approve renewal" amount="$52,000" steps={[{ id: "extract", label: "Extract", status: "complete" }, { id: "review", label: "Review", status: "current" }, { id: "approve", label: "Approve", status: "pending" }]} />,
    "use-run-metrics": <RunMetrics model="GPT-5" provider="OpenAI" latencyMs={4100} inputTokens={1000} outputTokens={284} costUsd={0.0042} contextLimit={8192} />,
    "use-copy-to-clipboard": <CodeBlock>{`const { copied, copy } = useCopyToClipboard();\ncopy("Approval summary");`}</CodeBlock>
  };

  return (
    <PlaygroundFrame>
      {demos[id] ?? <p className="text-sm text-atlas-muted">Interactive demo coming soon.</p>}
    </PlaygroundFrame>
  );
}
