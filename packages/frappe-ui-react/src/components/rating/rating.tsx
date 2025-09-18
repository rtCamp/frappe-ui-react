import React, { useState, useEffect } from "react";
import { RatingProps } from "./types";
import FeatherIcon from "../featherIcon";

const defaultProps = {
  value: 0,
  ratingFrom: 5,
  size: "md",
  readonly: false,
};

const Rating: React.FC<RatingProps> = ({
  value = defaultProps.value,
  ratingFrom = defaultProps.ratingFrom,
  size = defaultProps.size,
  readonly = defaultProps.readonly,
  label,
  className = "",
  onChange,
}) => {
  const [rating, setRating] = useState(value);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Keep internal state in sync with prop
  useEffect(() => {
    setRating(value);
  }, [value]);

  const iconClassList = Array.from({ length: ratingFrom }, (_, i) => {
    const index = i + 1;
    const classes = [
      size === "sm" ? "size-4" : "",
      size === "md" ? "size-5" : "",
      size === "lg" ? "size-6" : "",
      size === "xl" ? "size-7" : "",
      index <= hoveredRating && index > rating ? "!fill-yellow-200" : "",
      index <= rating ? "!fill-yellow-500" : "",
      index > rating && index > hoveredRating ? "fill-gray-300" : "",
      !readonly ? "cursor-pointer" : "",
      "text-transparent",
      "mr-0.5",
    ];
    return classes.filter(Boolean).join(" ");
  });

  const markRating = (index: number) => {
    if (readonly) return;
    setRating(index);
    onChange?.(index);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-xs text-ink-gray-5">{label}</label>
      )}
      <div className="flex text-center">
        {Array.from({ length: ratingFrom }, (_, i) => {
          const index = i + 1;
          return (
            <div
              key={index}
              onMouseOver={() => !readonly && setHoveredRating(index)}
              onMouseLeave={() => !readonly && setHoveredRating(0)}
              onClick={() => markRating(index)}
            >
              <FeatherIcon
                name="star"
                className={iconClassList[index - 1]}
                // Optionally, add aria-label or role for accessibility
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
