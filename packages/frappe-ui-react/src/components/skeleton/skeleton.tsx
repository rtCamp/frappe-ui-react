import React from "react";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={`bg-surface-gray-3 dark:bg-surface-gray-4 rounded-md animate-pulse ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
