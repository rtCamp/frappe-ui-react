import { useState, useEffect, useRef, useCallback } from "react";

interface UseZoomPanOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  isEnabled: boolean;
}

export const useZoomPan = ({ containerRef, isEnabled }: UseZoomPanOptions) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isMousePanning, setIsMousePanning] = useState(false);
  const startMousePanCoords = useRef({ x: 0, y: 0 });
  const initialPanPositionOnGestureStart = useRef({ x: 0, y: 0 });

  const snapThresholdLower = 90;
  const snapThresholdUpper = 110;

  useEffect(() => {
    if (zoomLevel <= 100) {
      setPanPosition({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 25, 300));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 25, 25);
      if (prev > 100 && newZoom < 100) {
        return 100;
      }
      return newZoom;
    });
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
    setIsMousePanning(false);
    initialPanPositionOnGestureStart.current = { x: 0, y: 0 };
  }, []);

  const handlePanStart = useCallback(
    (event: React.MouseEvent) => {
      if (zoomLevel <= 100) return;
      event.preventDefault();
      setIsMousePanning(true);
      startMousePanCoords.current = { x: event.clientX, y: event.clientY };
      initialPanPositionOnGestureStart.current = { ...panPosition };

      const handlePanMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startMousePanCoords.current.x;
        const deltaY = moveEvent.clientY - startMousePanCoords.current.y;
        const zoomFactor = zoomLevel / 100;

        setPanPosition({
          x: initialPanPositionOnGestureStart.current.x + deltaX / zoomFactor,
          y: initialPanPositionOnGestureStart.current.y + deltaY / zoomFactor,
        });
      };

      const handlePanEnd = () => {
        setIsMousePanning(false);
        document.removeEventListener("mousemove", handlePanMove);
        document.removeEventListener("mouseup", handlePanEnd);
      };

      document.addEventListener("mousemove", handlePanMove);
      document.addEventListener("mouseup", handlePanEnd);
    },
    [zoomLevel, panPosition]
  );

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (!isEnabled) return;

      if (containerRef.current?.contains(event.target as Node)) {
        event.preventDefault();

        const dampingFactor = event.ctrlKey ? 0.5 : 0.2;

        const zoomChange = -event.deltaY * dampingFactor;
        setZoomLevel((currentZoom) => {
          const newZoom = Math.round(currentZoom + zoomChange);
          let clampedZoom = Math.max(25, Math.min(300, newZoom));

          if (
            (currentZoom > 100 && clampedZoom < 100) ||
            (currentZoom < 100 && clampedZoom > 100)
          ) {
            if (Math.abs(100 - clampedZoom) < Math.abs(zoomChange) * 1.5) {
              clampedZoom = 100;
            }
          }

          return clampedZoom;
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, {
        passive: false,
        capture: true,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel, { capture: true });
      }
    };
  }, [containerRef, isEnabled]);

  return {
    zoomLevel,
    setZoomLevel,
    panPosition,
    setPanPosition,
    isMousePanning,
    initialPanPositionOnGestureStart,
    zoomIn,
    zoomOut,
    resetZoom,
    handlePanStart,
    snapThresholdLower,
    snapThresholdUpper,
  };
};
