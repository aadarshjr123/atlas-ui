import { useCallback, useState } from "react";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "edited";

export function useApproval(initialStatus: ApprovalStatus = "pending") {
  const [status, setStatus] = useState<ApprovalStatus>(initialStatus);

  const approve = useCallback(() => setStatus("approved"), []);
  const reject = useCallback(() => setStatus("rejected"), []);
  const markEdited = useCallback(() => setStatus("edited"), []);
  const reset = useCallback(() => setStatus("pending"), []);

  return { status, approve, reject, markEdited, reset };
}
