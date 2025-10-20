import React from "react";
import Typography from "./index";

export default {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Typography component for headings, paragraphs, and text variants. Supports custom tags and class names.",
      },
    },
  },
  args: {
    variant: "p",
    children: "Sample text",
    className: "",
    as: undefined,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "large",
        "small",
        "muted",
      ],
      description: "Typography variant (heading, paragraph, etc)",
    },
    children: {
      control: "text",
      description: "Content to render inside the typography tag.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
    as: {
      control: "text",
      description: "Custom tag to render (e.g. 'div').",
    },
  },
};

export const Headings = () => (
  <>
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>
    <Typography variant="h6">Heading 6</Typography>
  </>
);

export const Paragraphs = () => (
  <>
    <Typography variant="p">This is a paragraph.</Typography>
    <Typography variant="large">This is a large paragraph.</Typography>
    <Typography variant="muted">This is a muted paragraph.</Typography>
    <Typography variant="small">This is a small text.</Typography>
  </>
);

export const CustomTag = () => (
  <Typography as="div" variant="h2" className="text-red-500">
    Custom Tag Example (div)
  </Typography>
);
