# @aadarshjr123/atlas-tokens

Design tokens for Atlas UI.

## Install

```sh
pnpm add @aadarshjr123/atlas-tokens
```

```ts
import { atlasColors, atlasRadii } from "@aadarshjr123/atlas-tokens";
```

## Usage

```ts
import { atlasColors, atlasRadii, atlasSpacing } from "@aadarshjr123/atlas-tokens";

export const theme = {
  colors: atlasColors,
  radii: atlasRadii,
  spacing: atlasSpacing
};
```

Use tokens when you need Atlas values outside Tailwind or component code, such as chart configuration, design tooling, or custom CSS-in-JS themes.
