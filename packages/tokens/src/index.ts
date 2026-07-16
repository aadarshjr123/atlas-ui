export const atlasColors = {
  light: {
    ink: "hsl(220 18% 12%)",
    muted: "hsl(220 10% 45%)",
    line: "hsl(220 14% 88%)",
    panel: "hsl(0 0% 100%)",
    surface: "hsl(210 25% 97%)",
    accent: "hsl(175 72% 36%)",
    accentDark: "hsl(175 70% 24%)",
    warn: "hsl(42 91% 48%)",
    danger: "hsl(0 74% 55%)"
  },
  dark: {
    ink: "hsl(210 30% 96%)",
    muted: "hsl(215 14% 70%)",
    line: "hsl(218 16% 24%)",
    panel: "hsl(222 22% 12%)",
    surface: "hsl(222 24% 8%)",
    accent: "hsl(175 70% 42%)",
    accentDark: "hsl(175 72% 36%)",
    warn: "hsl(42 91% 58%)",
    danger: "hsl(0 88% 70%)"
  }
} as const;

export const atlasTypography = {
  fonts: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  sizes: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }]
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  }
} as const;

export const atlasSpacing = {
  0: "0px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem"
} as const;

export const atlasRadii = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px"
} as const;

export const atlasShadows = {
  sm: "0 1px 2px rgb(15 23 42 / 0.08)",
  md: "0 12px 30px rgb(15 23 42 / 0.12)",
  lg: "0 20px 40px rgb(15 23 42 / 0.15)"
} as const;

export const atlasZIndex = {
  base: "0",
  elevated: "10",
  dropdown: "40",
  modal: "50",
  toast: "100"
} as const;
