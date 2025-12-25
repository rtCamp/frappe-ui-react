import { TextEditorInstance } from "./types";

interface InsertVideoProps {
  editor: TextEditorInstance;
  children: (props: { onClick?: () => void }) => React.ReactNode;
}

const InsertVideo = ({ editor, children }: InsertVideoProps) => {
  const selectAndUploadVideo = () => {
    editor.chain().focus().selectAndUploadVideo().run();
  };

  return <>{children({ onClick: selectAndUploadVideo })}</>;
};

export default InsertVideo;
