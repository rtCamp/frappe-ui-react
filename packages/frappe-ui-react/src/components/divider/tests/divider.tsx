import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Divider from "../divider";

describe("Divider Component", () => {
  describe("Basic rendering", () => {
    it("renders horizontal divider by default", () => {
      const { container } = render(<Divider />);
      const hr = container.querySelector("hr");

      expect(hr).toBeInTheDocument();
      expect(hr).toHaveClass("border-t", "w-full");
      expect(hr).not.toHaveClass("border-l", "h-full");
    });

    it("renders vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const hr = container.querySelector("hr");

      expect(hr).toHaveClass("border-l", "h-full");
      expect(hr).not.toHaveClass("border-t", "w-full");
    });
  });

  describe("Padding", () => {
    it("applies vertical padding for horizontal divider", () => {
      const { container } = render(<Divider padding={10} />);
      const hr = container.querySelector("hr");

      expect(hr).toHaveStyle({ marginTop: "10px", marginBottom: "10px" });
    });

    it("applies horizontal padding for vertical divider", () => {
      const { container } = render(
        <Divider orientation="vertical" padding={15} />
      );
      const hr = container.querySelector("hr");

      expect(hr).toHaveStyle({ marginLeft: "15px", marginRight: "15px" });
    });
  });

  describe("Divider with slot", () => {
    it("renders slot content between dividers", () => {
      const { container } = render(<Divider slot={() => <span>Label</span>} />);

      expect(screen.getByText("Label")).toBeInTheDocument();

      const hrs = container.querySelectorAll("hr");
      expect(hrs).toHaveLength(2);
    });

    it("positions slot at start", () => {
      const { container } = render(
        <Divider slot={() => "Start"} position="start" />
      );
      const hrs = container.querySelectorAll("hr");

      expect(hrs[0]).toHaveClass("w-4");
      expect(hrs[1]).toHaveClass("flex-1");
    });

    it("positions slot at center by default", () => {
      const { container } = render(<Divider slot={() => "Center"} />);
      const hrs = container.querySelectorAll("hr");

      expect(hrs[0]).toHaveClass("flex-1");
      expect(hrs[1]).toHaveClass("flex-1");
    });

    it("positions slot at end", () => {
      const { container } = render(
        <Divider slot={() => "End"} position="end" />
      );
      const hrs = container.querySelectorAll("hr");

      expect(hrs[0]).toHaveClass("flex-1");
      expect(hrs[1]).toHaveClass("w-4");
    });

    it("applies padding to wrapper with slot", () => {
      const { container } = render(
        <Divider slot={() => "Text"} padding={20} />
      );
      const wrapper = container.querySelector("div");

      expect(wrapper).toHaveStyle({
        paddingTop: "20px",
        paddingBottom: "20px",
      });
    });
  });

  describe("Flex item", () => {
    it("applies flex item classes when enabled", () => {
      const { container } = render(<Divider flexItem />);
      const hr = container.querySelector("hr");

      expect(hr).toHaveClass("self-stretch", "h-auto");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = render(<Divider className="custom-divider" />);
      const hr = container.querySelector("hr");

      expect(hr).toHaveClass("custom-divider");
    });
  });
});
