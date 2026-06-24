/**
 * External dependencies.
 */
import { useId } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../utils";
import "./spinner.css";

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => {
  const gradientId = useId();

  return (
    <svg
      className={cn("spinner text-[#006edb]", className)}
      viewBox="0 0 50 50"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <circle
        stroke={`url(#${gradientId})`}
        className="spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
};

export default Spinner;
