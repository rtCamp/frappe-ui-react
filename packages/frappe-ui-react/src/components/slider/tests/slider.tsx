import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Slider from "../slider";

// Mock ResizeObserver globally
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Slider Component", () => {
  describe("Single value slider", () => {
    it("renders with required props and attributes", () => {
      render(<Slider min={0} max={100} value={50} />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveValue("50");
      expect(slider).toHaveAttribute("min", "0");
      expect(slider).toHaveAttribute("max", "100");
      expect(slider).toHaveAttribute("step", "1");
    });

    it("handles value change", () => {
      const handleChange = jest.fn();
      render(<Slider min={0} max={100} value={50} onChange={handleChange} />);

      const slider = screen.getByRole("slider");
      fireEvent.change(slider, { target: { value: "75" } });

      expect(slider).toHaveValue("75");
      expect(handleChange).toHaveBeenCalledWith(75);
    });

    it("displays min/max values when showValue is true", () => {
      render(<Slider min={0} max={100} value={50} showValue />);

      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });
  });

  describe("Range slider", () => {
    it("renders two inputs with correct values", () => {
      render(<Slider min={0} max={100} value={{ min: 25, max: 75 }} range />);

      const minSlider = screen.getByLabelText("Minimum value");
      const maxSlider = screen.getByLabelText("Maximum value");

      expect(minSlider).toHaveValue("25");
      expect(maxSlider).toHaveValue("75");
    });

    it("prevents min value from exceeding max value", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          min={0}
          max={100}
          value={{ min: 25, max: 75 }}
          range
          step={1}
          onChange={handleChange}
        />
      );

      const minSlider = screen.getByLabelText("Minimum value");
      fireEvent.change(minSlider, { target: { value: "80" } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ min: 74, max: 75 })
      );
    });

    it("prevents max value from going below min value", () => {
      const handleChange = jest.fn();
      render(
        <Slider
          min={0}
          max={100}
          value={{ min: 25, max: 75 }}
          range
          step={1}
          onChange={handleChange}
        />
      );

      const maxSlider = screen.getByLabelText("Maximum value");
      fireEvent.change(maxSlider, { target: { value: "20" } });

      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ min: 25, max: 26 })
      );
    });
  });

  describe("Disabled state", () => {
    it("disables slider input", () => {
      render(<Slider min={0} max={100} value={50} disabled />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeDisabled();
    });
  });

  describe("Tooltip functionality", () => {
    it("shows and hides tooltip on pointer events", async () => {
      render(<Slider min={0} max={100} value={50} tooltip />);

      const input = screen.getByLabelText("Value");
      fireEvent.pointerDown(input);

      const tooltip = await screen.findByRole("tooltip");
      expect(tooltip).toHaveTextContent("50");

      fireEvent.pointerUp(input);

      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("does not show tooltip when disabled", () => {
      render(<Slider min={0} max={100} value={50} tooltip={false} />);

      const input = screen.getByLabelText("Value");
      fireEvent.pointerDown(input);

      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  describe("Knob visibility", () => {
    it("hides knob when knob={false}", () => {
      const { container } = render(
        <Slider min={0} max={100} value={50} knob={false} />
      );
      const sliderInput = container.querySelector('input[type="range"]');

      expect(sliderInput).toHaveClass(
        "[&::-webkit-slider-thumb]:bg-transparent"
      );
      expect(sliderInput).toHaveClass("[&::-moz-range-thumb]:bg-transparent");
    });
  });

  describe("Size variants", () => {
    it("applies size classes correctly", () => {
      const { container, rerender } = render(
        <Slider min={0} max={100} value={50} size="sm" />
      );
      let sliderInput = container.querySelector('input[type="range"]');

      expect(sliderInput).toHaveClass("[&::-webkit-slider-thumb]:h-3.5");

      rerender(<Slider min={0} max={100} value={50} size="xl" />);
      sliderInput = container.querySelector('input[type="range"]');

      expect(sliderInput).toHaveClass("[&::-webkit-slider-thumb]:h-6");
    });
  });
});
