import { cva } from "class-variance-authority";

export const selectTriggerVariants = cva(
  "w-full inline-flex items-center justify-between gap-2 py-0 truncate appearance-none transition-colors focus:outline-none cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        sm: "rounded h-7 text-base px-2",
        md: "rounded h-8 text-base px-2",
        lg: "rounded-md h-10 text-lg px-3",
      },
      variant: {
        subtle:
          "border border-surface-gray-2 bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 data-[placeholder]:text-ink-gray-4",
        outline:
          "border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
        ghost:
          "bg-transparent border-transparent hover:bg-surface-gray-3 focus:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3",
      },
      disabled: {
        true: "text-ink-gray-4",
        false: "text-ink-gray-8",
      },
    },
    compoundVariants: [
      {
        disabled: true,
        variant: "subtle",
        className: "border border-transparent bg-surface-gray-1",
      },
      {
        disabled: true,
        variant: "outline",
        className: "border border-outline-gray-2 bg-surface-gray-1",
      },
      {
        disabled: true,
        variant: "ghost",
        className: "border border-transparent bg-transparent",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "subtle",
      disabled: false,
    },
  }
);
