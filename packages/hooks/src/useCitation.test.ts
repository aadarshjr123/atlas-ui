import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCitation } from "./useCitation";

describe("useCitation", () => {
  const initialCitations = [
    { id: "c1", label: "1", title: "Annual Report", excerpt: "Revenue increased.", page: 18 }
  ];

  it("initializes with provided citations", () => {
    const { result } = renderHook(() => useCitation(initialCitations));
    expect(result.current.citations).toHaveLength(1);
    expect(result.current.activeCitationId).toBe("c1");
  });

  it("initializes empty by default", () => {
    const { result } = renderHook(() => useCitation());
    expect(result.current.citations).toHaveLength(0);
    expect(result.current.activeCitationId).toBeNull();
  });

  it("adds a citation", () => {
    const { result } = renderHook(() => useCitation());
    act(() => {
      result.current.addCitation({ id: "c2", label: "2", title: "Contract" });
    });
    expect(result.current.citations).toHaveLength(1);
    expect(result.current.activeCitationId).toBe("c2");
  });

  it("removes a citation", () => {
    const { result } = renderHook(() => useCitation(initialCitations));
    act(() => {
      result.current.removeCitation("c1");
    });
    expect(result.current.citations).toHaveLength(0);
    expect(result.current.activeCitationId).toBeNull();
  });

  it("sets active citation", () => {
    const citations = [
      { id: "c1", label: "1", title: "Report" },
      { id: "c2", label: "2", title: "Contract" }
    ];
    const { result } = renderHook(() => useCitation(citations));
    act(() => {
      result.current.setActiveCitationId("c2");
    });
    expect(result.current.activeCitation?.title).toBe("Contract");
  });
});
