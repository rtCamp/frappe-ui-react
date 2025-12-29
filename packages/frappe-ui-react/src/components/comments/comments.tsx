import { useCallback, useState } from "react";
import { MessageCircle } from "lucide-react";

import Comment from "./comment";
import CommentForm from "./commentForm";
import type { CommentData } from "./types";

const CURRENT_USER = {
  name: "Current User",
  avatarUrl: "https://i.pravatar.cc/40?img=4",
};

function addReplyToTree(
  nodes: CommentData[],
  parentId: number,
  newReply: CommentData
): CommentData[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        replies: [...node.replies, newReply],
      };
    }

    if (node.replies && node.replies.length > 0) {
      return {
        ...node,
        replies: addReplyToTree(node.replies, parentId, newReply),
      };
    }
    return node;
  });
}
type CommentsProp = {
  initialComments: CommentData[];
  onCommentAdded?: (comment: CommentData) => void;
  onCommentEdited?: (comment: CommentData) => void;
  onCommentReplied?: (comment: CommentData, parentId: number) => void;
};

function Comments({
  initialComments = [],
  onCommentAdded,
  onCommentEdited,
  onCommentReplied,
}: CommentsProp) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const handleAddComment = useCallback(
    (text: string): void => {
      const newComment: CommentData = {
        id: Date.now(),
        author: CURRENT_USER,
        timestamp: "Just now",
        text: text,
        replies: [],
      };
      setComments([...comments, newComment]);
            if (onCommentAdded) {
        onCommentAdded(newComment);
      }
    },
    [comments, onCommentAdded]
  );

  const handleEditComment = useCallback(
    (id: number, text: string): void => {
      setComments((currentComments) => {
        return currentComments.map((comment) => {
          if (comment.id === id) {
            if (onCommentEdited) {
              onCommentEdited({ ...comment, text });
            }
            return { ...comment, text };
          }
          return comment;
        });
      });
    },
    [onCommentEdited]
  );

  const handleAddReply = useCallback(
    (parentId: number, text: string): void => {
      const newReply: CommentData = {
        id: Date.now(),
        author: CURRENT_USER,
        timestamp: "Just now",
        text: text,
        replies: [],
      };

      if (onCommentReplied) {
        onCommentReplied(newReply, parentId);
      }

      setComments((currentComments) =>
        addReplyToTree(currentComments, parentId, newReply)
      );
    },
    [onCommentReplied]
  );

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <h1 className="text-xl font-semibold mb-4">Comments</h1>

      {comments.length === 0 && (
        <CommentForm buttonText="Comment" onSubmit={handleAddComment} />
      )}

      <div className="space-y-4 relative">
        {comments.map((comment, index) => (
          <div className="activity grid grid-cols-[30px_minmax(auto,_1fr)] gap-2 mb-4">
            <div
              className={`z-0 relative flex justify-center before:absolute before:left-[50%] before:-z-[1] before:top-0 before:border-l before:border-outline-gray-modals ${
                index != comments.length ? "before:h-full" : "before:h-4"
              }`}
            >
              <div className="flex h-8 w-7 items-center justify-center bg-gray-100 rounded-full">
                <MessageCircle className="text-ink-gray-5 w-4 h-4" />
              </div>
            </div>
            <Comment
              handleEditComment={handleEditComment}
              key={comment.id}
              comment={comment}
              onAddReply={handleAddReply}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
