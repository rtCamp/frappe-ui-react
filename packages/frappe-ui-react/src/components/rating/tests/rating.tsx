import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Rating from "../rating";

describe("Rating", () => {
  it("renders correct number of stars", () => {
    render(<Rating value={0} ratingFrom={5} />);
    expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
  });

  it("shows the correct rating", () => {
    render(<Rating value={3} ratingFrom={5} />);
    const stars = screen.getAllByTestId("star-icon");
    // The first 3 should have yellow fill
    expect(stars[0]).toHaveClass("!fill-yellow-500");
    expect(stars[1]).toHaveClass("!fill-yellow-500");
    expect(stars[2]).toHaveClass("!fill-yellow-500");
    expect(stars[3]).not.toHaveClass("!fill-yellow-500");
    expect(stars[4]).not.toHaveClass("!fill-yellow-500");
  });

  it("calls onChange when a star is clicked", () => {
    const handleChange = jest.fn();
    render(<Rating value={0} ratingFrom={5} onChange={handleChange} />);
    const stars = screen.getAllByTestId("star-icon");
    fireEvent.click(stars[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("does not call onChange when readonly", () => {
    const handleChange = jest.fn();
    render(
      <Rating value={0} ratingFrom={5} onChange={handleChange} readonly />
    );
    const stars = screen.getAllByTestId("star-icon");
    fireEvent.click(stars[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders with label", () => {
    render(<Rating value={0} ratingFrom={5} label="Rate this" />);
    expect(screen.getByText("Rate this")).toBeInTheDocument();
  });
});
