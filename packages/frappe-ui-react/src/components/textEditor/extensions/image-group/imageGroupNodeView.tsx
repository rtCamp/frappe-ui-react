/**
 * External dependencies.
 */
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { type NodeViewProps } from "@tiptap/react";
import { X, Edit } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Internal dependencies.
 */
import { Button } from "../../../button";
import { Select } from "../../../select";
import ImageViewerModal from "../image-viewer/imageViewerModal";
import { ImageGroupUploadDialog } from "./imageGroupUploadDialog";

interface ImageNode {
  attrs: {
    src: string;
    alt?: string;
  };
}

interface ExistingImage {
  src: string;
  alt: string;
}

export function ImageGroupNodeView(props: NodeViewProps) {
  const columns = props.node.attrs.columns || 4;
  const images = (props.node.content?.content as unknown as ImageNode[]) || [];

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  const [isEditable, setIsEditable] = useState(props.editor.isEditable);
  const [showViewer, setShowViewer] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFiles, setEditFiles] = useState<File[]>([]);

  const selectOptions = [
    { label: "2 columns", value: "2" },
    { label: "3 columns", value: "3" },
    { label: "4 columns", value: "4" },
  ];

  const internalColumns = String(columns);

  const viewerImages = images.map((img) => ({
    src: img.attrs.src,
    alt: img.attrs.alt || "",
  }));

  const existingImages: ExistingImage[] = images.map((img) => ({
    src: img.attrs.src,
    alt: img.attrs.alt || "",
  }));

  useEffect(() => {
    const updateEditable = () => {
      setIsEditable(props.editor.isEditable);
    };
    props.editor.on("update", updateEditable);
    return () => {
      props.editor.off("update", updateEditable);
    };
  }, [props.editor]);

  function edit() {
    setEditFiles([]);
    setShowEditModal(true);
  }

  function handleEditModalClose() {
    setShowEditModal(false);
    setEditFiles([]);
  }

  async function handleEditSave(data: {
    images: ExistingImage[];
    columns: number;
  }) {
    // Update the node with the final images and columns from the modal
    props.editor.commands.command(({ tr, state }) => {
      const pos = props.getPos();
      if (typeof pos === "number") {
        const node = state.doc.nodeAt(pos);
        if (node && node.type.name === "imageGroup") {
          const newContent = data.images.map((img) =>
            state.schema.nodes.image.create({ src: img.src, alt: img.alt })
          );

          const newAttrs = { ...node.attrs, columns: data.columns };
          const newNode = node.type.create(newAttrs, newContent);
          tr.replaceWith(pos, pos + node.nodeSize, newNode);
          return true;
        }
      }
      return false;
    });

    setShowEditModal(false);
  }

  function openViewer(idx: number) {
    if (props.editor.isEditable) return;
    setViewerIndex(idx);
    setShowViewer(true);
  }

  function removeImage(idx: number) {
    // Remove the image at the specified index and update the node
    const newImages = images.slice();
    newImages.splice(idx, 1);
    if (newImages.length === 0) {
      // Remove the whole node if no images left
      props.editor.commands.deleteNode("imageGroup");
    } else {
      // Update the node content with remaining images
      props.updateAttributes({});
      props.editor.commands.command(({ tr, state }) => {
        const pos = props.getPos();
        if (typeof pos === "number") {
          const node = state.doc.nodeAt(pos);
          if (node && node.type.name === "imageGroup") {
            const newContent = newImages.map((img) =>
              state.schema.nodes.image.create(img.attrs)
            );
            tr.replaceWith(pos + 1, pos + 1 + node.content.size, newContent);
            return true;
          }
        }
        return false;
      });
    }
  }

  function handleColumnsChange(e: React.ChangeEvent<HTMLSelectElement>) {
    props.updateAttributes({ columns: +e.target.value });
  }

  return (
    <NodeViewWrapper>
      <div className="w-full">
        {isEditable && (
          <div className="flex items-center mb-2 gap-2">
            <Button onClick={edit}>
              <Edit className="size-4" />
              Edit
            </Button>
            <Select
              options={selectOptions}
              value={internalColumns}
              onChange={handleColumnsChange}
              size="sm"
              variant="subtle"
            />
          </div>
        )}
        <div className="grid gap-px" style={gridStyle}>
          {images.map((img, idx) => (
            <div
              key={img.attrs.src + idx}
              className="relative aspect-square w-full h-full overflow-hidden bg-surface-white group"
            >
              {isEditable && (
                <button
                  type="button"
                  className="absolute top-1 right-1 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Remove image"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              )}
              {!isEditable ? (
                <img
                  src={img.attrs.src}
                  alt={img.attrs.alt || ""}
                  className="object-cover w-full h-full not-prose cursor-pointer rounded-[2px]"
                  onClick={() => openViewer(idx)}
                />
              ) : (
                <img
                  src={img.attrs.src}
                  alt={img.attrs.alt || ""}
                  className="object-cover w-full h-full not-prose rounded-[2px]"
                />
              )}

              {/* Caption overlay (visible when there's alt text) */}
              {img.attrs.alt && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-[2px] opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2">
                    <div
                      className="text-white text-xs truncate"
                      title={img.attrs.alt}
                    >
                      {img.attrs.alt}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {showViewer && (
          <ImageViewerModal
            show={showViewer}
            onClose={() => setShowViewer(false)}
            images={viewerImages}
            initialIndex={viewerIndex}
          />
        )}
        {showEditModal && (
          <ImageGroupUploadDialog
            show={showEditModal}
            onShowChange={setShowEditModal}
            files={editFiles}
            editor={props.editor}
            mode="edit"
            existingImages={existingImages}
            initialColumns={columns}
            onClose={handleEditModalClose}
            onSave={handleEditSave}
          />
        )}
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
}
