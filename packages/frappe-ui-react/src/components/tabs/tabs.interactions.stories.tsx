import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, expect, within } from "storybook/test";

import { Tabs } from "./index";
import type { TabsProps } from "./tabs";
import FeatherIcon from "../featherIcon";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs/Interactions",
  component: Tabs,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

const tabs = [
  { label: "Github", content: "Github content" },
  { label: "Twitter", content: "Twitter content" },
  { label: "Linkedin", content: "Linkedin content" },
];

const tabsWithIcon = [
  {
    label: "Github",
    content: "Github content",
    icon: <FeatherIcon name="github" className="w-4 h-4" />,
  },
  {
    label: "Twitter",
    content: "Twitter content",
    icon: <FeatherIcon name="twitter" className="w-4 h-4" />,
  },
  {
    label: "Linkedin",
    content: "Linkedin content",
    icon: <FeatherIcon name="linkedin" className="w-4 h-4" />,
  },
];

export const RendersAllTabs: Story = {
  args: { tabs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("tab", { name: "Github" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Twitter" })).toBeInTheDocument();
    expect(canvas.getByRole("tab", { name: "Linkedin" })).toBeInTheDocument();
  },
};

export const ShowsFirstTabByDefault: Story = {
  args: { tabs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstTab = canvas.getByRole("tab", { name: "Github" });
    expect(firstTab).toHaveAttribute("aria-selected", "true");
    expect(canvas.getByText("Github content")).toBeVisible();
  },
};

export const ChangesTabOnClick: Story = {
  args: { tabs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("tab", { name: "Twitter" }));
    expect(canvas.getByRole("tab", { name: "Twitter" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(canvas.getByText("Twitter content")).toBeVisible();

    await userEvent.click(canvas.getByRole("tab", { name: "Linkedin" }));
    expect(canvas.getByRole("tab", { name: "Linkedin" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(canvas.getByText("Linkedin content")).toBeVisible();
  },
};

export const KeyboardNavigation: Story = {
  args: { tabs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstTab = canvas.getByRole("tab", { name: "Github" });
    firstTab.focus();
    expect(firstTab).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    expect(canvas.getByRole("tab", { name: "Twitter" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    expect(canvas.getByRole("tab", { name: "Linkedin" })).toHaveFocus();

    // Wraps around
    await userEvent.keyboard("{ArrowRight}");
    expect(canvas.getByRole("tab", { name: "Github" })).toHaveFocus();
  },
};

export const VerticalKeyboardNavigation: Story = {
  args: { tabs, vertical: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tablist = canvas.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-orientation", "vertical");

    const firstTab = canvas.getByRole("tab", { name: "Github" });
    firstTab.focus();

    await userEvent.keyboard("{ArrowDown}");
    expect(canvas.getByRole("tab", { name: "Twitter" })).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    expect(canvas.getByRole("tab", { name: "Linkedin" })).toHaveFocus();
  },
};

export const VerticalChangesTab: Story = {
  args: { tabs, vertical: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("tab", { name: "Linkedin" }));
    expect(canvas.getByRole("tab", { name: "Linkedin" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(canvas.getByText("Linkedin content")).toBeVisible();
  },
};

export const WithIcons: Story = {
  args: { tabs: tabsWithIcon },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("tab", { name: "Github" })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("tab", { name: "Twitter" }));
    expect(canvas.getByText("Twitter content")).toBeVisible();
  },
};
