/**
 * External dependencies.
 */
import { useState, useEffect, useRef, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { type Editor } from "@tiptap/react";
import { X, Upload } from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { Button } from "../../../button";
import { Select } from "../../../select";

interface ExistingImage {
  src: string;
  alt: string;
}

interface ImageItem {
  type: "file" | "existing";
  file?: File;
  existing?: ExistingImage;
  id: string;
  alt?: string;
}

interface UploadedFile {
  file_url: string;
  file_name?: string;
}

interface UploadResult {
  success: boolean;
  file?: UploadedFile;
  error?: Error;
}

interface ImageGroupUploadDialogProps {
  show: boolean;
  onShowChange: (show: boolean) => void;
  files: File[];
  editor: Editor;
  mode: "new" | "edit";
  existingImages?: ExistingImage[];
  initialColumns?: number;
  onClose?: () => void;
  onSave?: (data: { images: ExistingImage[]; columns: number }) => void;
  onUpload?: (data: { images: ExistingImage[]; columns: number }) => void;
}

export function ImageGroupUploadDialog(props: ImageGroupUploadDialogProps) {
  const {
    show,
    onShowChange,
    files: initialFiles,
    editor,
    mode,
    existingImages = [],
    initialColumns,
    onClose,
    onSave,
    onUpload,
  } = props;

  const [images, setImages] = useState<ImageItem[]>([]);
  const [columns, setColumns] = useState<number | null>(null);
  const [isFileDragging, setIsFileDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionEditValue, setCaptionEditValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const captionInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initialize images on mount or when existingImages/initialFiles change
  useEffect(() => {
    if (show) {
      const existingItems = existingImages.map(createExistingImageItem);
      const fileItems = initialFiles.map(createImageItem);
      setImages([...existingItems, ...fileItems]);

      if (initialColumns) {
        setColumns(initialColumns);
      } else {
        const totalImages = existingImages.length + initialFiles.length;
        setColumns(getDefaultColumns(totalImages));
      }
    }
  }, [show, existingImages, initialFiles, initialColumns]);

  // Reset state when modal closes
  useEffect(() => {
    if (!show) {
      setImages([]);
      setColumns(null);
      setIsFileDragging(false);
      setDraggedIndex(null);
      setOverIndex(null);
      setEditingCaption(null);
      setCaptionEditValue("");
      setUploading(false);
      setUploadProgress(0);
      setUploadedCount(0);
      setTotalCount(0);
    }
  }, [show]);

  // Add window-level drag event listeners
  useEffect(() => {
    if (!show) return;

    const handleDragOverWindow = (e: DragEvent) => {
      e.preventDefault();
      if (
        e.dataTransfer &&
        Array.from(e.dataTransfer.types).includes("Files")
      ) {
        setIsFileDragging(true);
      }
    };

    const handleDragLeaveWindow = (e: DragEvent) => {
      if (e.target === window || e.relatedTarget === null) {
        setIsFileDragging(false);
      }
    };

    window.addEventListener("dragover", handleDragOverWindow);
    window.addEventListener("dragleave", handleDragLeaveWindow);

    return () => {
      window.removeEventListener("dragover", handleDragOverWindow);
      window.removeEventListener("dragleave", handleDragLeaveWindow);
    };
  }, [show]);

  // Focus caption input when editing
  useEffect(() => {
    if (editingCaption && captionInputRef.current) {
      captionInputRef.current.focus();
      captionInputRef.current.select();
    }
  }, [editingCaption]);

  function createImageItem(file: File): ImageItem {
    return {
      type: "file",
      file,
      id: `file-${file.name}-${file.size}-${Date.now()}`,
    };
  }

  function createExistingImageItem(existing: ExistingImage): ImageItem {
    return {
      type: "existing",
      existing,
      id: `existing-${existing.src}-${Date.now()}`,
    };
  }

  function getDefaultColumns(count: number) {
    if (count <= 4) return count;
    if (count % 4 === 0) return 4;
    if (count % 3 === 0) return 3;
    if (count > 10) return 4;
    return 3;
  }

  function handleClose() {
    onShowChange(false);
    onClose?.();
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function addFiles(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImageItems = imageFiles.map(createImageItem);

    const existingFileSignatures = images
      .filter((item) => item.type === "file" && item.file)
      .map((item) => `${item.file!.name}-${item.file!.size}`);

    const uniqueNewItems = newImageItems.filter(
      (item) =>
        !existingFileSignatures.includes(
          `${item.file!.name}-${item.file!.size}`
        )
    );

    setImages((prev) => [...prev, ...uniqueNewItems]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer?.files || []);
    if (droppedFiles.length) {
      addFiles(droppedFiles);
    } else if (
      draggedIndex !== null &&
      overIndex !== null &&
      draggedIndex !== overIndex
    ) {
      // Handle image reordering
      setImages((prev) => {
        const newImages = [...prev];
        const [moved] = newImages.splice(draggedIndex, 1);
        newImages.splice(overIndex, 0, moved);
        return newImages;
      });
    }
    setIsFileDragging(false);
    setDraggedIndex(null);
    setOverIndex(null);
  }

  function onDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setOverIndex(idx);
  }

  function onDragStart(idx: number) {
    setDraggedIndex(idx);
  }

  function onDragEnd() {
    setDraggedIndex(null);
    setOverIndex(null);
  }

  function onDragLeave(e: React.DragEvent, idx: number) {
    if (overIndex === idx) {
      setOverIndex(null);
    }
  }

  function isDropTarget(idx: number) {
    return overIndex === idx && draggedIndex !== null && draggedIndex !== idx;
  }

  function removeImage(idx: number) {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(idx, 1);
      return newImages;
    });
  }

  function getImageSrc(item: ImageItem): string {
    if (item.type === "existing") {
      return item.existing!.src;
    } else {
      return filePreview(item.file!);
    }
  }

  function getImageAlt(item: ImageItem): string {
    if (item.type === "existing") {
      return item.existing!.alt || "";
    } else {
      return item.alt || "";
    }
  }

  function filePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  function isImageSupported(file: File): boolean {
    // HEIC/HEIF files can't be previewed in browsers
    const unsupportedTypes = ["image/heic", "image/heif"];
    const unsupportedExtensions = [".heic", ".heif"];

    const hasUnsupportedType = unsupportedTypes.includes(file.type);
    const hasUnsupportedExtension = unsupportedExtensions.some((ext) =>
      file.name?.toLowerCase().endsWith(ext)
    );

    return !hasUnsupportedType && !hasUnsupportedExtension;
  }

  function startEditingCaption(itemId: string, currentAlt: string) {
    setEditingCaption(itemId);
    setCaptionEditValue(currentAlt);
  }

  function saveCaption(itemId: string, itemIndex: number) {
    const newCaption = captionEditValue.trim();

    setImages((prev) => {
      const newImages = [...prev];
      const item = newImages[itemIndex];

      if (item.type === "existing" && item.existing) {
        item.existing.alt = newCaption;
      } else if (item.type === "file") {
        item.alt = newCaption;
      }

      return newImages;
    });

    setEditingCaption(null);
    setCaptionEditValue("");
  }

  function cancelEditingCaption() {
    setEditingCaption(null);
    setCaptionEditValue("");
  }

  function handleCaptionBlur(itemId: string, itemIndex: number) {
    if (editingCaption === itemId) {
      saveCaption(itemId, itemIndex);
    }
  }

  function handleCaptionKeyDown(
    e: React.KeyboardEvent,
    itemId: string,
    itemIndex: number
  ) {
    if (e.key === "Enter") {
      saveCaption(itemId, itemIndex);
    } else if (e.key === "Escape") {
      cancelEditingCaption();
    }
  }

  function getUploadFunction() {
    const imageGroupExtension = editor.extensionManager.extensions.find(
      (ext) => ext.name === "imageGroup"
    );
    return imageGroupExtension?.options?.uploadFunction;
  }

  async function uploadFiles(files: File[]): Promise<UploadResult[]> {
    const uploadFunction = getUploadFunction();
    if (!uploadFunction) {
      console.error("uploadFunction not found");
      throw new Error("Upload function not found");
    }

    setUploading(true);
    setTotalCount(files.length);
    setUploadedCount(0);
    setUploadProgress(0);

    const uploadPromises = files.map(async (file) => {
      try {
        const result = await uploadFunction(file);
        return { success: true, file: result };
      } catch (error) {
        const err = error as Error;
        return { success: false, error: err };
      } finally {
        setUploadedCount((prev) => {
          const newCount = prev + 1;
          setUploadProgress(Math.round((newCount / files.length) * 100));
          return newCount;
        });
      }
    });

    // Execute all uploads in parallel
    const results = await Promise.all(uploadPromises);
    return results;
  }

  async function handleSave() {
    if (images.length === 0) {
      handleClose();
      return;
    }

    const filesToUpload = images
      .filter((item) => item.type === "file" && item.file)
      .map((item) => item.file!);

    let uploadedFiles: UploadedFile[] = [];

    if (filesToUpload.length > 0) {
      try {
        const results = await uploadFiles(filesToUpload);
        uploadedFiles = results
          .filter((r) => r.success && r.file)
          .map((r) => r.file!);

        if (uploadedFiles.length !== filesToUpload.length) {
          console.error("Some files failed to upload");
          // You might want to show an error message to the user here
          return;
        }
      } catch (error) {
        console.error("Upload failed:", error);
        return;
      }
    }

    // Create final image list combining uploaded files and existing images
    const finalImages: ExistingImage[] = [];
    let uploadedIndex = 0;

    for (const item of images) {
      if (item.type === "existing") {
        finalImages.push(item.existing!);
      } else if (item.type === "file") {
        const uploadedFile = uploadedFiles[uploadedIndex++];
        if (uploadedFile) {
          finalImages.push({
            src: uploadedFile.file_url,
            alt: item.alt || "",
          });
        }
      }
    }

    onSave?.({ images: finalImages, columns: columns || 4 });
    handleClose();
  }

  async function handleUpload() {
    if (images.length === 0) {
      handleClose();
      return;
    }

    const filesToUpload = images
      .filter((item) => item.type === "file" && item.file)
      .map((item) => item.file!);

    if (filesToUpload.length === 0) {
      handleClose();
      return;
    }

    try {
      const results = await uploadFiles(filesToUpload);
      const uploadedFiles = results
        .filter((r) => r.success && r.file)
        .map((r) => r.file!);

      if (uploadedFiles.length !== filesToUpload.length) {
        console.error("Some files failed to upload");
        return;
      }

      const finalImages: ExistingImage[] = uploadedFiles.map((file, idx) => ({
        src: file.file_url,
        alt: images[idx]?.alt || "",
      }));

      onUpload?.({ images: finalImages, columns: columns || 4 });
      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns || 4}, minmax(0, 1fr))`,
  };

  const internalColumns = String(columns ?? 4);

  const selectOptions = [
    { label: "2 columns", value: "2" },
    { label: "3 columns", value: "3" },
    { label: "4 columns", value: "4" },
  ];

  function handleColumnsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setColumns(+e.target.value);
  }

  if (!show) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "new" ? "Upload Images" : "Edit Image Group"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {images.length === 0 ? (
            <div
              className={clsx(
                "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                isFileDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              )}
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-2">
                Drag and drop images here, or click to select files
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Select Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  {images.length} image{images.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Add More
                  </Button>
                  <Select
                    options={selectOptions}
                    value={internalColumns}
                    onChange={handleColumnsChange}
                    size="sm"
                    variant="subtle"
                  />
                </div>
              </div>

              <div
                className={clsx(
                  "grid gap-2 rounded-lg transition-colors p-2",
                  isFileDragging
                    ? "bg-blue-50 border-2 border-blue-500 border-dashed"
                    : ""
                )}
                style={gridStyle}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {images.map((item, idx) => {
                  const src = getImageSrc(item);
                  const alt = getImageAlt(item);
                  const isSupported =
                    item.type === "existing" ||
                    (item.file && isImageSupported(item.file));
                  const isEditing = editingCaption === item.id;
                  const isDragTarget = isDropTarget(idx);

                  return (
                    <div
                      key={item.id}
                      className={clsx(
                        "relative aspect-square overflow-hidden bg-gray-100 rounded group",
                        isDragTarget && "ring-2 ring-blue-500"
                      )}
                      draggable
                      onDragStart={() => onDragStart(idx)}
                      onDragEnd={onDragEnd}
                      onDragOver={(e) => onDragOver(e, idx)}
                      onDragLeave={(e) => onDragLeave(e, idx)}
                    >
                      {/* Remove button */}
                      <button
                        type="button"
                        className="absolute top-1 right-1 z-10 bg-white/90 hover:bg-white rounded-full p-1 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Remove image"
                        onClick={() => removeImage(idx)}
                      >
                        <X className="w-4 h-4 text-gray-700" />
                      </button>

                      {/* Image */}
                      {isSupported ? (
                        <img
                          src={src}
                          alt={alt}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200">
                          <p className="text-xs text-gray-500 text-center px-2">
                            Preview not available
                          </p>
                        </div>
                      )}

                      {/* Caption overlay */}
                      <div
                        className={clsx(
                          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity",
                          !isEditing && !alt
                            ? "opacity-0 group-hover:opacity-100"
                            : "opacity-100"
                        )}
                        onClick={() => {
                          if (!isEditing) {
                            startEditingCaption(item.id, alt);
                          }
                        }}
                      >
                        {isEditing ? (
                          <input
                            ref={captionInputRef}
                            type="text"
                            value={captionEditValue}
                            onChange={(e) =>
                              setCaptionEditValue(e.target.value)
                            }
                            onBlur={() => handleCaptionBlur(item.id, idx)}
                            onKeyDown={(e) =>
                              handleCaptionKeyDown(e, item.id, idx)
                            }
                            className="w-full bg-white/90 text-gray-900 text-xs px-2 py-1 rounded border-none outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add caption..."
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <div
                            className="text-white text-xs truncate cursor-text"
                            title={alt || "Click to add caption"}
                          >
                            {alt || "Add caption..."}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          )}

          {/* Upload progress */}
          {uploading && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Uploading {uploadedCount} of {totalCount}...
                </span>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <Button variant="subtle" onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          {mode === "edit" ? (
            <Button
              onClick={handleSave}
              disabled={uploading || images.length === 0}
            >
              {uploading ? "Uploading..." : "Save"}
            </Button>
          ) : (
            <Button
              onClick={handleUpload}
              disabled={uploading || images.length === 0}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
