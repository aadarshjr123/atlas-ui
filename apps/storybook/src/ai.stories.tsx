import type { Meta, StoryObj } from "@storybook/react";
import {
  AgentTrace,
  AgentNetwork,
  ApprovalCard,
  ApprovalFlow,
  AtlasDevtools,
  Chat,
  ConfidenceScore,
  DocumentReview,
  EvidencePanel,
  ExtractionReview,
  Message,
  PromptPlayground,
  PromptBenchmark,
  ReasoningBlock,
  RunMetrics,
  setAtlasDevtoolsSnapshot,
  StreamingMessage,
  ToolCall,
  TraceTimeline
} from "@atlas-ui/ai";

const meta = {
  title: "AI/Product Workflows",
  component: Chat,
  parameters: {
    docs: {
      description: {
        component: "AI-native product workflows for chat, evidence, tool calls, approval, observability, and prompt evaluation."
      }
    }
  }
} satisfies Meta<typeof Chat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProcurementReview: Story = {
  render: () => (
    <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Chat>
        <Message author="user">Review this supplier quote.</Message>
        <StreamingMessage content="The supplier quote is within the approval threshold and matches the current agreement." isStreaming />
      </Chat>
      <div className="space-y-4">
        <ToolCall name="Search supplier records" status="success" durationMs={430} resultSummary="12 records" />
        <AgentTrace
          trace={[
            { id: "1", title: "Search records", status: "success", durationMs: 250 },
            { id: "2", title: "Compare contract", status: "success", durationMs: 730 },
            { id: "3", title: "Prepare approval", status: "running" }
          ]}
        />
        <ConfidenceScore value={94} />
        <ApprovalCard title="Approve supplier quote" amount="$52,000" />
      </div>
    </div>
  )
};

export const WorkflowLayer: Story = {
  render: () => {
    const fields = [
      { id: "supplier", label: "Supplier", extractedValue: "Microsoft", value: "Microsoft", confidence: 98 },
      { id: "amount", label: "Amount", extractedValue: "$52,000", value: "$52,000", confidence: 94 },
      { id: "term", label: "Term", extractedValue: "12 months", value: "12 months", confidence: 91 }
    ];

    const steps = [
      { id: "extract", label: "Extract data", status: "complete" as const },
      { id: "review", label: "Human review", status: "current" as const },
      { id: "approve", label: "Approve action", status: "pending" as const }
    ];

    const trace = [
      { id: "retrieve", title: "Retrieve policy", description: "Found procurement policy.", status: "success" as const, durationMs: 240 },
      { id: "extract", title: "Extract quote fields", description: "Supplier and amount detected.", status: "success" as const, durationMs: 520 },
      { id: "review", title: "Wait for approval", description: "Human review is required.", status: "running" as const }
    ];

    return (
      <div className="mx-auto grid max-w-6xl gap-4">
        <DocumentReview documentTitle="Microsoft-renewal-quote.pdf" fields={fields} />
        <ExtractionReview fields={fields} />
        <ApprovalFlow title="Approve Microsoft renewal quote" amount="$52,000" steps={steps} />
        <div className="grid gap-4 lg:grid-cols-2">
          <EvidencePanel
            items={[
              {
                id: "policy",
                label: "1",
                title: "Procurement policy",
                description: "Renewal is allowed below the approval threshold.",
                source: { title: "Procurement Policy", page: 18, excerpt: "Approved vendor renewals may proceed below $75,000." }
              }
            ]}
          />
          <ReasoningBlock>
            Supplier, quote amount, and renewal term are consistent with the active contract. Approval is recommended after finance review.
          </ReasoningBlock>
        </div>
        <TraceTimeline steps={trace} />
        <PromptPlayground
          initialPrompt="Review this supplier quote."
          response="The quote matches the contract and should be approved after finance review."
          metrics={[
            { label: "Latency", value: "4.1s" },
            { label: "Tokens", value: "1,284" },
            { label: "Cost", value: "$0.004" }
          ]}
        />
      </div>
    );
  }
};

export const PlatformFeatures: Story = {
  render: () => {
    setAtlasDevtoolsSnapshot({
      prompt: "Review the supplier renewal and compare model outputs.",
      model: "GPT-5",
      latencyMs: 4100,
      inputTokens: 1000,
      outputTokens: 284,
      costUsd: 0.0042,
      toolCalls: [
        { id: "search", name: "Search supplier records", status: "success" },
        { id: "compare", name: "Compare contract", status: "success" }
      ],
      agentState: "waiting_approval",
      contextUsed: 1284,
      contextLimit: 8192
    });

    const trace = [
      {
        id: "retrieve",
        title: "Retrieve policy",
        description: "Found procurement policy.",
        status: "success" as const,
        durationMs: 240,
        inputTokens: 180,
        outputTokens: 42,
        costUsd: 0.0008
      },
      {
        id: "extract",
        title: "Extract quote fields",
        description: "Supplier and amount detected.",
        status: "success" as const,
        durationMs: 520,
        inputTokens: 420,
        outputTokens: 96,
        costUsd: 0.0016
      },
      {
        id: "review",
        title: "Wait for approval",
        description: "Human review is required.",
        status: "running" as const,
        inputTokens: 684,
        outputTokens: 146,
        costUsd: 0.0018
      }
    ];

    const benchmarkResults = [
      { id: "gpt-5", model: "GPT-5", prompt: "Procurement approval v3", accuracy: 92, latencyMs: 4100, costUsd: 0.0042 },
      { id: "claude", model: "Claude", prompt: "Procurement approval v3", accuracy: 89, latencyMs: 4600, costUsd: 0.0039 },
      { id: "gemini", model: "Gemini", prompt: "Procurement approval v3", accuracy: 87, latencyMs: 3900, costUsd: 0.0034 }
    ];

    return (
      <div className="mx-auto grid max-w-6xl gap-4">
        <RunMetrics model="GPT-5" provider="OpenAI" latencyMs={4100} inputTokens={1000} outputTokens={284} costUsd={0.0042} contextLimit={8192} />
        <div className="grid gap-4 lg:grid-cols-2">
          <AgentTrace trace={trace} showTiming showTokens showCosts replayable />
          <AgentNetwork
            nodes={[
              { id: "research", label: "Research Agent", role: "Retrieves policies" },
              { id: "analysis", label: "Analysis Agent", role: "Compares contract" },
              { id: "approval", label: "Approval Agent", role: "Prepares decision" }
            ]}
            edges={[
              { from: "research", to: "analysis" },
              { from: "analysis", to: "approval" }
            ]}
          />
        </div>
        <PromptBenchmark results={benchmarkResults} />
        <AtlasDevtools />
      </div>
    );
  }
};
