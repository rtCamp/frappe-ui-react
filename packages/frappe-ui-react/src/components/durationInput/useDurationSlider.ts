import { useMemo, useState } from "react";

/**
 * Hook parameters for duration slider
 */
interface UseDurationSliderParams {
  /** Maximum duration allowed in minutes */
  maxDuration: number;
  /** Slider step size in minutes */
  sliderStepInMins: number;
}

/**
 * Hook return value
 */
interface UseDurationSliderReturn {
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
  notchOffsets: number[];
}

/**
 * Hook for managing duration slider state and calculations
 * @param params - Configuration object
 * @param params.maxDuration - Maximum selectable duration in minutes
 * @param params.sliderStepInMins - Step increment for slider in minutes
 * @returns Object with interaction state and notch offsets
 *
 * @example
 * const { notchOffsets, isDragging, setIsDragging } = useDurationSlider({
 *   maxDuration: 120,
 *   sliderStepInMins: 5,
 * });
 */
export const useDurationSlider = ({
  maxDuration,
  sliderStepInMins,
}: UseDurationSliderParams): UseDurationSliderReturn => {
  const [isDragging, setIsDragging] = useState(false);

  const notchOffsets = useMemo(() => {
    const totalSteps = Math.floor(maxDuration / sliderStepInMins);
    return Array.from(
      { length: totalSteps - 1 },
      (_, i) => ((i + 1) / totalSteps) * 100
    );
  }, [maxDuration, sliderStepInMins]);

  return {
    isDragging,
    setIsDragging,
    notchOffsets,
  };
};
