import { useCallback, useState } from "react";

export type HumanApprovalDecision = "pending" | "approved" | "rejected" | "edited";

export interface HumanApprovalState {
  decision: HumanApprovalDecision;
  note: string;
  decidedAt?: Date;
}

export function useHumanApproval(initialState: HumanApprovalState = { decision: "pending", note: "" }) {
  const [approval, setApproval] = useState<HumanApprovalState>(initialState);

  const approve = useCallback((note = "") => {
    setApproval({ decision: "approved", note, decidedAt: new Date() });
  }, []);

  const reject = useCallback((note = "") => {
    setApproval({ decision: "rejected", note, decidedAt: new Date() });
  }, []);

  const edit = useCallback((note: string) => {
    setApproval({ decision: "edited", note, decidedAt: new Date() });
  }, []);

  const reset = useCallback(() => setApproval({ decision: "pending", note: "" }), []);

  return { approval, approve, reject, edit, reset };
}
