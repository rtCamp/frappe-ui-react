import React, { useState, useMemo, type ReactNode } from "react";

export interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shape?: "circle" | "square";
  image?: string;
  label?: string;
  children?: ReactNode;
  indicator?: ReactNode;
  alt?: string;
}

const getShapeClasses = (shape: string, size: string): string => {
  const shapeMap: { [key: string]: string | { [key: string]: string } } = {
    circle: "rounded-full",
    square: {
      xs: "rounded-[4px]",
      sm: "rounded-[5px]",
      md: "rounded-[5px]",
      lg: "rounded-[6px]",
      xl: "rounded-[6px]",
      "2xl": "rounded-[8px]",
      "3xl": "rounded-[10px]",
    },
  };
  if (shape === "square") {
    return (shapeMap.square as { [key: string]: string })[size];
  }
  return shapeMap[shape] as string;
};

const getSizeClasses = (size: string): string => {
  const sizeMap: { [key: string]: string } = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
    "3xl": "w-11.5 h-11.5",
  };
  return sizeMap[size];
};

const getLabelClasses = (size: string): string => {
  const sizeMap: { [key: string]: string } = {
    xs: "text-2xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-base",
    xl: "text-lg",
    "2xl": "text-xl",
    "3xl": "text-2xl",
  };
  return ["font-medium", sizeMap[size]].join(" ");
};

const getIndicatorContainerClasses = (size: string): string => {
  const sizeMap: { [key: string]: string } = {
    xs: "-mr-[.1rem] -mb-[.1rem] h-2 w-2",
    sm: "-mr-[.1rem] -mb-[.1rem] h-[9px] w-[9px]",
    md: "-mr-[.1rem] -mb-[.1rem] h-2.5 w-2.5",
    lg: "-mr-[.1rem] -mb-[.1rem] h-3 w-3",
    xl: "-mr-[.1rem] -mb-[.1rem] h-3 w-3",
    "2xl": "-mr-[.1rem] -mb-[.1rem] h-3.5 w-3.5",
    "3xl": "-mr-[.2rem] -mb-[.2rem] h-4 w-4",
  };
  return sizeMap[size];
};

const getIndicatorClasses = (size: string): string => {
  const sizeMap: { [key: string]: string } = {
    xs: "h-1 w-1",
    sm: "h-[5px] w-[5px]",
    md: "h-1.5 w-1.5",
    lg: "h-2 w-2",
    xl: "h-2 w-2",
    "2xl": "h-2.5 w-2.5",
    "3xl": "h-3 w-3",
  };
  return sizeMap[size];
};

const getIconClasses = (size: string): string => {
  const sizeMap: { [key: string]: string } = {
    xs: "h-2.5 w-2.5",
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-4 w-4",
    xl: "h-4 w-4",
    "2xl": "h-5 w-5",
    "3xl": "h-5 w-5",
  };
  return sizeMap[size];
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  shape = "circle",
  image,
  label,
  children,
  indicator,
  alt = "Avatar",
}) => {
  const [imgFetchError, setImgFetchError] = useState<boolean>(false);

  const shapeClasses = useMemo(
    () => getShapeClasses(shape, size),
    [shape, size]
  );
  const sizeClasses = useMemo(() => getSizeClasses(size), [size]);
  const labelClasses = useMemo(() => getLabelClasses(size), [size]);
  const indicatorContainerClasses = useMemo(
    () => getIndicatorContainerClasses(size),
    [size]
  );
  const indicatorClasses = useMemo(() => getIndicatorClasses(size), [size]);
  const iconClasses = useMemo(() => getIconClasses(size), [size]);

  const handleImageError = (): void => {
    setImgFetchError(true);
  };

  const hasDefaultSlot = React.Children.count(children) > 0;
  const hasIndicatorSlot = React.Children.count(indicator) > 0;

  return (
    <div
      className={`relative inline-block shrink-0 ${sizeClasses} ${shapeClasses}`}
    >
      {image && !imgFetchError ? (
        <img
          src={image}
          alt={alt}
          className={`${shapeClasses} h-full w-full object-cover`}
          onError={handleImageError}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-surface-gray-2 uppercase text-ink-gray-5 select-none ${labelClasses} ${shapeClasses}`}
        >
          {hasDefaultSlot ? (
            <div className={iconClasses}>{children}</div>
          ) : (
            label && label[0]
          )}
        </div>
      )}
      {hasIndicatorSlot && (
        <div
          className={`absolute bottom-0 right-0 grid place-items-center rounded-full bg-surface-white ${indicatorContainerClasses}`}
        >
          <div className={indicatorClasses}>{indicator}</div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
