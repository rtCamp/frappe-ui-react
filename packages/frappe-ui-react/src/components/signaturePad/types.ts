export interface SignaturePadProps {
  /**
   * Width of the signature pad canvas
   * @default "100%"
   */
  width?: string | number;
  /**
   * Height of the signature pad canvas
   * @default 200
   */
  height?: number;
  /**
   * Background color of the canvas
   * @default "#ffffff"
   */
  backgroundColor?: string;
  /**
   * Color of the pen stroke
   * @default "#000000"
   */
  penColor?: string;
  /**
   * Thickness of the pen stroke
   * @default 2
   */
  penWidth?: number;
  /**
   * Minimum width between points for drawing
   * @default 0.5
   */
  minWidth?: number;
  /**
   * Maximum width between points for drawing
   * @default 2.5
   */
  maxWidth?: number;
  /**
   * Callback when signature changes
   */
  onChange?: (dataUrl: string) => void;
  /**
   * Callback when signature is cleared
   */
  onClear?: () => void;
  /**
   * Whether the pad is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Show clear button
   * @default true
   */
  showClearButton?: boolean;
  /**
   * Show download button
   * @default false
   */
  showDownloadButton?: boolean;
  /**
   * Custom class name for the container
   */
  className?: string;
}

export interface SignaturePadRef {
  /**
   * Clear the signature
   */
  clear: () => void;
  /**
   * Get signature as data URL
   */
  getDataURL: (type?: string, quality?: number) => string;
  /**
   * Get signature as blob
   */
  getBlob: (callback: (blob: Blob | null) => void) => void;
  /**
   * Check if signature pad is empty
   */
  isEmpty: () => boolean;
  /**
   * Set signature from data URL
   */
  fromDataURL: (dataURL: string) => void;
}


