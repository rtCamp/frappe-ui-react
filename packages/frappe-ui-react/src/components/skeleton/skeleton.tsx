import React from "react";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="skeleton"
      className={`bg-gray-200 dark:bg-gray-400 rounded-md animate-pulse ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
