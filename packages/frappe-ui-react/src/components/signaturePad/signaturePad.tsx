import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { Button } from "../button";
import type { SignaturePadProps, SignaturePadRef } from "./types";

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  (
    {
      width = "100%",
      height = 200,
      backgroundColor = "#ffffff",
      penColor = "#000000",
      penWidth = 2,
      minWidth = 0.5,
      maxWidth = 2.5,
      onChange,
      onClear,
      disabled = false,
      showClearButton = true,
      showDownloadButton = false,
      className = "",
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = height;

      // Set drawing styles
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [height, backgroundColor, penColor, penWidth]);

    const getPointFromEvent = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const drawLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    const startDrawing = (point: { x: number; y: number }) => {
      if (disabled) return;
      setIsDrawing(true);
      lastPointRef.current = point;
      setIsEmpty(false);
    };

    const draw = (point: { x: number; y: number }) => {
      if (!isDrawing || !lastPointRef.current || disabled) return;

      drawLine(lastPointRef.current, point);
      lastPointRef.current = point;
    };

    const stopDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false);
        lastPointRef.current = null;
        if (onChange) {
          const dataURL = canvasRef.current?.toDataURL() || "";
          onChange(dataURL);
        }
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getPointFromEvent(e);
      if (point) startDrawing(point);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getPointFromEvent(e);
      if (point) draw(point);
    };

    const handleMouseUp = () => {
      stopDrawing();
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const point = getPointFromEvent(e);
      if (point) startDrawing(point);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const point = getPointFromEvent(e);
      if (point) draw(point);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      stopDrawing();
    };

    const clear = () => {
      const canvas = canvasRef.current;
      if (!canvas || disabled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setIsEmpty(true);
      onClear?.();
      if (onChange) {
        onChange("");
      }
    };

    const getDataURL = (type = "image/png", quality?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return "";
      return canvas.toDataURL(type, quality);
    };

    const getBlob = (callback: (blob: Blob | null) => void) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        callback(null);
        return;
      }
      canvas.toBlob(callback);
    };

    const fromDataURL = (dataURL: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setIsEmpty(false);
      };
      img.src = dataURL;
    };

    useImperativeHandle(ref, () => ({
      clear,
      getDataURL,
      getBlob,
      isEmpty: () => isEmpty,
      fromDataURL,
    }));

    const handleDownload = () => {
      const dataURL = getDataURL();
      const link = document.createElement("a");
      link.download = `signature-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
    };

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div
          className="border border-outline-gray-2 rounded bg-surface-white"
          style={{ width }}
        >
          <canvas
            ref={canvasRef}
            className={`${disabled ? "cursor-not-allowed" : "cursor-crosshair"} select-none`}
            style={{ width: "100%", height: `${height}px`, display: "block" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
        {(showClearButton || showDownloadButton) && (
          <div className="flex gap-2">
            {showClearButton && (
              <Button
                label="Clear"
                theme="gray"
                variant="outline"
                size="sm"
                onClick={clear}
                disabled={disabled || isEmpty}
              />
            )}
            {showDownloadButton && (
              <Button
                label="Download"
                theme="blue"
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={disabled || isEmpty}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

SignaturePad.displayName = "SignaturePad";

