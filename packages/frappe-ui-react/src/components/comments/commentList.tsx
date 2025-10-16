/**
 * External dependencies.
 */
import * as React from "react";
import { useState } from "react";
/**
 * Internal dependencies.
 */
import { mergeClassNames } from "../../utils";
import { Spinner } from "../spinner";
import Typography from "../typography";
import CommentItem from "./commentItem";
import type { CommentsListProps } from "./types";
import { User } from "./commentInput";

interface CommentsListExtendedProps extends CommentsListProps {
  onFetchUsers?: (query: string) => Promise<User[]> | User[];
  enableMentions?: boolean;
  activeCommentName?: string;
}

const CommentsList = React.forwardRef<HTMLDivElement, CommentsListExtendedProps>(
  (
    {
      comments,
      onDelete,
      onUpdate,
      onShare,
      isLoading = false,
      emptyMessage = "No comments yet",
      className,
      onFetchUsers,
      enableMentions = false,
      mentionClassName,
      activeCommentName,
      ...props
    },
    ref
  ) => {
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

    const handleEditModeChange = (commentId: string, isEditing: boolean) => {
      setEditingCommentId(isEditing ? commentId : null);
    };

    if (isLoading) {
      return (
        <div ref={ref} className={mergeClassNames("flex items-center justify-center p-8", className)} {...props}>
          <Spinner />
        </div>
      );
    }

    if (!comments.length) {
      return (
        <div ref={ref} className={mergeClassNames("flex items-center justify-center p-8", className)} {...props}>
          <Typography variant="p" className="text-muted-foreground">
            {emptyMessage}
          </Typography>
        </div>
      );
    }

    return (
      <div ref={ref} className={mergeClassNames("space-y-4 h-full", className)} {...props}>
        <div className="overflow-y-auto h-full space-y-4">
          {comments.map((comment) => (
            <CommentItem
              activeCommentName={activeCommentName}
              key={comment.name}
              comment={comment}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onShare={onShare}
              isEditing={editingCommentId === comment.name}
              onEditModeChange={handleEditModeChange}
              onFetchUsers={onFetchUsers}
              enableMentions={enableMentions}
              mentionClassName={mentionClassName}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default CommentsList;