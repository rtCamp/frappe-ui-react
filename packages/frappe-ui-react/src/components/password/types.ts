import type { ReactNode } from "react";

export interface PasswordProps {
  value?: string | null
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prefix?: (args?: any) => ReactNode;
}