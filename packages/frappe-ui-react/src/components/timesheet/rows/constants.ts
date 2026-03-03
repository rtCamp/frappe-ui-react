export const NESTING_OFFSET = 10;
export const BASE_PADDING = 4;

export type RowStatus =
  | "not-submitted"
  | "approved"
  | "rejected"
  | "approval-pending"
  | "none";

export const statusLabel: Record<RowStatus, string> = {
  "not-submitted": "Not Submitted",
  approved: "Approved",
  rejected: "Rejected",
  "approval-pending": "Approval Pending",
  none: "None",
};
