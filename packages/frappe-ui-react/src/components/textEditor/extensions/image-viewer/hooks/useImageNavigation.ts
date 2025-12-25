import { useState, useEffect, useCallback } from "react";

interface UseImageNavigationOptions {
  initialIndex: number;
  imageCount: number;
  onNavigate?: () => void;
}

export const useImageNavigation = ({
  initialIndex,
  imageCount,
  onNavigate,
}: UseImageNavigationOptions) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    onNavigate?.();
  }, [initialIndex, onNavigate]);

  const nextImage = useCallback(() => {
    if (imageCount > 0) {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
      onNavigate?.();
    }
  }, [imageCount, onNavigate]);

  const previousImage = useCallback(() => {
    if (imageCount > 0) {
      setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
      onNavigate?.();
    }
  }, [imageCount, onNavigate]);

  return {
    currentIndex,
    nextImage,
    previousImage,
  };
};
