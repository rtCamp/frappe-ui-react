/**
 * External dependencies.
 */
import { cva } from "class-variance-authority";

export type ProjectRowStatus =
  | "not-submitted"
  | "approved"
  | "rejected"
  | "approval-pending"
  | "none";

export const statusLabel: Record<ProjectRowStatus, string> = {
  "not-submitted": "Not Submitted",
  approved: "Approved",
  rejected: "Rejected",
  "approval-pending": "Approval Pending",
  none: "None",
};

export const totalHoursVariants = cva("", {
  variants: {
    status: {
      "not-submitted": "text-ink-gray-6",
      approved: "text-ink-green-4",
      rejected: "text-ink-red-4",
      "approval-pending": "text-ink-amber-4",
      none: "",
    },
  },
});

export const NESTING_OFFSET = 10;
export const BASE_PADDING = 4;
