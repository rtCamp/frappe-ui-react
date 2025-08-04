import { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from './checkbox';
import { CheckboxProps } from './types';
import { action } from 'storybook/actions';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: 'text',
      description: 'The text label for the checkbox.',
    },
    size: {
      control: { type: 'select', options: ['sm', 'md'] },
      description: 'The size of the checkbox.',
    },
    padding: {
      control: 'boolean',
      description: 'Whether to apply padding and hover/focus styles to the wrapper.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
    },
    value: {
      control: 'boolean',
      description: 'The checked state of the checkbox.',
    },
    onChange: {
      action: 'checked',
      description: 'Event handler for when the checkbox state changes.',
    },
  },
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof Checkbox>;


export const Default: StoryObj<CheckboxProps> = {
  render: (args) => {
    return (
      <div className="p-2">
        <Checkbox
          {...args}
          onChange={(value) => {
            action('checked')(value);
          }}
          label={args.label ?? "Enable feature"}
        />
      </div>
    );
  },
};
