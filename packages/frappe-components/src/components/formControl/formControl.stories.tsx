import type { Meta, StoryObj } from '@storybook/react-vite';

import FormControl from './formControl';
import FeatherIcon from '../featherIcon';
import { useState } from 'react';

const meta: Meta<typeof FormControl> = {
  title: 'Components/FormControl',
  component: FormControl,
  parameters: {
    layout: "padded",
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['subtle', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    type: {
      control: false,
    },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'subtle',
    size: 'sm',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Text: Story = {
  args: {
    type: 'text',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
  },
};

export const Date: Story = {
  args: {
    type: 'date',
  },
};


export const Password: Story = {
  args: {
    type: 'password',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
  },
};

export const Textarea: Story = {
  args: {
    type: 'textarea',
  },
};

export const Select: Story = {
  args: {
    type: 'select',
    htmlId: 'select',
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => {
    const [value , setValue] = useState('');
    return(
      <FormControl {...args} value={value} onChange={(_value: string) => setValue(_value)}/>
    )
  }
};

export const Autocomplete: Story = {
  args: {
    type: 'autocomplete',
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => {
    const [value , setValue] = useState('');
    return(
      <FormControl {...args} value={value} onChange={(_value: string) => setValue(_value)}/>
    )
  }
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
    label: 'Checkbox Label',
  },
  render: (args) => {
    const [value , setValue] = useState(false);
    return(
      <FormControl {...args} value={value} onChange={(_value: boolean) => setValue(_value)}/>
    )
  }
};

export const WithPrefixIcon: Story = {
  args: {
    type: 'text',
    placeholder: '',
    prefix: () => <FeatherIcon className="w-4" name="search" />,
  },
};