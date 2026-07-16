import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/core/src/**/*.{ts,tsx}",
    "../../packages/ai/src/**/*.{ts,tsx}",
    "../../packages/hooks/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          ink: "hsl(var(--atlas-ink) / <alpha-value>)",
          muted: "hsl(var(--atlas-muted) / <alpha-value>)",
          line: "hsl(var(--atlas-line) / <alpha-value>)",
          panel: "hsl(var(--atlas-panel) / <alpha-value>)",
          surface: "hsl(var(--atlas-surface) / <alpha-value>)",
          accent: "hsl(var(--atlas-accent) / <alpha-value>)",
          accentDark: "hsl(var(--atlas-accent-dark) / <alpha-value>)",
          warn: "hsl(var(--atlas-warn) / <alpha-value>)",
          danger: "hsl(var(--atlas-danger) / <alpha-value>)"
        }
      },
      fontFamily: {
        sans: "var(--atlas-font-sans)",
        mono: "var(--atlas-font-mono)"
      },
      zIndex: {
        dropdown: "var(--atlas-z-dropdown)",
        modal: "var(--atlas-z-modal)",
        toast: "var(--atlas-z-toast)"
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};

export default config;
