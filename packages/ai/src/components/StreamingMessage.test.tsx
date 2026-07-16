import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StreamingMessage } from "./StreamingMessage";

describe("StreamingMessage", () => {
  it("renders content text", () => {
    render(<StreamingMessage content="Analyzing documents..." />);
    expect(screen.getByText("Analyzing documents...")).toBeInTheDocument();
  });

  it("shows streaming cursor when isStreaming is true", () => {
    render(<StreamingMessage content="Thinking..." isStreaming />);
    expect(screen.getByText("Thinking... ▍")).toBeInTheDocument();
  });

  it("hides streaming cursor when isStreaming is false", () => {
    render(<StreamingMessage content="Done." isStreaming={false} />);
    expect(screen.getByText("Done.")).toBeInTheDocument();
    expect(screen.queryByText("Done. ▍")).not.toBeInTheDocument();
  });
});
