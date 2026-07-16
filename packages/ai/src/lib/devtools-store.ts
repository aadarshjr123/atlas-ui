export interface AtlasDevtoolsSnapshot {
  prompt: string;
  model: string;
  latencyMs: number;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  toolCalls: Array<{ id: string; name: string; status: string }>;
  agentState: string;
  contextUsed: number;
  contextLimit: number;
}

const defaultSnapshot: AtlasDevtoolsSnapshot = {
  prompt: "",
  model: "unknown",
  latencyMs: 0,
  inputTokens: 0,
  outputTokens: 0,
  costUsd: 0,
  toolCalls: [],
  agentState: "idle",
  contextUsed: 0,
  contextLimit: 0
};

let snapshot = defaultSnapshot;
const listeners = new Set<() => void>();

export function getAtlasDevtoolsSnapshot() {
  return snapshot;
}

export function subscribeAtlasDevtools(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setAtlasDevtoolsSnapshot(update: Partial<AtlasDevtoolsSnapshot>) {
  snapshot = { ...snapshot, ...update };
  listeners.forEach((listener) => listener());
}

export function resetAtlasDevtoolsSnapshot() {
  snapshot = defaultSnapshot;
  listeners.forEach((listener) => listener());
}
