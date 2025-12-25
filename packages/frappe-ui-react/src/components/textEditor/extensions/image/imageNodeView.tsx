/**
 * External dependencies.
 */
import { useRef, useState, useEffect } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoveDiagonal2,
} from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import LoadingIndicator from "../../../loadingIndicator";
import { ErrorMessage } from "../../../errorMessage";

const ImageNodeView = ({
  node,
  updateAttributes,
  editor,
  getPos,
  selected,
}: NodeViewProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startWidthRef = useRef(0);
  const originalAspectRatioRef = useRef(1);
  const [caption, setCaption] = useState(node.attrs.alt || "");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setIsEditable(editor.isEditable);
    if (imageRef.current) {
      // Ensure initial aspect ratio is captured if dimensions are available
      const initialWidth = node.attrs.width || imageRef.current.naturalWidth;
      const initialHeight = node.attrs.height || imageRef.current.naturalHeight;
      if (initialWidth && initialHeight) {
        originalAspectRatioRef.current = initialHeight / initialWidth;
      }
    }
  }, [editor, node.attrs.width, node.attrs.height]);

  useEffect(() => {
    const updateEditableState = () => {
      setIsEditable(editor.isEditable);
    };

    editor.on("update", updateEditableState);

    return () => {
      editor.off("update", updateEditableState);
    };
  }, [editor]);

  const selectImage = () => {
    const pos = getPos();
    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  };

  const updateCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCaption = event.target.value;
    setCaption(newCaption);
    updateAttributes({ alt: newCaption });
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createParagraphAfterImage();
    } else if (event.key === "Escape" || event.key === "ArrowDown") {
      event.preventDefault();
      setCursorAfterImage();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursorBeforeImage();
    }
  };

  const setCursorAt = (pos: number) => {
    editor.commands.focus();
    editor.chain().setTextSelection(pos).scrollIntoView().run();
  };

  const createParagraphAfterImage = () => {
    const pos = getPos();
    if (pos === undefined) return;

    editor.commands.focus();
    editor
      .chain()
      .setTextSelection(pos + 1)
      .createParagraphNear()
      .scrollIntoView()
      .run();
  };

  const setCursorAfterImage = () => {
    const pos = getPos();
    if (pos !== undefined) {
      setCursorAt(pos + 1);
    }
  };

  const setCursorBeforeImage = () => {
    const pos = getPos();
    if (pos !== undefined) {
      setCursorAt(pos - 1);
    }
  };

  const startResize = (event: React.MouseEvent) => {
    if (!isEditable) return;
    selectImage();
    isResizingRef.current = true;
    startDragXRef.current = event.clientX;
    startWidthRef.current =
      imageRef.current?.offsetWidth || node.attrs.width || 0;

    // Calculate aspect ratio from current attributes or natural dimensions
    const width = node.attrs.width || imageRef.current?.naturalWidth;
    const height = node.attrs.height || imageRef.current?.naturalHeight;
    if (width && height) {
      originalAspectRatioRef.current = height / width;
    } else {
      originalAspectRatioRef.current = 1;
    }

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "ew-resize";
  };

  const handleResize = (event: MouseEvent) => {
    if (!isResizingRef.current || !imageRef.current || !containerRef.current)
      return;

    const editorElement = editor.view.dom;
    const editorWidth = editorElement.clientWidth;

    const deltaX = event.clientX - startDragXRef.current;
    let newWidth = startWidthRef.current + deltaX;

    // Add constraints (e.g., minimum width and maximum width based on editor)
    newWidth = Math.max(50, Math.min(newWidth, editorWidth));

    const newHeight = newWidth * originalAspectRatioRef.current;

    // Apply temporary styles for visual feedback
    imageRef.current.style.width = `${newWidth}px`;
    imageRef.current.style.height = `${newHeight}px`;
    containerRef.current.style.width = `${newWidth}px`;
  };

  const stopResize = () => {
    if (!isResizingRef.current) return;

    isResizingRef.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "";

    if (imageRef.current && containerRef.current) {
      const finalWidth = imageRef.current.offsetWidth;
      const finalHeight = imageRef.current.offsetHeight;
      updateAttributes({ width: finalWidth, height: finalHeight });

      // Clear temporary styles after updating attributes
      imageRef.current.style.width = "";
      imageRef.current.style.height = "";
      containerRef.current.style.width = "";
    }
  };

  const setAlignment = (align: "left" | "center" | "right") => {
    editor.commands.setImageAlign(align);
  };

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className={clsx(
          "relative overflow-hidden not-prose my-6 rounded-[2px] block max-w-full",
          {
            "ring-2 ring-outline-gray-3 ring-offset-2": selected,
            "mx-auto": node.attrs.align === "center",
            "ml-auto mr-0": node.attrs.align === "right",
            "mr-auto ml-0": node.attrs.align === "left",
          }
        )}
        style={{ width: node.attrs.width ? `${node.attrs.width}px` : "auto" }}
      >
        <div className="relative">
          {node.attrs.src && (
            <img
              ref={imageRef}
              className="rounded-[2px]"
              src={node.attrs.src}
              alt={node.attrs.alt || ""}
              width={node.attrs.width}
              height={node.attrs.height}
              onClick={(e) => {
                e.stopPropagation();
                selectImage();
              }}
            />
          )}

          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            {/* Alignment Controls */}
            {selected && isEditable && (
              <div className="flex divide-x divide-outline-gray-5 rounded bg-black/65">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("left");
                  }}
                  className={clsx("px-1.5 py-1 hover:text-ink-white", {
                    "text-ink-white": node.attrs.align === "left",
                    "text-ink-gray-4": node.attrs.align !== "left",
                  })}
                >
                  <AlignLeft className="size-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("center");
                  }}
                  className={clsx("px-1.5 py-1 hover:text-ink-white", {
                    "text-ink-white": node.attrs.align === "center",
                    "text-ink-gray-4": node.attrs.align !== "center",
                  })}
                >
                  <AlignCenter className="size-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("right");
                  }}
                  className={clsx("px-1.5 py-1 hover:text-ink-white", {
                    "text-ink-white": node.attrs.align === "right",
                    "text-ink-gray-4": node.attrs.align !== "right",
                  })}
                >
                  <AlignRight className="size-4" />
                </button>
              </div>
            )}

            {/* Resize Handle */}
            {selected && isEditable && (
              <button
                className="cursor-nw-resize bg-black/65 rounded p-1"
                onMouseDown={(e) => {
                  e.preventDefault();
                  startResize(e);
                }}
              >
                <MoveDiagonal2 className="text-white size-4" />
              </button>
            )}
          </div>

          {/* Loading indicator overlay */}
          {node.attrs.loading && (
            <div className="inset-0 absolute flex items-center justify-center z-10">
              <div className="bg-gray-900/80 p-2 inset-0 leading-none rounded-sm flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2">
                  <LoadingIndicator className="text-gray-100 size-4" />
                  <span className="text-gray-100">Uploading...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {(isEditable || node.attrs.alt) && !node.attrs.error && (
          <input
            value={caption}
            className="w-full text-center bg-transparent text-sm text-ink-gray-6 h-7 border-none focus:ring-0 placeholder-ink-gray-4"
            placeholder="Add caption"
            disabled={!isEditable}
            onChange={updateCaption}
            onKeyDown={handleKeydown}
          />
        )}

        {node.attrs.error && (
          <div className="w-full py-1.5">
            <ErrorMessage message={`Upload Failed: ${node.attrs.error}`} />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ImageNodeView;
