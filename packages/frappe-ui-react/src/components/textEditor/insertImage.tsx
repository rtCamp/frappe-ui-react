/**
 * External dependencies.
 */
import { useRef, useState } from "react";

/**
 * Internal dependencies.
 */
import { ImageGroupUploadDialog } from "./extensions/image-group";
import { TextEditorInstance } from "./types";

interface InsertImageProps {
  editor: TextEditorInstance;
  children: (props: { onClick?: () => void }) => React.ReactNode;
}

const InsertImage = ({ editor, children }: InsertImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length === 1) {
        editor.chain().focus().uploadImage(files[0]).run();
      } else {
        setSelectedFiles(Array.from(files));
        setShowModal(true);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };

  return (
    <>
      {children({ onClick: openFileSelector })}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onImageSelect}
        accept="image/*"
        multiple
      />
      {showModal && (
        <ImageGroupUploadDialog
          show={showModal}
          onShowChange={setShowModal}
          mode="new"
          files={selectedFiles}
          editor={editor}
          onClose={handleCancel}
        />
      )}
    </>
  );
};

export default InsertImage;
