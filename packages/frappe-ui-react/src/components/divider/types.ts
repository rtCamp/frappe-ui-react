interface DividerAction {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: () => any;
  loading?: boolean;
}

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  position?: "start" | "center" | "end";
  flexItem?: boolean;
  action?: DividerAction;
}
