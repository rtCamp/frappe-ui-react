import { ReactNode } from "react";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slot?: (args?: any) => ReactNode;
  position?: "start" | "center" | "end";
  padding?: number;
  flexItem?: boolean;
  className?: string;
}
