import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHumanApproval } from "./useHumanApproval";

describe("useHumanApproval", () => {
  it("initializes with pending decision", () => {
    const { result } = renderHook(() => useHumanApproval());
    expect(result.current.approval.decision).toBe("pending");
    expect(result.current.approval.note).toBe("");
  });

  it("approves with a note", () => {
    const { result } = renderHook(() => useHumanApproval());
    act(() => {
      result.current.approve("Looks good");
    });
    expect(result.current.approval.decision).toBe("approved");
    expect(result.current.approval.note).toBe("Looks good");
    expect(result.current.approval.decidedAt).toBeInstanceOf(Date);
  });

  it("rejects with a note", () => {
    const { result } = renderHook(() => useHumanApproval());
    act(() => {
      result.current.reject("Too expensive");
    });
    expect(result.current.approval.decision).toBe("rejected");
    expect(result.current.approval.note).toBe("Too expensive");
  });

  it("marks as edited", () => {
    const { result } = renderHook(() => useHumanApproval());
    act(() => {
      result.current.edit("Changed amount to $45,000");
    });
    expect(result.current.approval.decision).toBe("edited");
    expect(result.current.approval.note).toBe("Changed amount to $45,000");
  });

  it("resets to pending", () => {
    const { result } = renderHook(() => useHumanApproval());
    act(() => {
      result.current.approve("Done");
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.approval.decision).toBe("pending");
    expect(result.current.approval.note).toBe("");
  });
});
