import { useState, useRef, useEffect, useCallback } from "react";

interface UseTouchHandlerOptions {
  targetRef: React.RefObject<HTMLElement | null | undefined>;
  zoomLevel?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onDoubleTap?: (event: TouchEvent) => void;
  onTap?: (event: TouchEvent) => void;
  onPanStart?: (event: TouchEvent) => void;
  onPanMove?: (deltaX: number, deltaY: number, event: TouchEvent) => void;
  onPanAnimate?: (x: number, y: number) => void;
  onPanEnd?: (event: TouchEvent) => void;
  onPinchStart?: (event: TouchEvent) => void;
  onPinchMove?: (scale: number, event: TouchEvent) => void;
  onPinchEnd?: (event: TouchEvent) => void;
  doubleTapDelay?: number;
  minSwipeDistance?: number;
  maxVerticalSwipeDistance?: number;
  maxTapDuration?: number;
  maxTapMovement?: number;
  panThreshold?: number;
  inertiaDamping?: number;
  inertiaVelocityThreshold?: number;
}

export const useTouchHandler = (options: UseTouchHandlerOptions) => {
  const {
    targetRef,
    zoomLevel = 100,
    onSwipeLeft,
    onSwipeRight,
    onDoubleTap,
    onTap,
    onPanStart,
    onPanMove,
    onPanAnimate,
    onPanEnd,
    onPinchStart,
    onPinchMove,
    onPinchEnd,
    doubleTapDelay = 300,
    minSwipeDistance = 50,
    maxVerticalSwipeDistance = 75,
    maxTapDuration = 200,
    maxTapMovement = 10,
    panThreshold = 5,
    inertiaDamping = 0.94,
    inertiaVelocityThreshold = 0.5,
  } = options;

  const [isPanning, setIsPanning] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [isAnimatingPan, setIsAnimatingPan] = useState(false);

  const startPanCoords = useRef({ x: 0, y: 0 });
  const lastTapTime = useRef(0);
  const touchStartTime = useRef(0);
  const touchStartDistance = useRef(0);
  const initialTouchPoints = useRef<TouchList | null>(null);

  const lastMoveTime = useRef(0);
  const lastMoveCoords = useRef({ x: 0, y: 0 });
  const panVelocity = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  const cancelInertiaAnimation = () => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    setIsAnimatingPan(false);
    panVelocity.current = { x: 0, y: 0 };
  };

  const handleTouchStart = useCallback((event: TouchEvent) => {
    cancelInertiaAnimation();
    event.preventDefault();

    setIsPanning(false);
    setIsPinching(false);
    initialTouchPoints.current = event.touches;

    const currentTime = performance.now();
    const timeSinceLastTap = currentTime - lastTapTime.current;

    if (
      timeSinceLastTap < doubleTapDelay &&
      timeSinceLastTap > 0 &&
      event.touches.length === 1 &&
      onDoubleTap
    ) {
      onDoubleTap(event);
      lastTapTime.current = 0;
      touchStartTime.current = 0;
      return;
    }

    touchStartTime.current = currentTime;
    if (event.touches.length === 1) {
      lastTapTime.current = currentTime;
      const touch = event.touches[0];
      startPanCoords.current = { x: touch.clientX, y: touch.clientY };
      lastMoveTime.current = currentTime;
      lastMoveCoords.current = { ...startPanCoords.current };
      panVelocity.current = { x: 0, y: 0 };
      if (onPanStart) onPanStart(event);
    } else if (event.touches.length === 2) {
      lastTapTime.current = 0;
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      touchStartDistance.current = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      setIsPinching(true);
      if (onPinchStart) onPinchStart(event);
    } else {
      lastTapTime.current = 0;
      touchStartTime.current = 0;
    }
  }, [onDoubleTap, doubleTapDelay, onPanStart, onPinchStart]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!initialTouchPoints.current) return;

    event.preventDefault();

    const currentTime = performance.now();
    const deltaTime = currentTime - lastMoveTime.current;

    if (event.touches.length === 2 && initialTouchPoints.current.length === 2) {
      setIsPanning(false);
      setIsPinching(true);
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );

      if (touchStartDistance.current > 0 && onPinchMove) {
        const scale = currentDistance / touchStartDistance.current;
        onPinchMove(scale, event);
      }
      panVelocity.current = { x: 0, y: 0 };
    } else if (
      event.touches.length === 1 &&
      initialTouchPoints.current.length === 1 &&
      !isPinching
    ) {
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const rawDeltaX = currentX - lastMoveCoords.current.x;
      const rawDeltaY = currentY - lastMoveCoords.current.y;

      if (deltaTime > 1) {
        panVelocity.current = {
          x: rawDeltaX / deltaTime,
          y: rawDeltaY / deltaTime,
        };
      } else {
        panVelocity.current = { x: 0, y: 0 };
      }

      lastMoveTime.current = currentTime;
      lastMoveCoords.current = { x: currentX, y: currentY };

      const deltaXFromStart = currentX - startPanCoords.current.x;
      const deltaYFromStart = currentY - startPanCoords.current.y;

      if (
        !isPanning &&
        zoomLevel > 100 &&
        (Math.abs(deltaXFromStart) > panThreshold ||
          Math.abs(deltaYFromStart) > panThreshold)
      ) {
        setIsPanning(true);
        startPanCoords.current = {
          x: currentX,
          y: currentY,
        };
      }

      if (isPanning && onPanMove) {
        const zoomFactor = zoomLevel / 100;
        const panDeltaX = deltaXFromStart / zoomFactor;
        const panDeltaY = deltaYFromStart / zoomFactor;
        onPanMove(panDeltaX, panDeltaY, event);
      }
    }
  }, [isPanning, isPinching, zoomLevel, panThreshold, onPanMove, onPinchMove]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    const touchesLeft = event.touches.length;
    const touchEndTime = performance.now();
    const wasPanning = isPanning;
    const wasPinching = isPinching;

    const finalVelocity = { ...panVelocity.current };

    if (
      wasPanning &&
      initialTouchPoints.current &&
      touchesLeft < initialTouchPoints.current.length
    ) {
      setIsPanning(false);
      if (onPanEnd) onPanEnd(event);

      const velocityMagnitude = Math.hypot(finalVelocity.x, finalVelocity.y);
      if (
        velocityMagnitude > inertiaVelocityThreshold &&
        onPanAnimate &&
        zoomLevel > 100
      ) {
        setIsAnimatingPan(true);
        let lastFrameTime = performance.now();
        const animVelocity = { ...finalVelocity };

        const animate = (currentTime: number) => {
          if (!isAnimatingPan) return;

          const frameDeltaTime = Math.max(1, currentTime - lastFrameTime);
          lastFrameTime = currentTime;

          const zoomFactor = zoomLevel / 100;
          const moveX = (animVelocity.x * frameDeltaTime) / zoomFactor;
          const moveY = (animVelocity.y * frameDeltaTime) / zoomFactor;

          onPanAnimate(moveX, moveY);

          const dampingFactor = Math.pow(
            Math.min(0.999, inertiaDamping),
            frameDeltaTime / 16.67
          );
          animVelocity.x *= dampingFactor;
          animVelocity.y *= dampingFactor;

          if (
            Math.hypot(animVelocity.x, animVelocity.y) < 0.01 ||
            zoomLevel <= 100
          ) {
            cancelInertiaAnimation();
          } else {
            animationFrameId.current = requestAnimationFrame(animate);
          }
        };
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        panVelocity.current = { x: 0, y: 0 };
      }
    } else if (!wasPanning) {
      panVelocity.current = { x: 0, y: 0 };
    }

    if (wasPinching && touchesLeft < 2) {
      setIsPinching(false);
      touchStartDistance.current = 0;
      if (onPinchEnd) onPinchEnd(event);
    }

    if (
      touchesLeft === 0 &&
      event.changedTouches.length === 1 &&
      touchStartTime.current > 0 &&
      initialTouchPoints.current?.length === 1
    ) {
      const endCoords = event.changedTouches[0];
      const deltaX = endCoords.clientX - startPanCoords.current.x;
      const deltaY = endCoords.clientY - startPanCoords.current.y;
      const duration = touchEndTime - touchStartTime.current;

      if (
        !wasPanning &&
        zoomLevel <= 100 &&
        Math.abs(deltaX) > minSwipeDistance &&
        Math.abs(deltaY) < maxVerticalSwipeDistance
      ) {
        if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        } else if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        }
      } else if (
        !wasPanning &&
        duration < maxTapDuration &&
        Math.abs(deltaX) < maxTapMovement &&
        Math.abs(deltaY) < maxTapMovement &&
        onTap
      ) {
        onTap(event);
      }
    }

    if (touchesLeft === 0) {
      touchStartTime.current = 0;
      startPanCoords.current = { x: 0, y: 0 };
      initialTouchPoints.current = null;
      setIsPinching(false);
      if (!isAnimatingPan) {
        panVelocity.current = { x: 0, y: 0 };
      }
    } else if (touchesLeft === 1 && !isPanning && !isPinching) {
      startPanCoords.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      touchStartTime.current = performance.now();
      initialTouchPoints.current = event.touches;
    }
  }, [isPanning, isPinching, zoomLevel, minSwipeDistance, maxVerticalSwipeDistance, maxTapDuration, maxTapMovement, inertiaVelocityThreshold, inertiaDamping, isAnimatingPan, onSwipeLeft, onSwipeRight, onTap, onPanEnd, onPanAnimate, onPinchEnd]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    target.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    target.addEventListener("touchmove", handleTouchMove, { passive: false });
    target.addEventListener("touchend", handleTouchEnd, { passive: true });
    target.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
      target.removeEventListener("touchend", handleTouchEnd);
      target.removeEventListener("touchcancel", handleTouchEnd);
      cancelInertiaAnimation();
    };
  }, [targetRef, handleTouchEnd, handleTouchMove, handleTouchStart]);

  return {
    isPanning,
    isPinching,
    isAnimatingPan,
  };
};
