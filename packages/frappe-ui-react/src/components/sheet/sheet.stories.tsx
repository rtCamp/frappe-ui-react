import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from './';
import { Button } from '../button';
import FormLabel from '../formLabel';
import { TextInput } from '../textInput';

const meta: Meta<typeof SheetContent> = {
  title: 'Components/Sheet',
  component: SheetContent,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side the sheet appears from.',
    },
  },
  parameters: {
    component: null,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Right Side)',
  args: {
    side: 'right',
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side={args.side}>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel label="Name" id="name"/>
            <TextInput htmlId="name" value="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel label='Username' id="username" />
            <TextInput htmlId="username" value="@johndoe" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};


export const LeftSide: Story = {
  ...Default,
  name: 'From Left',
  args: {
    side: 'left',
  },
};

export const TopSide: Story = {
  ...Default,
  name: 'From Top',
  args: {
    side: 'top',
  },
};

export const BottomSide: Story = {
  ...Default,
  name: 'From Bottom',
  args: {
    side: 'bottom',
  },
};