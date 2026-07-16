import { useState } from "react";
import { Play } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Textarea } from "@aadarshjr123/atlas-core";

export interface PromptPlaygroundProps {
  initialPrompt?: string;
  response?: string;
  metrics?: Array<{ label: string; value: string }>;
  onRun?: (prompt: string) => void;
}

export function PromptPlayground({ initialPrompt = "", response = "Run a prompt to see the response.", metrics = [], onRun }: PromptPlaygroundProps) {
  const [prompt, setPrompt] = useState(initialPrompt);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt Playground</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-3">
          <Textarea aria-label="Prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          <Button onClick={() => onRun?.(prompt)}>
            <Play size={16} />
            Run
          </Button>
        </section>
        <section className="rounded-lg border border-atlas-line bg-atlas-surface p-4">
          <p className="mb-3 text-sm font-semibold text-atlas-ink">Response</p>
          <p className="text-sm leading-6 text-atlas-muted">{response}</p>
          {metrics.length > 0 ? (
            <dl className="mt-4 grid grid-cols-3 gap-2">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-md bg-atlas-panel p-2">
                  <dt className="text-xs text-atlas-muted">{metric.label}</dt>
                  <dd className="text-sm font-semibold text-atlas-ink">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      </CardContent>
    </Card>
  );
}
