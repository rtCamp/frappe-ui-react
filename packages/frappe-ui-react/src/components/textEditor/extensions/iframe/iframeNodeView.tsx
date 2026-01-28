/**
 * External dependencies.
 */
import { useState, useRef, useEffect, CSSProperties } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import {
  MoveDiagonal2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { calculateAspectRatio } from "./utils";

export function IframeNodeView(props: NodeViewProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isResizingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startWidthRef = useRef(0);
  const originalAspectRatioRef = useRef(9 / 16); // Default 16:9
  const [isEditable, setIsEditable] = useState(false);

  const selectIframe = () => {
    const pos = props.getPos();
    if (typeof pos === "number") {
      props.editor.commands.setNodeSelection(pos);
    }
  };

  const iframeStyles = (): CSSProperties => {
    const width = props.node.attrs.width || 640;
    const height =
      props.node.attrs.height || width * originalAspectRatioRef.current;

    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  useEffect(() => {
    const { editor, node, updateAttributes } = props;
    setIsEditable(editor.isEditable);

    // Calculate aspect ratio from node attributes or URL
    if (node.attrs.aspectRatio) {
      originalAspectRatioRef.current = node.attrs.aspectRatio;
    } else if (node.attrs.src) {
      const aspectInfo = calculateAspectRatio(node.attrs.src);
      originalAspectRatioRef.current = aspectInfo.ratio;

      // Update node with calculated aspect ratio
      updateAttributes({ aspectRatio: aspectInfo.ratio });
    }

    const handleUpdate = () => {
      setIsEditable(editor.isEditable);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startResize = (event: React.MouseEvent) => {
    if (!isEditable) return;
    selectIframe();
    isResizingRef.current = true;
    startDragXRef.current = event.clientX;
    startWidthRef.current =
      containerRef.current?.offsetWidth || props.node.attrs.width || 640;

    // Use stored aspect ratio or calculate from current dimensions
    if (props.node.attrs.aspectRatio) {
      originalAspectRatioRef.current = props.node.attrs.aspectRatio;
    } else {
      const width = props.node.attrs.width || startWidthRef.current;
      const height =
        props.node.attrs.height || width * originalAspectRatioRef.current;
      if (width && height) {
        originalAspectRatioRef.current = height / width;
      }
    }

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
    document.body.style.cursor = "ew-resize";
  };

  const handleResize = (event: MouseEvent) => {
    if (!isResizingRef.current || !iframeRef.current || !containerRef.current)
      return;

    const editorElement = props.editor.view.dom;
    const editorWidth = editorElement.clientWidth;

    const deltaX = event.clientX - startDragXRef.current;
    let newWidth = startWidthRef.current + deltaX;

    // Add constraints (minimum width, maximum editor width with padding)
    const MIN_WIDTH = 200;
    const PADDING = 40;
    newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, editorWidth - PADDING));

    const newHeight = newWidth * originalAspectRatioRef.current;

    // Apply temporary styles for visual feedback
    iframeRef.current.style.width = `${newWidth}px`;
    iframeRef.current.style.height = `${newHeight}px`;
    containerRef.current.style.width = `${newWidth}px`;
  };

  const stopResize = () => {
    if (!isResizingRef.current) return;

    isResizingRef.current = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "";

    if (iframeRef.current && containerRef.current) {
      // Capture final dimensions while temporary styles are still applied
      const finalWidth = iframeRef.current.offsetWidth;
      const finalHeight = iframeRef.current.offsetHeight;

      // Update attributes
      props.updateAttributes({
        width: finalWidth,
        height: finalHeight,
        aspectRatio: originalAspectRatioRef.current,
      });

      // Clear temporary styles immediately (like image extension)
      iframeRef.current.style.width = "";
      iframeRef.current.style.height = "";
      containerRef.current.style.width = "";
    }
  };

  const setAlignment = (align: "left" | "center" | "right") => {
    props.updateAttributes({ align });
  };

  // Handle keyboard navigation
  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createParagraphAfterIframe();
    } else if (event.key === "Escape" || event.key === "ArrowDown") {
      event.preventDefault();
      setCursorAfterIframe();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursorBeforeIframe();
    }
  };

  const setCursorAt = (pos: number) => {
    props.editor.commands.focus();
    props.editor.chain().setTextSelection(pos).scrollIntoView().run();
  };

  const createParagraphAfterIframe = () => {
    const pos = props.getPos();
    if (typeof pos !== "number") return;
    props.editor.commands.focus();
    props.editor
      .chain()
      .setTextSelection(pos + 1)
      .createParagraphNear()
      .scrollIntoView()
      .run();
  };

  const setCursorAfterIframe = () => {
    const pos = props.getPos();
    if (typeof pos === "number") {
      setCursorAt(pos + 1);
    }
  };

  const setCursorBeforeIframe = () => {
    const pos = props.getPos();
    if (typeof pos === "number") {
      setCursorAt(pos - 1);
    }
  };

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className={clsx(
          "relative overflow-hidden not-prose my-6 rounded-lg block max-w-full focus:outline-none",
          {
            "ring-2 ring-outline-gray-3 ring-offset-2": props.selected,
            "mx-auto": props.node.attrs.align === "center",
            "ml-auto mr-0": props.node.attrs.align === "right",
            "mr-auto ml-0": props.node.attrs.align === "left",
          }
        )}
        style={{
          width: props.node.attrs.width
            ? `${props.node.attrs.width}px`
            : "auto",
          maxWidth: "100%",
        }}
        onKeyDown={handleKeydown}
        tabIndex={0}
      >
        <div className="relative">
          {props.node.attrs.src ? (
            <iframe
              ref={iframeRef}
              className={clsx("rounded-lg border-0 block max-w-full h-auto", {
                "pointer-events-none":
                  isEditable && !props.node.attrs.interactive,
              })}
              src={props.node.attrs.src}
              style={iframeStyles()}
              title={props.node.attrs.title || ""}
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onClick={(e) => {
                e.stopPropagation();
                selectIframe();
              }}
            />
          ) : null}

          {/* Transparent overlay for selection in edit mode */}
          {isEditable && !props.node.attrs.interactive && (
            <div
              className="absolute inset-0 cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                selectIframe();
              }}
            ></div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2 z-20">
            {/* Alignment Controls */}
            {props.selected && isEditable && (
              <div className="flex divide-x divide-ink-gray-6 rounded-md bg-black/65">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("left");
                  }}
                  className={clsx(
                    "px-1.5 py-1 text-ink-gray-4 hover:text-white transition-colors duration-150",
                    { "text-white": props.node.attrs.align === "left" }
                  )}
                  title="Align Left"
                >
                  <AlignLeft className="size-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("center");
                  }}
                  className={clsx(
                    "px-1.5 py-1 text-ink-gray-4 hover:text-white transition-colors duration-150",
                    { "text-white": props.node.attrs.align === "center" }
                  )}
                  title="Align Center"
                >
                  <AlignCenter className="size-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAlignment("right");
                  }}
                  className={clsx(
                    "px-1.5 py-1 text-ink-gray-4 hover:text-white transition-colors duration-150",
                    { "text-white": props.node.attrs.align === "right" }
                  )}
                  title="Align Right"
                >
                  <AlignRight className="size-4" />
                </button>
              </div>
            )}

            {/* Resize Handle */}
            {props.selected && isEditable && (
              <button
                className="cursor-nw-resize bg-black/65 rounded-md p-1"
                onMouseDown={(e) => {
                  e.preventDefault();
                  startResize(e);
                }}
                title="Resize"
              >
                <MoveDiagonal2 className="text-white size-4" />
              </button>
            )}
          </div>

          {/* Loading state for new embeds */}
          {!props.node.attrs.src && (
            <div className="flex items-center justify-center bg-surface-gray-1 rounded-lg w-[640px] h-[360px]">
              <div className="text-ink-gray-5 text-center">
                <div className="text-lg mb-1">🔗</div>
                <div className="text-sm">Loading embed...</div>
              </div>
            </div>
          )}
        </div>

        {/* Caption/Title input */}
        {(isEditable || props.node.attrs.title) && props.node.attrs.src && (
          <input
            value={props.node.attrs.title || ""}
            className="w-full text-center bg-transparent text-sm text-ink-gray-6 h-7 border-0 mt-2 focus:outline-none focus:ring-0 placeholder-ink-gray-4 disabled:opacity-60"
            placeholder="Add caption"
            disabled={!isEditable}
            onChange={(e) => props.updateAttributes({ title: e.target.value })}
            onKeyDown={handleKeydown}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
}
