import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useApproval } from "./useApproval";

describe("useApproval", () => {
  it("moves approval status through decisions", () => {
    const { result } = renderHook(() => useApproval());
    expect(result.current.status).toBe("pending");

    act(() => result.current.approve());
    expect(result.current.status).toBe("approved");

    act(() => result.current.reset());
    expect(result.current.status).toBe("pending");
  });
});
