# @aadarshjr123/atlas-core

Accessible React primitives used by Atlas UI.

## Install

```sh
pnpm add @aadarshjr123/atlas-core
```

React and React DOM are peer dependencies.

```tsx
import { Button, Dialog, Tabs } from "@aadarshjr123/atlas-core";
```

## Included

`Button`, `Input`, `Textarea`, `Dialog`, `Tooltip`, `Badge`, `Card`, and `Tabs`.

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@aadarshjr123/atlas-core";

export function ReviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier renewal</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Approve quote</Button>
      </CardContent>
    </Card>
  );
}
```

## Accessibility

Dialog, Tabs, and Tooltip are built on Radix primitives. Keep labels explicit, provide dialog titles, and add accessible labels for icon-only controls.
