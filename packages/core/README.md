# @atlas-ui/core

Accessible React primitives used by Atlas UI.

## Install

```sh
pnpm add @atlas-ui/core
```

React and React DOM are peer dependencies.

```tsx
import { Button, Dialog, Tabs } from "@atlas-ui/core";
```

## Included

`Button`, `Input`, `Textarea`, `Dialog`, `Tooltip`, `Badge`, `Card`, and `Tabs`.

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@atlas-ui/core";

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
