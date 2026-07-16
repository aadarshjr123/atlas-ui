import type { Preview } from "@storybook/react";
import { ThemeProvider } from "@aadarshjr123/atlas-core";
import "../../docs/src/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen bg-atlas-surface p-4 text-atlas-ink">
          <Story />
        </div>
      </ThemeProvider>
    )
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: "Atlas Surface",
      values: [
        { name: "Atlas Surface", value: "hsl(var(--atlas-surface))" },
        { name: "Atlas Panel", value: "hsl(var(--atlas-panel))" },
        { name: "Dark", value: "hsl(222 24% 8%)" }
      ]
    }
  }
};

export default preview;
