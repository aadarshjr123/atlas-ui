import { describe, expect, it } from "vitest";
import { atlasColors, atlasRadii } from "./index";

describe("tokens", () => {
  it("exports atlas color and radius tokens", () => {
    expect(atlasColors.light.accent).toContain("hsl");
    expect(atlasRadii.lg).toBe("8px");
  });
});
