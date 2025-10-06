import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FileUploader, { FileUploaderProps } from "../fileuploader";

// Mock FileUploadHandler
jest.mock("../../../utils", () => {
  return {
    FileUploadHandler: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      upload: jest.fn(() =>
        Promise.resolve({ name: "test.txt", url: "/test.txt" })
      ),
    })),
  };
});

describe("FileUploader", () => {
  const defaultProps: FileUploaderProps = {
    children: ({ openFileSelector, uploading, progress, error, success }) => (
      <div>
        <button onClick={openFileSelector}>Upload</button>
        <span data-testid="uploading">{uploading ? "Uploading" : "Idle"}</span>
        <span data-testid="progress">{progress}</span>
        <span data-testid="error">{error}</span>
        <span data-testid="success">{success ? "Success" : "Not Success"}</span>
      </div>
    ),
  };

  it("renders upload button and initial state", () => {
    const { getByText, getByTestId } = render(
      <FileUploader {...defaultProps} />
    );
    expect(getByText("Upload")).toBeInTheDocument();
    expect(getByTestId("uploading")).toHaveTextContent("Idle");
    expect(getByTestId("progress")).toHaveTextContent("0");
    expect(getByTestId("error")).toHaveTextContent("");
    expect(getByTestId("success")).toHaveTextContent("Not Success");
  });

  it("calls validateFile and shows error", async () => {
    const validateFile = jest.fn().mockResolvedValue("Invalid file");
    const { container, getByTestId } = render(
      <FileUploader {...defaultProps} validateFile={validateFile} />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File([""], "test.txt", { type: "text/plain" })] },
    });
    await waitFor(() => {
      expect(getByTestId("error")).toHaveTextContent("Invalid file");
    });
  });

  it("calls onSuccess after upload", async () => {
    const onSuccess = jest.fn();
    const { container } = render(
      <FileUploader {...defaultProps} onSuccess={onSuccess} />
    );
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File([""], "test.txt", { type: "text/plain" })] },
    });
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith({
        name: "test.txt",
        url: "/test.txt",
      });
    });
  });

  it("calls openFileSelector when button is clicked", () => {
    const { getByText, container } = render(<FileUploader {...defaultProps} />);
    const input = container.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const spy = jest.spyOn(input, "click");
    fireEvent.click(getByText("Upload"));
    expect(spy).toHaveBeenCalled();
  });
});
