import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@aadarshjr123/atlas-core";

const meta = {
  title: "Core/Product Grade",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "Core primitives shown in realistic review, approval, form, tab, dialog, and tooltip contexts."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReviewToolbar: Story = {
  render: () => (
    <div className="mx-auto grid max-w-5xl gap-5">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>Supplier renewal review</CardTitle>
              <p className="mt-1 text-sm text-atlas-muted">Use button variants to communicate action priority and risk.</p>
            </div>
            <Badge tone="warning">Needs review</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <Button>Approve quote</Button>
            <Button variant="secondary">Edit terms</Button>
            <Button variant="ghost">Save draft</Button>
            <Button variant="danger">Reject</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input aria-label="Supplier" defaultValue="Microsoft" />
            <Input aria-label="Amount" defaultValue="$52,000" />
          </div>
          <Textarea aria-label="Reviewer note" defaultValue="Quote matches the active vendor agreement. Finance approval is still required." />
        </CardContent>
      </Card>
    </div>
  )
};

export const NavigationAndDisclosure: Story = {
  render: () => (
    <div className="mx-auto grid max-w-5xl gap-5">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-atlas-muted">Tabs keep related review panels in one keyboard-navigable surface.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="evidence">
          <Card>
            <CardHeader><CardTitle>Evidence</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-atlas-muted">Policy page 18 confirms approved vendor renewals below $75,000.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="risk">
          <Card>
            <CardHeader><CardTitle>Risk</CardTitle></CardHeader>
            <CardContent className="text-sm leading-6 text-atlas-muted">Low operational risk. Requires finance review before completion.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Open source dialog</Button>
          </DialogTrigger>
          <DialogContent title="Procurement policy" description="Source details for the renewal threshold">
            <p className="text-sm leading-6 text-atlas-muted">Approved vendor renewals may proceed below $75,000 after finance review.</p>
          </DialogContent>
        </Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Confidence</Button>
            </TooltipTrigger>
            <TooltipContent>Confidence combines extraction quality and source coverage.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
};
