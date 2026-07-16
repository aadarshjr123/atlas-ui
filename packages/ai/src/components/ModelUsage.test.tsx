import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ModelUsage } from "./ModelUsage";

describe("ModelUsage", () => {
  it("renders model name", () => {
    render(<ModelUsage model="GPT-5" />);
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
  });

  it("shows provider when provided", () => {
    render(<ModelUsage model="GPT-5" provider="OpenAI" />);
    expect(screen.getByText("OpenAI")).toBeInTheDocument();
  });

  it("shows default detail when no provider", () => {
    render(<ModelUsage model="Claude" />);
    expect(screen.getByText("Active model")).toBeInTheDocument();
  });
});
