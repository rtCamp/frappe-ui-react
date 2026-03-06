/**
 * External dependencies.
 */
import { cva } from "class-variance-authority";

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
