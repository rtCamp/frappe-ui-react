/**
 * External dependencies.
 */
import React, { useEffect, useCallback, useMemo } from "react";
import { useState } from "react";
import { MoreHorizontal, Save, X, Forward } from "lucide-react";
/**
 * Internal dependencies.
 */
import { mergeClassNames } from "../../utils";
import { formatDate } from "../../utils";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import TextEditor from "../textEditor";
import type { CommentItemProps } from "./types";
import Typography from "../typography";
import { User } from "./commentInput";

interface CommentItemExtendedProps extends CommentItemProps {
  onFetchUsers?: (query: string) => Promise<User[]> | User[];
  enableMentions?: boolean;
  activeCommentName?: string;
}

const CommentItem = React.forwardRef<HTMLDivElement, CommentItemExtendedProps>(
  (
    {
      comment,
      onDelete,
      onUpdate,
      onShare,
      isEditing = false,
      onEditModeChange,
      className,
      activeCommentName,
      ...props
    },
    ref
  ) => {
    const [editContent, setEditContent] = useState(comment.content);
    const [isLocalEditing, setIsLocalEditing] = useState(isEditing);

    const handleEdit = useCallback(() => {
      setIsLocalEditing(true);
      onEditModeChange?.(comment.name, true);
    }, [comment.name, onEditModeChange]);

    const handleCancelEdit = useCallback(() => {
      setEditContent(comment.content);
      setIsLocalEditing(false);
      onEditModeChange?.(comment.name, false);
    }, [comment.content, comment.name, onEditModeChange]);

    const handleSaveEdit = useCallback(() => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = editContent;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";

      if (plainText.trim() && editContent !== comment.content) {
        onUpdate?.(comment.name, editContent.trim());
      }
      setIsLocalEditing(false);
      onEditModeChange?.(comment.name, false);
    }, [
      comment.content,
      comment.name,
      editContent,
      onEditModeChange,
      onUpdate,
    ]);

    const handleDelete = useCallback(() => {
      onDelete?.(comment.name);
    }, [comment.name, onDelete]);

    const showActions =
      (comment.canEdit || comment.canDelete) && (onUpdate || onDelete);

    useEffect(() => {
      if (activeCommentName === comment.name) {
        const element = document.getElementById(comment?.name);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, [activeCommentName, comment.name]);

    const handleShareComment = useCallback(() => {
      onShare?.(comment.name);
    }, [onShare, comment.name]);

    const actions = useMemo(() => {
      const _actions = [];
      if (comment.canEdit && onUpdate) {
        _actions.push({
          label: "Edit",
          onClick: handleEdit,
        });
      }

      if (comment.canDelete && onDelete) {
        _actions.push({
          label: "Delete",
          onClick: handleDelete,
        });
      }
      return _actions;
    }, [
      comment.canDelete,
      comment.canEdit,
      handleDelete,
      handleEdit,
      onDelete,
      onUpdate,
    ]);

    return (
      <div
        id={comment.name}
        ref={ref}
        className={mergeClassNames(
          "flex gap-3 p-4 bg-background border rounded-lg shadow-sm hover:shadow-md transition-all duration-200",
          className,
          activeCommentName === comment.name && "blinking-border"
        )}
        {...props}
      >
        <Avatar
          image={comment.userImageUrl}
          alt={comment.userName}
          shape="circle"
          label={comment.userName[0]?.toUpperCase()}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col truncate max-md:max-w-[8rem]">
              <div className="flex items-center gap-2 flex-wrap">
                <Typography
                  title={comment.userName}
                  variant="small"
                  className="font-medium truncate"
                >
                  {comment.userName}
                </Typography>
                <Typography
                  title={formatDate(comment.createdAt)}
                  variant="small"
                  className="text-muted-foreground "
                >
                  {formatDate(comment.createdAt)}
                </Typography>
                {comment.updatedAt &&
                  comment.updatedAt !== comment.createdAt && (
                    <Typography
                      variant="small"
                      className="text-muted-foreground italic"
                    >
                      (edited)
                    </Typography>
                  )}
              </div>
              <Typography
                title={comment.owner}
                variant="small"
                className="font-medium text-muted-foreground"
              >
                {comment.owner}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleShareComment}
                variant="ghost"
                size="sm"
                className="h-auto p-1"
              >
                <Forward className="scale-x-[-1]" />
                <span className="sr-only">Share</span>
              </Button>
              {showActions && !isLocalEditing && (
                <Dropdown options={actions}>
                  <Button variant="ghost" size="sm" className="h-auto p-1">
                    <MoreHorizontal className="" />
                    <span className="sr-only">Comment actions</span>
                  </Button>
                </Dropdown>
              )}
            </div>
          </div>

          <div className="mt-2">
            {isLocalEditing ? (
              <div className="space-y-2">
                <div className="border rounded-lg overflow-hidden focus-within:border-foreground/50 focus-within:ring-1 focus-within:ring-foreground/50">
                  <TextEditor
                    value={editContent}
                    onChange={setEditContent}
                    placeholder="Edit your comment..."
                    hideToolbar={true}
                    className="border-0 focus:ring-0 focus:border-0 [&_.ql-editor]:min-h-[80px] [&_.ql-editor]:p-3 [&_.ql-container]:border-0"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={
                      !editContent.trim() || editContent === comment.content
                    }
                  >
                    <Save className="mr-1 h-3 w-3" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="leading-relaxed prose prose-sm max-w-none [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default CommentItem;
