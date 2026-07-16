# @atlas-ui/tokens

Design tokens for Atlas UI.

## Install

```sh
pnpm add @atlas-ui/tokens
```

```ts
import { atlasColors, atlasRadii } from "@atlas-ui/tokens";
```

## Usage

```ts
import { atlasColors, atlasRadii, atlasSpacing } from "@atlas-ui/tokens";

export const theme = {
  colors: atlasColors,
  radii: atlasRadii,
  spacing: atlasSpacing
};
```

Use tokens when you need Atlas values outside Tailwind or component code, such as chart configuration, design tooling, or custom CSS-in-JS themes.
