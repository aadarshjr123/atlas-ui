import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useChat } from "./useChat";

describe("useChat", () => {
  it("adds user and assistant messages", async () => {
    const onSend = vi.fn().mockResolvedValue("Approved after review.");
    const { result } = renderHook(() => useChat({ onSend }));

    await act(async () => {
      await result.current.sendMessage("Review quote");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].role).toBe("user");
    expect(result.current.messages[1].content).toBe("Approved after review.");
  });
});
