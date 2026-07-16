import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import React from "react";
import { Chat, Message } from "@atlas-ui/ai";
import { App } from "./App";

describe("docs app smoke", () => {
  beforeEach(() => {
    window.location.hash = "";
    document.documentElement.classList.remove("light", "dark");
  });

  afterEach(() => {
    cleanup();
  });

  it("renders Atlas AI chat components", () => {
    render(
      <Chat>
        <Message author="user">Hello Atlas</Message>
      </Chat>
    );

    expect(screen.getByRole("article")).toHaveTextContent("Hello Atlas");
  });

  it("renders separate docs navigation for guides, components, and hooks", async () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Installation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Button" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "useChat" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "Atlas UI" })).toBeInTheDocument();
  });

  it("filters navigation and shows a useful empty state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("Search documentation"), "approvalcard");
    expect(screen.getByRole("link", { name: "ApprovalCard" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Button" })).not.toBeInTheDocument();

    await user.clear(screen.getByLabelText("Search documentation"));
    await user.type(screen.getByLabelText("Search documentation"), "zzzzzz");
    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.queryByText("Components")).not.toBeInTheDocument();
  });

  it("toggles the dark theme on the document root", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Toggle color theme" }));
    expect(document.documentElement).toHaveClass("dark");
  });

  it("renders the installation guide with multiple package manager commands", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("link", { name: "Installation" }));
    expect(await screen.findByRole("heading", { name: "Installation" })).toBeInTheDocument();
    expect(screen.getByText("pnpm add @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens")).toBeInTheDocument();
    expect(screen.getByText("npm install @atlas-ui/core @atlas-ui/ai @atlas-ui/hooks @atlas-ui/tokens")).toBeInTheDocument();
    expect(screen.getByText("Choose Packages")).toBeInTheDocument();
  });

  it("lets component playground controls update the preview state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("link", { name: "Badge" }));
    expect(await screen.findByText("High confidence")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "danger" }));
    await waitFor(() => expect(screen.getByText("Blocked")).toBeInTheDocument());
  });
});
