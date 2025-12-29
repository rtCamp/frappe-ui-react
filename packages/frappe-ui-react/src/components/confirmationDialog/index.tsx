/**
 * External dependencies.
 */
import { LoaderCircle, Trash2, X } from "lucide-react";
/**
 * External dependencies.
 */
import { Button } from "../button";
import { Dialog } from "../dialog";
/**
 * The resource delete allocation alert dialog.
 *
 * Why not use react-alert-dialog?
 * The above package was creating issues for form dynamic field selection, also it has bugs in recent versions: https://github.com/shadmergeClassNames-ui/ui/issues/1655 so for now I have used dialog only.
 *
 * @param props.onDelete The function to be called when delete dialog is clicked.
 * @param props.isOpen The state to open the dialog.
 * @param props.isLoading The state to show the loader.
 * @param props.onOpen The function to open the dialog.
 * @param props.onCancel The function to cancel the dialog.
 * @returns React.FC
 */
export const ConfirmationDialog = ({
  onDelete,
  isOpen,
  isLoading,
  onCancel,
  title,
  description,
}: {
  onDelete: () => void;
  isOpen: boolean;
  isLoading: boolean;
  onOpen: () => void;
  onCancel: () => void;
  buttonClassName?: string;
  title: string;
  description: string;
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: boolean) => !open && onCancel()}
      options={{
        title,
        message: description,
      }}
      actions={
        <div className="flex w-full gap-3 justify-end flex-row sm:flex-row sm:space-x-2">
          <Button iconLeft={() => isLoading ? (
              <LoaderCircle className="animate-spin w-4 h-4 outline-none" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )} variant="solid" onClick={onDelete}>
            Delete
          </Button>
          <Button
            iconLeft={() => <X className="w-4 h-4" />}
            type="button"
            variant="subtle"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      }
    >
    </Dialog>
  );
};
