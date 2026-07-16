import React, { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { ApprovalFlow, AgentTrace } from "@aadarshjr123/atlas-ai";
import { useApproval } from "@aadarshjr123/atlas-hooks";
import { Button } from "@aadarshjr123/atlas-core";
import { guideDocs } from "../data";

export function GettingStartedPage() {
  const { status: approvalDecision, approve, reject, markEdited, reset } = useApproval("pending");

  const dynamicSteps = useMemo(() => {
    return [
      { id: "extract", label: "Extract", status: "complete" as const },
      { id: "evidence", label: "Evidence", status: "complete" as const },
      {
        id: "review",
        label: "Review",
        status: approvalDecision === "pending" ? ("current" as const) : ("complete" as const)
      }
    ];
  }, [approvalDecision]);

  const dynamicTrace = useMemo(() => {
    let reviewStatus: "idle" | "running" | "success" | "error" = "running";
    let desc = "Waiting for a reviewer decision.";

    if (approvalDecision === "approved") {
      reviewStatus = "success";
      desc = "Renewal approved after human review.";
    } else if (approvalDecision === "rejected") {
      reviewStatus = "error";
      desc = "Renewal rejected after human review.";
    } else if (approvalDecision === "edited") {
      reviewStatus = "success";
      desc = "Renewal edited and adjusted by the reviewer.";
    }

    return [
      {
        id: "search",
        title: "Search records",
        description: "Found relevant policy and contract evidence.",
        status: "success" as const,
        durationMs: 250,
        inputTokens: 180,
        outputTokens: 42,
        costUsd: 0.0008
      },
      {
        id: "review",
        title: "Prepare approval",
        description: desc,
        status: reviewStatus,
        durationMs: 870,
        inputTokens: 420,
        outputTokens: 96,
        costUsd: 0.0016
      }
    ];
  }, [approvalDecision]);

  return (
    <article className="mx-auto w-full max-w-5xl">
      <section className="docs-hero overflow-hidden rounded-[1.5rem] border border-white/20 p-5 text-white shadow-2xl shadow-black/20 sm:rounded-[2rem] sm:p-8 md:p-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/75 backdrop-blur">
            <Sparkles size={14} />
            AI-native React design system
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">Atlas UI</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            A practical component system for teams building AI product experiences: chat, citations, tool calls, agent traces, human approvals, document review, observability, and evaluation.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Core", "Accessible primitives for actions, forms, overlays, and layout."],
            ["AI", "Purpose-built components for explainability, evidence, and human review."],
            ["Hooks", "Small state helpers for chat, tools, traces, approvals, and evaluations."]
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/66">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {guideDocs[0].details.map((detail) => (
          <div key={detail} className="rounded-3xl border border-atlas-line bg-atlas-panel p-5 shadow-sm">
            <p className="text-sm leading-7 text-atlas-muted">{detail}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-atlas-ink">What You Can Build</h2>
          {approvalDecision !== "pending" && (
            <Button size="sm" variant="secondary" onClick={reset}>
              Reset Flow Demo
            </Button>
          )}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-atlas-line bg-atlas-panel p-5">
            <ApprovalFlow
              title="Approve supplier renewal"
              amount="$52,000"
              steps={dynamicSteps}
              onApprove={approve}
              onReject={reject}
              onEdit={markEdited}
            />
          </div>
          <div className="rounded-3xl border border-atlas-line bg-atlas-panel p-5">
            <AgentTrace trace={dynamicTrace} showTiming showTokens showCosts replayable />
          </div>
        </div>
      </section>
    </article>
  );
}
