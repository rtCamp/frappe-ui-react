import type {
  SkeletonProps,
  SkeletonSize,
  SkeletonVariant,
  SkeletonAnimation,
} from "./types";

const Skeleton: React.FC<SkeletonProps> = ({
  size = "md",
  variant = "default",
  animation = "pulse",
  width,
  height,
  lines = 1,
  className = "",
  style,
  ...props
}) => {
  const sizeClasses: Record<SkeletonSize, { width: string; height: string }> = {
    sm: { width: "min-w-16 w-full", height: "min-h-4 h-4" },
    md: { width: "min-w-24 w-full", height: "min-h-5 h-5" },
    lg: { width: "min-w-32 w-full", height: "min-h-6 h-6" },
    xl: { width: "min-w-40 w-full", height: "min-h-8 h-8" },
  };

  const variantClasses: Record<SkeletonVariant, string> = {
    default: "rounded-md",
    rounded: "rounded-lg",
    circular: "rounded-full aspect-square",
    text: "rounded",
  };

  const animationClasses: Record<SkeletonAnimation, string> = {
    pulse: "animate-pulse",
    wave: "animate-bounce",
    none: "",
  };

  const baseClasses = "bg-surface-gray-2";

  const sizeConfig = sizeClasses[size];
  const widthClass = width ? "" : sizeConfig.width;
  const heightClass = height ? "" : sizeConfig.height;

  const isCircular = variant === "circular";
  const circularSizes = {
    sm: "w-8 h-8 min-w-8 min-h-8",
    md: "w-10 h-10 min-w-10 min-h-10",
    lg: "w-12 h-12 min-w-12 min-h-12",
    xl: "w-16 h-16 min-w-16 min-h-16",
  };
  const circularClasses = isCircular ? circularSizes[size] : "";

  const customStyle: React.CSSProperties = {
    ...style,
    ...(width && {
      width: typeof width === "number" ? `${width}px` : width,
      minWidth: typeof width === "number" ? `${width}px` : width,
    }),
    ...(height && {
      height: typeof height === "number" ? `${height}px` : height,
      minHeight: typeof height === "number" ? `${height}px` : height,
    }),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? "w-3/4" : "w-full";

          return (
            <div
              key={index}
              className={[
                baseClasses,
                animationClasses[animation],
                variantClasses[variant],
                heightClass,
                lineWidth,
                className,
              ]
                .filter(Boolean)
                .join(" ")}
              style={customStyle}
              {...props}
            />
          );
        })}
      </div>
    );
  }

  const skeletonClasses = [
    baseClasses,
    animationClasses[animation],
    variantClasses[variant],
    isCircular ? circularClasses : `${widthClass} ${heightClass}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={skeletonClasses} style={customStyle} {...props} />;
};

export default Skeleton;
