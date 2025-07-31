import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from './badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    label: { control: 'text', description: 'Text content of the badge' },
    theme: {
      control: { type: 'select', options: ['gray', 'blue', 'green', 'orange', 'red'] },
      description: 'Color theme of the badge',
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      description: 'Size of the badge',
    },
    variant: {
      control: { type: 'select', options: ['solid', 'subtle', 'outline', 'ghost'] },
      description: 'Visual variant of the badge',
    },
    prefix: { control: 'text', description: 'Content to display before the label (e.g., an icon)' },
    suffix: { control: 'text', description: 'Content to display after the label (e.g., an icon)' },
    children: { control: 'text', description: 'Alternative to label prop, rendered as children' },
  },
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    label: 'Default Badge',
    theme: 'gray',
    size: 'md',
    variant: 'subtle',
  },
};

export const Solid: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    label: 'Solid Badge',
    theme: 'gray',
    size: 'md',
    variant: 'solid',
  },
};

export const Subtle: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    label: 'Subtle Badge',
    theme: 'gray',
    size: 'md',
    variant: 'subtle',
  },
};

export const Outline: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    label: 'Outline Badge',
    theme: 'gray',
    size: 'md',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    label: 'Ghost Badge',
    theme: 'gray',
    size: 'md',
    variant: 'ghost',
  },
};