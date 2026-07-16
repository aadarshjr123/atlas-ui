import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useStreamingText } from "./useStreamingText";

describe("useStreamingText", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("shows full text immediately when disabled", () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: "Hello world", enabled: false })
    );
    expect(result.current.displayedText).toBe("Hello world");
    expect(result.current.isStreaming).toBe(false);
  });

  it("starts empty when enabled", () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: "Hello", enabled: true, intervalMs: 50 })
    );
    expect(result.current.displayedText).toBe("");
    expect(result.current.isStreaming).toBe(true);
  });

  it("reveals text character by character", () => {
    const { result } = renderHook(() =>
      useStreamingText({ text: "Hi", enabled: true, intervalMs: 50 })
    );

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.displayedText).toBe("H");

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.displayedText).toBe("Hi");
    expect(result.current.isStreaming).toBe(false);
  });

  it("cleans up interval on unmount", () => {
    const clearSpy = vi.spyOn(window, "clearInterval");
    const { unmount } = renderHook(() =>
      useStreamingText({ text: "Test", enabled: true, intervalMs: 50 })
    );
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
