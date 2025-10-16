/**
 * External dependencies.
 */
import * as React from "react";
/**
 * Internal dependencies.
 */
import { mergeClassNames } from "../../utils";
import Typography from "../typography";
import CommentInput,{ type User } from "./commentInput";
import CommentsList from "./commentList";
import type { Comment } from "./types";

export interface CommentsProps {
  comments: Comment[];
  onDelete?: (commentId: string) => void;
  onUpdate?: (commentId: string, newContent: string) => void;
  onSubmit?: (content: string) => void;
  onShare?: (commentId: string) => void;
  isLoading?: boolean;
  isSubmitting?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  className?: string;
  maxHeight?: string;
  showForm?: boolean;
  title?: string;
  onFetchUsers?: (query: string) => Promise<User[]> | User[];
  enableMentions?: boolean;
  mentionClassName?: string;
  activeCommentName?: string;
}

const Comments = React.forwardRef<HTMLDivElement, CommentsProps>(
  (
    {
      comments,
      onDelete,
      onUpdate,
      onSubmit,
      onShare,
      isLoading = false,
      isSubmitting = false,
      emptyMessage = "No comments yet",
      placeholder = "Write a comment...",
      className,
      showForm = true,
      title = "Comments",
      onFetchUsers,
      enableMentions = false,
      mentionClassName,
      activeCommentName,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={mergeClassNames("space-y-4 h-full", className)} {...props}>
        <div className="flex items-center justify-between">
          <Typography variant="h4" className="font-semibold">
            {title}
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </Typography>
        </div>

        {showForm && onSubmit && (
          <>
            <CommentInput
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              placeholder={placeholder}
              onFetchUsers={onFetchUsers}
              enableMentions={enableMentions}
              mentionClassName={mentionClassName}
            />
            <div className="shrink-0 bg-border h-[1px] w-full" />
          </>
        )}

        <CommentsList
          activeCommentName={activeCommentName}
          comments={comments}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onShare={onShare}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          onFetchUsers={onFetchUsers}
          enableMentions={enableMentions}
          mentionClassName={mentionClassName}
        />
      </div>
    );
  }
);

export default Comments;