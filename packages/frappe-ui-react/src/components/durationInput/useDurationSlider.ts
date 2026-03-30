import { useState, useMemo } from "react";

/**
 * Hook parameters for duration slider
 */
interface UseDurationSliderParams {
  /** Initial duration value in minutes */
  initialValue: number;
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
  sliderVal: number;
  setSliderVal: (value: number) => void;
  notchOffsets: number[];
}

/**
 * Hook for managing duration slider state and calculations
 * @param params - Configuration object
 * @param params.initialValue - Starting duration value in minutes
 * @param params.maxDuration - Maximum selectable duration in minutes
 * @param params.sliderStepInMins - Step increment for slider in minutes
 * @returns Object with slider state and handlers
 *
 * @example
 * const { sliderVal, notchOffsets, isDragging, setIsDragging } = useDurationSlider({
 *   initialValue: 30,
 *   maxDuration: 120,
 *   sliderStepInMins: 5,
 * });
 */
export const useDurationSlider = ({
  initialValue,
  maxDuration,
  sliderStepInMins,
}: UseDurationSliderParams): UseDurationSliderReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderVal, setSliderVal] = useState(initialValue);

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
    sliderVal,
    setSliderVal,
    notchOffsets,
  };
};
