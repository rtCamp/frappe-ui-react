import type { ReactNode, ComponentType } from "react";
import { ButtonProps } from "@headlessui/react";
import { ButtonTheme } from "../button";

export interface DropdownOption {
  label: string;
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
  group?: string;
  hideLabel?: boolean;
  items: DropdownOption[];
}

export type DropdownOptions = (DropdownOption | DropdownGroupOption)[];

export interface DropdownProps {
  options: DropdownOptions;
  placement?: "left" | "right" | "center";
  button?: Omit<ButtonProps, "children" | "onClick" | "active"> & {
    label?: string;
  };
  children?: ReactNode;
}
