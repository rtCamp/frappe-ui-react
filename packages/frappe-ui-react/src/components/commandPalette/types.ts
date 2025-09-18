import React from 'react';

export interface CommandPaletteItem {
  name: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CommandPaletteGroup {
  title: string;
  hideTitle?: boolean;
  items: CommandPaletteItem[];
}