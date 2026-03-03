import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  "resize-y transition-colors w-full block outline-none",
  {
    variants: {
      size: {
        sm: "text-base rounded py-1.5 px-2",
        md: "text-base rounded py-1.5 px-2.5",
        lg: "text-lg rounded-md py-1.5 px-3",
        xl: "text-xl rounded-md py-1.5 px-3",
      },
      variant: {
        subtle:
          "border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        outline:
          "border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      },
      disabled: {
        true: "text-ink-gray-5",
        false: "text-ink-gray-8",
      },
    },
    compoundVariants: [
      {
        disabled: true,
        variant: "subtle",
        className:
          "border border-transparent bg-surface-gray-1 placeholder-ink-gray-3",
      },
      {
        disabled: true,
        variant: "outline",
        className:
          "border border-outline-gray-2 bg-surface-gray-1 placeholder-ink-gray-3",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "subtle",
      disabled: false,
    },
  }
);

export const textareaLabelVariants = cva("block text-ink-gray-5", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
