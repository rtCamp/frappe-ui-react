import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spacer from "../spacer";

describe("Spacer Component", () => {
  it("renders with default props", () => {
    const { container } = render(<Spacer />);
    const spacer = container.firstChild as HTMLElement;

    expect(spacer).toHaveClass("w-full");
    expect(spacer).toHaveStyle({ height: "16px", minHeight: "16px" });
  });

  it("renders horizontal spacer with custom size", () => {
    const { container } = render(<Spacer orientation="horizontal" size={24} />);
    const spacer = container.firstChild as HTMLElement;

    expect(spacer).toHaveClass("w-full");
    expect(spacer).toHaveStyle({ height: "24px", minHeight: "24px" });
  });

  it("renders vertical spacer with custom size", () => {
    const { container } = render(<Spacer orientation="vertical" size={32} />);
    const spacer = container.firstChild as HTMLElement;

    expect(spacer).toHaveClass("h-full");
    expect(spacer).toHaveStyle({ width: "32px", minWidth: "32px" });
  });
});
