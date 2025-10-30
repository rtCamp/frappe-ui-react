import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";
import FileUploader from "./fileuploader";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    fileTypes: {
      control: "object",
      description:
        "Array of accepted file MIME types (e.g., ['image/*', 'application/pdf'])",
    },
    validateFile: {
      description: "Function to validate the selected file before upload",
    },
    onSuccess: {
      description: "Callback function called upon successful file upload",
    },
    children: {
      description:
        "Render prop function that provides upload state and controls",
    },
    onFailure: {
      description: "Callback function called upon failed file upload",
    },
    uploadArgs: {
      control: "object",
      description: "Additional arguments for the upload request",
    },
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
  ),
};
