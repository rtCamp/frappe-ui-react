import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "../select";
import type { SelectOption } from "../types";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};


describe("Select", () => {
  const options: SelectOption[] = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3", disabled: true },
  ];

  it("renders with placeholder", () => {
    render(
      <Select
        options={options}
        value={undefined}
        placeholder="Select an option"
        onChange={() => {}}
      />
    );
   
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders with initial value", () => {
    render(
      <Select 
        options={options} 
        value={options[1]} 
        onChange={() => {}} 
      />
    );
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when selecting an option", async () => {
    const handleChange = jest.fn();
    render(
      <Select 
        options={options} 
        value={options[0]} 
        onChange={handleChange} 
      />
    );

    
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger);

   
    const optionToSelect = screen.getByText("Option 2");
    fireEvent.click(optionToSelect);

   
    await waitFor(() => {
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(options[1]);
    });
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Select 
        options={options} 
        value={options[0]} 
        onChange={() => {}} 
        disabled 
      />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders prefix", () => {
    render(
      <Select
        options={options}
        value={options[0]}
        onChange={() => {}}
        prefix={<span>PrefixIcon</span>}
      />
    );
    expect(screen.getByText("PrefixIcon")).toBeInTheDocument();
  });
});
