import type { ReactNode } from "react";
import type { TextInputTypes } from "../../common/types";
import type { AutocompleteOption } from "../autoComplete";
import type { SelectOption } from "../select";

export interface FormControlProps {
  label?: string;
  description?: string;
  type?: TextInputTypes | "textarea" | "select" | "checkbox" | "autocomplete";
  size?: "sm" | "md";
  variant?: "subtle" | "outline";
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  suffix?: (args?: any) => ReactNode;
	placeholder?: string;
  children?: ReactNode[];
  htmlId?: string;
  options?: (SelectOption | AutocompleteOption | string)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
