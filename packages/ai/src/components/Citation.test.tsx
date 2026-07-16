import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Citation } from "./Citation";

describe("Citation", () => {
  it("opens source metadata in a dialog", async () => {
    const user = userEvent.setup();

    render(
      <Citation
        label="1"
        source={{
          title: "Annual Report",
          page: 18,
          excerpt: "Revenue increased by 32%."
        }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Open citation 1" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Annual Report")).toBeInTheDocument();
    expect(screen.getByText("Page 18")).toBeInTheDocument();
  });
});
