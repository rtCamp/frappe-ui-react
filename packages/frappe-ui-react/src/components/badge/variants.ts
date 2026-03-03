import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex select-none items-center gap-1 rounded-full",
  {
    variants: {
      theme: {
        gray: "text-ink-gray-6",
        blue: "text-ink-blue-2",
        green: "text-ink-green-3",
        orange: "text-ink-amber-3",
        red: "text-ink-red-4",
      },
      variant: {
        subtle: "",
        solid: "",
        outline: "bg-transparent border",
        ghost: "bg-transparent",
      },
      size: {
        sm: "h-4 text-xs px-1.5",
        md: "h-5 text-xs px-1.5",
        lg: "h-6 text-sm px-2",
      },
    },
    compoundVariants: [
      { variant: "subtle", theme: "gray", className: "bg-surface-gray-2" },
      { variant: "subtle", theme: "blue", className: "bg-surface-blue-1" },
      { variant: "subtle", theme: "green", className: "bg-surface-green-2" },
      { variant: "subtle", theme: "orange", className: "bg-surface-amber-1" },
      { variant: "subtle", theme: "red", className: "bg-surface-red-1" },
      {
        variant: "solid",
        theme: "gray",
        className: "text-ink-white bg-surface-gray-7",
      },
      {
        variant: "solid",
        theme: "blue",
        className: "text-ink-blue-1 bg-surface-blue-2",
      },
      {
        variant: "solid",
        theme: "green",
        className: "text-ink-green-1 bg-surface-green-3",
      },
      {
        variant: "solid",
        theme: "orange",
        className: "text-ink-amber-1 bg-surface-amber-2",
      },
      {
        variant: "solid",
        theme: "red",
        className: "text-ink-red-1 bg-surface-red-4",
      },
      { variant: "outline", theme: "gray", className: "border-outline-gray-1" },
      { variant: "outline", theme: "blue", className: "border-outline-blue-1" },
      {
        variant: "outline",
        theme: "green",
        className: "border-outline-green-2",
      },
      {
        variant: "outline",
        theme: "orange",
        className: "border-outline-amber-2",
      },
      { variant: "outline", theme: "red", className: "border-outline-red-2" },
    ],
    defaultVariants: {
      theme: "gray",
      size: "md",
      variant: "subtle",
    },
  }
);
