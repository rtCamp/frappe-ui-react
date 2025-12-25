/**
 * External dependencies.
 */
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { createRoot } from "react-dom/client";
import { createElement } from "react";

/**
 * Internal dependencies.
 */
import ImageViewerModal from "./imageViewerModal";

interface ImageInfo {
  src: string;
  alt: string | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageViewer: {
      /**
       * Open the image viewer
       */
      openImageViewer: (src: string) => ReturnType;
    };
  }
}

const ImageViewerExtension = Extension.create({
  name: "imageViewer",

  onBeforeCreate() {
    // Only add the style if it doesn't already exist
    if (!document.querySelector("style[data-image-viewer-style]")) {
      const style = document.createElement("style");
      style.textContent = `
          .ProseMirror:not(.ProseMirror-focused) img {
            cursor: pointer;
          }
        `;
      style.setAttribute("data-image-viewer-style", "true");
      document.head.appendChild(style);
    }
  },

  onDestroy() {
    const style = document.querySelector("style[data-image-viewer-style]");
    if (style) {
      document.head.removeChild(style);
    }
  },

  addCommands() {
    return {
      openImageViewer:
        (src: string) =>
        ({ editor }) => {
          const images: ImageInfo[] = [];
          editor.state.doc.descendants((node) => {
            if (node.type.name === "image") {
              images.push({
                src: node.attrs.src,
                alt: node.attrs.alt || null,
              });
            }
            return true;
          });

          const currentIndex = images.findIndex((image) => image.src === src);

          openImageViewerModal(images, currentIndex);

          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;

    return [
      new Plugin({
        key: new PluginKey("imageViewer"),
        props: {
          handleClick(view, pos, event) {
            if (editor.isEditable) {
              return false;
            }

            const { state } = view;
            const clickedNode = state.doc.nodeAt(pos);

            if (clickedNode?.type.name === "image") {
              event.preventDefault();
              const src = clickedNode.attrs.src;
              editor.commands.openImageViewer(src);
              return true;
            }

            if (event.target instanceof HTMLImageElement) {
              let foundImageNode = false;
              state.doc.descendants((node, nodePos) => {
                if (node.type.name === "image" && !foundImageNode) {
                  const domNode = view.nodeDOM(nodePos);
                  if (
                    domNode &&
                    (domNode === event.target || domNode.contains(event.target as Node))
                  ) {
                    event.preventDefault();
                    editor.commands.openImageViewer(node.attrs.src);
                    foundImageNode = true;
                    return false;
                  }
                }
                return true;
              });

              if (foundImageNode) return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});

function openImageViewerModal(images: ImageInfo[], initialIndex: number) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const handleClose = () => {
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 0);
  };

  root.render(
    createElement(ImageViewerModal, {
      show: true,
      images: images,
      initialIndex: initialIndex,
      onClose: handleClose,
    })
  );
}

export default ImageViewerExtension;
