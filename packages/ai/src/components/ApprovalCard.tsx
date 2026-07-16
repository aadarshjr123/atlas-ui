import { Check, Pencil, X } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@aadarshjr123/atlas-core";

export interface ApprovalCardProps {
  title: string;
  description?: string;
  amount?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onEdit?: () => void;
}

export function ApprovalCard({ title, description, amount, onApprove, onReject, onEdit }: ApprovalCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Action</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-atlas-ink">{title}</p>
          {description ? <p className="mt-1 text-sm text-atlas-muted">{description}</p> : null}
          {amount ? <p className="mt-3 text-2xl font-semibold text-atlas-ink">{amount}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={onApprove}>
            <Check size={16} />
            Approve
          </Button>
          <Button onClick={onReject} variant="danger">
            <X size={16} />
            Reject
          </Button>
          <Button onClick={onEdit} variant="secondary">
            <Pencil size={16} />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
