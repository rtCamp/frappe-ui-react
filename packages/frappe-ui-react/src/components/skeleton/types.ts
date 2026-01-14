export type SkeletonSize = "sm" | "md" | "lg" | "xl";
export type SkeletonVariant = "default" | "rounded" | "circular" | "text";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize;
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}
