import React from "react";
import { createRoot } from "react-dom/client";
import { setAtlasDevtoolsSnapshot } from "@atlas-ui/ai";
import { App } from "./App";
import "./styles.css";

// Seed the devtools mock data
setAtlasDevtoolsSnapshot({
  prompt: "Review the Microsoft supplier quote and tell me if we should approve it.",
  model: "GPT-5",
  latencyMs: 4100,
  inputTokens: 1000,
  outputTokens: 284,
  costUsd: 0.0042,
  toolCalls: [{ id: "search", name: "Search records", status: "success" }],
  agentState: "waiting_approval",
  contextUsed: 1284,
  contextLimit: 8192
});

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
