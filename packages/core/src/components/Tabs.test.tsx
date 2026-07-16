import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

describe("Tabs", () => {
  it("switches visible tab content", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="source">
        <TabsList>
          <TabsTrigger value="source">Source</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>
        <TabsContent value="source">Source content</TabsContent>
        <TabsContent value="risk">Risk content</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Source content")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Risk" }));

    expect(screen.getByText("Risk content")).toBeInTheDocument();
  });

  it("moves between tabs with arrow keys", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="source">
        <TabsList>
          <TabsTrigger value="source">Source</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="source">Source content</TabsContent>
        <TabsContent value="risk">Risk content</TabsContent>
        <TabsContent value="code">Code content</TabsContent>
      </Tabs>
    );

    screen.getByRole("tab", { name: "Source" }).focus();
    await user.keyboard("{ArrowRight}");

    await waitFor(() => expect(screen.getByRole("tab", { name: "Risk" })).toHaveFocus());

    await user.keyboard("{ArrowRight}");

    await waitFor(() => expect(screen.getByRole("tab", { name: "Code" })).toHaveFocus());
  });
});
