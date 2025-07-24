import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from './autoComplete';

const options = [
  {
    label: 'John Doe',
    value: 'john-doe',
    image: 'https://randomuser.me/api/portraits/men/59.jpg',
  },
  {
    label: 'Jane Doe',
    value: 'jane-doe',
    image: 'https://randomuser.me/api/portraits/women/58.jpg',
  },
  {
    label: 'John Smith',
    value: 'john-smith',
    image: 'https://randomuser.me/api/portraits/men/59.jpg',
  },
  {
    label: 'Jane Smith',
    value: 'jane-smith',
    image: 'https://randomuser.me/api/portraits/women/59.jpg',
  },
  {
    label: 'John Wayne',
    value: 'john-wayne',
    image: 'https://randomuser.me/api/portraits/men/57.jpg',
  },
  {
    label: 'Jane Wayne',
    value: 'jane-wayne',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
]

const meta = {
  title: 'Example/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
    decorators: [
    (Story) => (
      <div style={{ width: '450px'}}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    modelValue: null,
    options,
    placeholder:"Select person"
    },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AutocompletePrimary: Story = {
  args: {
    modelValue: [],
    options,
    multiple: false
  },
};

export const AutocompleteWtithMultiple: Story = {
  args: {
    modelValue: [],
    options,
    multiple: true
  },
};