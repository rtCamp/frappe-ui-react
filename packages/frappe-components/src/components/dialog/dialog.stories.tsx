import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogOptions } from './dialog';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { Autocomplete, AutocompleteOption } from '../autoComplete';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  decorators: [
    (Story) => (
      <MemoryRouter>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        <Story />
      </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const createPromise = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

export const BasicConfirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const dialogOptions: DialogOptions = {
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed with this action?',
      size: 'lg',
      icon: {
        name: 'alert-triangle',
        appearance: 'warning',
      },
      actions: [
        {
          label: 'Confirm',
          variant: 'solid',
          onClick: () => createPromise(),
        },
      ],
    };

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Show Confirmation Dialog</Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen} options={dialogOptions} />
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Show Custom Dialog</Button>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          options={{
            title: () => <h3 className="text-2xl font-semibold text-blue-600">Custom Title with Styling</h3>
          }}
          actions={
            <div className="flex justify-start flex-row-reverse gap-2">
              <Button variant="solid" style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}>Save Changes</Button>
              <Button variant="outline" style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-700">This dialog uses props for flexible content layout.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">You can put any content here including forms, lists, or other components.</p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [isSmallOpen, setSmallOpen] = useState(false);
    const [isLargeOpen, setLargeOpen] = useState(false);

    return (
      <div className="space-x-2">
        <Button onClick={() => setSmallOpen(true)}>Small Dialog</Button>
        <Button onClick={() => setLargeOpen(true)}>Large Dialog</Button>

        <Dialog
          open={isSmallOpen}
          onOpenChange={setSmallOpen}
          options={{
            title: 'Small Dialog',
            message: 'This is a small dialog.',
            size: 'sm',
            actions: [{ label: 'OK', variant: 'solid' }],
          }}
        />

        <Dialog
          open={isLargeOpen}
          onOpenChange={setLargeOpen}
          options={{
            title: 'Large Dialog',
            message: 'This is a large dialog with more space for content.',
            size: '4xl',
            actions: [{ label: 'OK', variant: 'solid' }],
          }}
        />
      </div>
    );
  },
};

export const DisableOutsideClick: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Show Modal Dialog</Button>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          disableOutsideClickToClose={true}
          options={{
            title: 'Modal Dialog',
            message: 'This dialog cannot be closed by clicking outside. Use the buttons or ESC key.',
            actions: [{ label: 'Close', variant: 'solid' }],
          }}
        />
      </div>
    );
  },
};

export const WithInteractiveComponents: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const [autocompleteValue, setAutocompleteValue] = useState('' as AutocompleteOption);

    const dropdownOptions = [
      { label: 'Option 1', onClick: () => setSelectedOption('Option 1'), key: '1' },
      { label: 'Option 2', onClick: () => setSelectedOption('Option 2'), key: '2' },
      { label: 'Option 3', onClick: () => setSelectedOption('Option 3'), key: '3' },
      {
        group: 'Advanced Options',
        key: 'group-1',
        items: [
          { label: 'Advanced Option A', icon: 'settings', onClick: () => setSelectedOption('Advanced Option A'), key: '1' },
          { label: 'Advanced Option B', icon: 'star', onClick: () => setSelectedOption('Advanced Option B'), key: '2' },
        ],
      },
    ];

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Show Settings Dialog</Button>
        <Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          options={{
            title: () => <h3 className="text-2xl font-semibold text-ink-gray-9">Settings Dialog</h3>
          }}
          actions={
            <div className="flex space-x-2">
              <Button variant="solid" style={{ cursor: "pointer" }}  onClick={() => setIsOpen(false)}>Save Settings</Button>
              <Button variant="outline" style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          }
        >
          <div className="space-y-6 text-base">
            <p className="text-gray-700">This dialog contains interactive elements to test proper layering.</p>
            <Autocomplete
              options={[
                { label: 'Option A', value: 'A' },
                { label: 'Option B', value: 'B' },
                { label: 'Option C', value: 'C' },
              ]}
              placeholder="Type to search..."
              value={autocompleteValue ?? ''}
              onChange={(_value) => setAutocompleteValue(_value as AutocompleteOption)}
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Select an option:</label>
              <Dropdown options={dropdownOptions} placement="left">
                <Button variant="outline" iconRight="chevron-down">
                  {selectedOption}
                </Button>
              </Dropdown>
            </div>
            <div className="bg-gray-50 text-sm p-4 text-gray-600 rounded-lg">
              <p><strong>Selected value:</strong> {selectedOption}</p>
              <p className="mt-1">Interactive components should work properly within dialogs.</p>
            </div>
          </div>
        </Dialog>
      </div>
    );
  },
};