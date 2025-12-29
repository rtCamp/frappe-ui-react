import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConfirmationDialog } from './';
import { Button } from '../button';


const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls if the dialog is open or closed.',
      table: {
        category: 'State',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a loading spinner on the delete button.',
      table: {
        category: 'State',
      },
    },
    title: {
      control: 'text',
      description: 'The main title of the dialog.',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      description: 'The body text/description of the dialog.',
      table: {
        category: 'Content',
      },
    },
    onDelete: {
      action: 'onDelete',
      description: 'Callback fired when the "Delete" button is clicked.',
      table: {
        category: 'Events',
      },
    },
    onCancel: {
      action: 'onCancel',
      description:
        'Callback fired when the "Cancel" button is clicked or the dialog is closed (e.g., by clicking overlay).',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    isOpen: false,
    isLoading: false,
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete this item and all of its associated data.',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmationDialog>;

export const Default: Story = {
  name: 'Interactive Example',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);
    const [isLoading, setIsLoading] = useState(args.isLoading || false);

    const handleCancel = () => {
      setIsOpen(false);
      setIsLoading(false);
      args.onCancel?.();
    };

    const handleDelete = () => {
      setIsLoading(true);
      args.onDelete?.();
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
        console.log('Item deleted');
      }, 2000);
    };

    return (
      <>
        <Button variant="solid" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <ConfirmationDialog
          {...args}
          isOpen={isOpen}
          isLoading={isLoading}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </>
    );
  },

  args: {
    isOpen: false,
    isLoading: false,
  },
};

export const DefaultOpen: Story = {
  name: 'Open',
  args: {
    isOpen: true,
    isLoading: false,
    title: 'Confirm Deletion',
    description:
      'Are you sure you want to delete this resource? This process is irreversible.',
  },
};

export const LoadingState: Story = {
  name: 'Loading',
  args: {
    isOpen: true,
    isLoading: true,
    title: 'Deleting Resource...',
    description:
      'Please wait while the resource is being deleted. This may take a moment.',
  },
};