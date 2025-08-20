import type { Meta, StoryObj } from '@storybook/react-vite';
import Spinner from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom CSS classes for sizing and styling.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: () => (
    <>
      <div className="text-center">
        <Spinner className="w-4 h-4" />
        <p className="text-xs mt-2">w-4 h-4</p>
      </div>
      <div className="text-center">
        <Spinner className="w-8 h-8" />
        <p className="text-xs mt-2">w-8 h-8</p>
      </div>
    </>
  ),
};

export const Small: Story = {
  args: {
    className: 'w-4 h-4',
  },
};

export const Large: Story = {
  args: {
    className: 'w-8 h-8',
  },
};