import { AgentGraph, type AgentGraphProps } from "./AgentGraph";

export function AgentNetwork(props: AgentGraphProps) {
  return <AgentGraph {...props} className={props.className} />;
}
