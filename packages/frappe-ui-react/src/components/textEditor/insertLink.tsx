import { TextEditorInstance } from "./types";

interface InsertLinkProps {
  editor: TextEditorInstance;
  children: (props: { onClick?: () => void }) => React.ReactNode;
}

const InsertLink = ({ editor, children }: InsertLinkProps) => {
  const openLinkEditor = () => {
    editor.commands.openLinkEditor();
  };

  return <>{children({ onClick: openLinkEditor })}</>;
};

export default InsertLink;
