import React from "react";
import { Button } from "../Button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FileUploader from "./fileuploader";
import { MemoryRouter } from "react-router";
import { Story, Variant } from "../Story";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof FileUploader>;

const validateFileFunction = async (file: File) => {
  if (!file.type.startsWith("image/")) {
    return "Only image files are allowed.";
  }
  if (file.size > 2 * 1024 * 1024) {
    return "File must be under 2MB.";
  }
  return null;
};

const onSuccess = (file: unknown) => {
  console.log("Upload success:", file);
};

export const Default: Story = {
  render: () => (
    <Story layout={{ width: 500, type: "grid" }}>
      <Variant title="Default File Uploader">
        <MemoryRouter>
          <FileUploader
            fileTypes={["image/*"]}
            validateFile={validateFileFunction}
            onSuccess={onSuccess}
          >
            {({ uploading, progress, openFileSelector }) => (
              <Button onClick={openFileSelector} loading={uploading}>
                {uploading ? `Uploading ${progress}%` : "Upload Image"}
              </Button>
            )}
          </FileUploader>
        </MemoryRouter>
      </Variant>
    </Story>
  ),
};
