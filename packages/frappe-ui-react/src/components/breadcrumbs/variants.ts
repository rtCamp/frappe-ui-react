import { cva } from "class-variance-authority";

export const crumbVariants = cva(
  "flex items-center rounded px-1.25 py-1 gap-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      highlightItem: {
        true: "text-ink-gray-9",
        false: "text-ink-gray-5",
      },
      interactive: {
        true: "cursor-pointer",
        false: "cursor-default!",
      },
    },
    compoundVariants: [
      {
        highlightItem: false,
        interactive: true,
        className: "hover:text-ink-gray-9",
      },
    ],
    defaultVariants: {
      size: "lg",
      highlightItem: false,
      interactive: true,
    },
  }
);

export const separatorVariants = cva(
  "text-ink-gray-4 font-medium select-none",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      highlightItem: {
        true: "text-ink-gray-9",
        false: "text-ink-gray-4",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
