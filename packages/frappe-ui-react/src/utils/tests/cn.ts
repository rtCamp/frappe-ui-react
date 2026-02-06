import "@testing-library/jest-dom";

import { cn } from "../cn";

describe("cn", () => {
  it("should return empty string when no arguments provided", () => {
    expect(cn()).toBe("");
  });

  it("should return single class name", () => {
    expect(cn("px-4")).toBe("px-4");
  });

  it("should concatenate multiple class names", () => {
    expect(cn("px-4", "py-2", "rounded")).toBe("px-4 py-2 rounded");
  });

  it("should handle conditional class names with boolean values", () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn("px-4", true && "py-2", false && "rounded")).toBe("px-4 py-2");
  });

  it("should handle undefined and null values", () => {
    expect(cn("px-4", undefined, null, "py-2")).toBe("px-4 py-2");
  });

  it("should handle objects with conditional classes", () => {
    expect(cn({ "px-4": true, "py-2": false, rounded: true })).toBe(
      "px-4 rounded"
    );
  });

  it("should handle arrays of class names", () => {
    expect(cn(["px-4", "py-2", "rounded"])).toBe("px-4 py-2 rounded");
  });

  it("should handle mixed arguments", () => {
    expect(
      cn(
        "base",
        { "px-4": true, "py-2": false },
        ["rounded", "shadow"],
        undefined,
        "text-sm"
      )
    ).toBe("base px-4 rounded shadow text-sm");
  });

  it("should handle empty strings", () => {
    expect(cn("px-4", "", "py-2")).toBe("px-4 py-2");
  });

  it("should deduplicate class names", () => {
    expect(cn("px-4", "py-2", "px-4")).toBe("py-2 px-4");
  });
});
