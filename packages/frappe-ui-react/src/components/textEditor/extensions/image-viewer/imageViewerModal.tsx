/**
 * External dependencies.
 */
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Download,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
} from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { Tooltip } from "../../../tooltip";
import { useZoomPan } from "./hooks/useZoomPan";
import { useImageNavigation } from "./hooks/useImageNavigation";
import { useTouchHandler } from "./hooks/useTouchHandler";

interface ImageInfo {
  src: string;
  alt: string | null;
}

interface ImageViewerModalProps {
  show: boolean;
  images: ImageInfo[];
  initialIndex: number;
  onClose: () => void;
}

const ImageViewerModal = ({
  show,
  images,
  initialIndex,
  onClose,
}: ImageViewerModalProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const controlsBarRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStartZoom, setTouchStartZoom] = useState(100);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const INACTIVITY_TIMEOUT = 3000;

  const {
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
  } = useZoomPan({
    containerRef: imageContainerRef,
    isEnabled: show,
  });

  const { currentIndex, nextImage, previousImage } = useImageNavigation({
    initialIndex,
    imageCount: images.length,
    onNavigate: resetZoom,
  });

  const currentImage = useMemo(
    () => images[currentIndex],
    [images, currentIndex]
  );

  const {
    isPanning: isTouchPanning,
    isPinching,
    isAnimatingPan,
  } = useTouchHandler({
    targetRef: imageContainerRef,
    zoomLevel,
    panThreshold: 10,
    onSwipeLeft: () => {
      if (zoomLevel <= 100) nextImage();
    },
    onSwipeRight: () => {
      if (zoomLevel <= 100) previousImage();
    },
    onDoubleTap: (event) => {
      if (controlsBarRef.current?.contains(event.target as Node)) return;

      if (zoomLevel > 100) {
        resetZoom();
      } else {
        setZoomLevel(200);
        setPanPosition({ x: 0, y: 0 });
      }
    },
    onTap: (event) => {
      if (event.target === backdropRef.current) {
        onClose();
      }
    },
    onPanStart: () => {
      if (zoomLevel <= 100) return;
      initialPanPositionOnGestureStart.current = { ...panPosition };
    },
    onPanMove: (deltaX, deltaY) => {
      if (zoomLevel <= 100) return;
      setPanPosition({
        x: initialPanPositionOnGestureStart.current.x + deltaX,
        y: initialPanPositionOnGestureStart.current.y + deltaY,
      });
    },
    onPanAnimate: (deltaX, deltaY) => {
      setPanPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    },
    onPinchStart: () => {
      setTouchStartZoom(zoomLevel);
      initialPanPositionOnGestureStart.current = { ...panPosition };
    },
    onPinchMove: (scale) => {
      const newZoom = touchStartZoom * scale;
      let finalZoom = Math.max(25, Math.min(300, Math.round(newZoom)));

      if (finalZoom > snapThresholdLower && finalZoom < snapThresholdUpper) {
        finalZoom = 100;
      }
      setZoomLevel(finalZoom);
    },
    onPinchEnd: () => {
      if (zoomLevel < 100) {
        resetZoom();
      }
      initialPanPositionOnGestureStart.current = { x: 0, y: 0 };
    },
  });

  const isPanning = isMousePanning || isTouchPanning;

  const showControlsAndResetTimer = useCallback(() => {
    setIsControlsVisible(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (!isPanning && !isPinching) {
        setIsControlsVisible(false);
      } else {
        showControlsAndResetTimer();
      }
    }, INACTIVITY_TIMEOUT);
  }, [isPanning, isPinching]);

  const handleActivity = useCallback(() => {
    if (!isPinching || !isControlsVisible) {
      showControlsAndResetTimer();
    }
  }, [isPinching, isControlsVisible, showControlsAndResetTimer]);

  const close = useCallback(() => {
    onClose();
    resetZoom();
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, [onClose, resetZoom]);

  const downloadImage = () => {
    const imageToDownload = currentImage;

    const link = document.createElement("a");
    link.href = imageToDownload.src;

    const filename =
      imageToDownload.alt?.replace(/[^a-z0-9]/gi, "_").toLowerCase() ||
      imageToDownload.src.split("/").pop() ||
      "download";
    link.download = filename.includes(".") ? filename : `${filename}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = useCallback(() => {
    const container = imageContainerRef.current;

    if (!isFullscreen) {
      if (container?.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!show) return;

      handleActivity();

      switch (event.key) {
        case "ArrowLeft":
          if (!isPanning) previousImage();
          event.preventDefault();
          break;
        case "ArrowRight":
          if (!isPanning) nextImage();
          event.preventDefault();
          break;
        case "+":
        case "=":
          zoomIn();
          event.preventDefault();
          break;
        case "-":
          zoomOut();
          event.preventDefault();
          break;
        case "Escape":
          close();
          event.preventDefault();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          event.preventDefault();
          break;
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    show,
    isPanning,
    handleActivity,
    previousImage,
    nextImage,
    zoomIn,
    zoomOut,
    close,
    toggleFullscreen,
  ]);

  useEffect(() => {
    if (show) {
      setIsControlsVisible(true);
      resetZoom();
      showControlsAndResetTimer();
    } else {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      if (isFullscreen && document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (isFullscreen && document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, [show, isFullscreen, resetZoom, showControlsAndResetTimer]);

  if (!show) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black sm:bg-black/90 z-[50] flex flex-col justify-center items-center overflow-hidden touch-none transition-opacity duration-150 ease-in-out"
      ref={imageContainerRef}
      onMouseMove={handleActivity}
      onTouchStart={handleActivity}
      onTouchMove={handleActivity}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 z-0" ref={backdropRef} onClick={close} />

      {/* Image Container */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt || "Image preview"}
          className="max-w-screen max-h-screen object-contain block"
          style={{
            transform: `scale(${zoomLevel / 100}) translate(${
              panPosition.x
            }px, ${panPosition.y}px)`,
            cursor:
              zoomLevel > 100
                ? isMousePanning
                  ? "grabbing"
                  : "grab"
                : "default",
            transition:
              isPanning || isPinching || isAnimatingPan
                ? "none"
                : "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
          onMouseDown={handlePanStart}
          draggable={false}
        />
      </div>

      {/* Caption */}
      {currentImage.alt && (
        <div
          className={clsx(
            "absolute bottom-4 p-2 text-center rounded-sm text-white text-sm bg-black/65 z-10 transition-opacity duration-300 ease-in-out",
            { "opacity-0 pointer-events-none": !isControlsVisible }
          )}
        >
          {currentImage.alt}
        </div>
      )}

      {/* Controls bar */}
      <div
        ref={controlsBarRef}
        className={clsx(
          "absolute top-4 flex items-center space-x-3 p-2 text-white z-20 transition-opacity duration-300 ease-in-out",
          { "opacity-0 pointer-events-none": !isControlsVisible }
        )}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Navigation controls */}
        <div className="bg-black/65 rounded flex items-center">
          <Tooltip text="Previous image">
            <button
              className="p-2 hover:bg-gray-900 rounded-l focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
            >
              <ChevronLeft className="size-4" />
            </button>
          </Tooltip>

          <span className="px-2 text-sm tabular-nums text-gray-400 select-none">
            {currentIndex + 1}/{images.length}
          </span>

          <Tooltip text="Next image">
            <button
              className="p-2 hover:bg-gray-900 rounded-r focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="size-4" />
            </button>
          </Tooltip>
        </div>

        {/* Zoom controls */}
        <div className="bg-black/65 rounded flex items-center">
          <Tooltip text="Zoom out">
            <button
              className="p-2 hover:bg-gray-900 rounded-l focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
            >
              <Minus className="size-4" />
            </button>
          </Tooltip>

          <Tooltip text="Reset zoom">
            <button
              className="p-2 hover:bg-gray-900 text-sm text-gray-400 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
            >
              {zoomLevel}%
            </button>
          </Tooltip>

          <Tooltip text="Zoom in">
            <button
              className="p-2 hover:bg-gray-900 rounded-r focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
            >
              <Plus className="size-4" />
            </button>
          </Tooltip>
        </div>

        {/* Action controls */}
        <div className="bg-black/65 rounded flex items-center">
          <Tooltip text="Download image">
            <button
              className="p-2 hover:bg-gray-900 rounded-l focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                downloadImage();
              }}
            >
              <Download className="size-4" />
            </button>
          </Tooltip>

          <Tooltip text={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            <button
              className="p-2 hover:bg-gray-900 rounded-r focus:outline-none hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
            >
              {!isFullscreen ? (
                <Maximize className="size-4" />
              ) : (
                <Minimize className="size-4" />
              )}
            </button>
          </Tooltip>
        </div>

        {/* Close button */}
        <div className="bg-black/65 rounded flex items-center">
          <Tooltip text="Close">
            <button
              className="p-2 hover:bg-gray-900 rounded focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <X className="size-4" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
