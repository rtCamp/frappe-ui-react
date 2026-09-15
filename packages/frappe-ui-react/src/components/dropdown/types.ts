import type { ReactElement, ReactNode, ComponentType } from "react";
import type { ButtonProps } from "../button";
import type { ButtonTheme } from "../button";

export interface DropdownOption {
  label: string;
  key?: string | number;
  onClick?: (val?: boolean) => void;
  link?: string;
  icon?: string | ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
  theme?: ButtonTheme;
  submenu?: DropdownOptions;
  condition?: () => boolean;
  disabled?: boolean;
  switch?: boolean;
  switchValue?: boolean;
}

export interface DropdownGroupOption {
  key: string | number;
  groupKey?: string | number;
  group?: string;
  hideLabel?: boolean;
  items: DropdownOption[];
}

export type DropdownOptions = (DropdownOption | DropdownGroupOption)[];

export type DropdownItemState = {
  item: DropdownOption;
};

/**
 * Default props of a menu item, forwarded to `renderMenuItem`. Kept
 * structural (no React.HTMLAttributes) so consumers with their own copy of
 * @types/react can spread them onto JSX without type-identity conflicts.
 */
export type DropdownItemRenderProps = {
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

export type DropdownRenderMenuItem =
  | ReactElement
  | ((
      props: DropdownItemRenderProps,
      state: DropdownItemState
    ) => ReactElement);

export interface DropdownProps {
  options: DropdownOptions;
  placement?: "left" | "right" | "center";
  /** Which side of the trigger the dropdown opens on. */
  side?: "top" | "bottom" | "left" | "right";
  dropdownClassName?: string;
  groupClassName?: string;
  itemClassName?: string;
  selectedKey?: string | number;
  selectedGroupKey?: string | number;
  button?: Omit<ButtonProps, "children" | "onClick" | "active"> & {
    label?: string;
  };
  children?: ReactNode;
  renderItems?: (options: DropdownOptions) => ReactNode;
  /**
   * Overrides the rendering of plain menu items. Receives the default item
   * props (className, children with icon + label) and `{ item }` as state.
   */
  renderMenuItem?: DropdownRenderMenuItem;
}
