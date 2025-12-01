import type { ReactNode } from "react";

export interface BadgeProps {
  theme?: "gray" | "blue" | "green" | "orange" | "red";
  size?: "sm" | "md" | "lg";
  variant?: "subtle" | "solid" | "outline" | "ghost";
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  children?: ReactNode;
}
