import { Check, Clock, FileText, ShieldCheck } from "lucide-react";
import { ApprovalCard } from "./ApprovalCard";
import { Badge, Card, CardContent, CardHeader, CardTitle, cn } from "@aadarshjr123/atlas-core";

export interface ApprovalFlowStep {
  id: string;
  label: string;
  status: "complete" | "current" | "pending";
}

export interface ApprovalFlowProps {
  title: string;
  description?: string;
  amount?: string;
  steps: ApprovalFlowStep[];
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
}

export function ApprovalFlow({ title, description, amount, steps, onApprove, onReject, onEdit }: ApprovalFlowProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Flow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="grid gap-2 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.id}
              className={cn(
                "rounded-lg border p-3",
                step.status === "current" ? "border-atlas-accent bg-atlas-accent/10" : "border-atlas-line bg-atlas-panel"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-atlas-ink whitespace-nowrap">{step.label}</span>
                {step.status === "complete" ? <Check size={16} className="text-atlas-ink shrink-0" /> : step.status === "current" ? <ShieldCheck size={16} className="text-atlas-accent shrink-0" /> : <Clock size={16} className="text-atlas-muted shrink-0" />}
              </div>
              <Badge className="mt-2" tone={step.status === "complete" ? "success" : step.status === "current" ? "warning" : "neutral"}>
                {step.status}
              </Badge>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-2 rounded-lg border border-atlas-line bg-atlas-surface p-3 text-sm text-atlas-muted">
          <FileText size={16} />
          Human review is required before this workflow can complete.
        </div>
        <ApprovalCard title={title} description={description} amount={amount} onApprove={onApprove} onReject={onReject} onEdit={onEdit} />
      </CardContent>
    </Card>
  );
}
