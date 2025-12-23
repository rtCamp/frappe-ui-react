import React, { useCallback, useState } from "react";
import CommentForm from "./commentForm";
import type { CommentData } from "./types";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { MessageSquareText, ReplyIcon } from "lucide-react";

interface CommentProps {
  comment: CommentData;
  onAddReply: (parentId: number, text: string) => void;
  handleEditComment: (id: number, text: string) => void;
}

function parseMentions(text: string): React.ReactNode[] {
  const mentionRegex = /(@\w+\s\w+)/g;
  const parts = text.split(mentionRegex);

  return parts.map((part, index) =>
    mentionRegex.test(part) ? (
      <strong
        key={index}
        className="text-blue-600 font-semibold bg-blue-50 rounded px-0.5"
      >
        {part}
      </strong>
    ) : (
      <>
      <span dangerouslySetInnerHTML={{__html: part}}/>
      </>
    )
  );
}

function Comment({ comment, onAddReply, handleEditComment }: CommentProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleReplySubmit = useCallback((text: string): void => {
    if (isReplying) {
      onAddReply(comment.id, text);      
      setIsReplying(false);
    }else{
      handleEditComment(comment.id, text);
      setIsEditing(false);
    }
  }, [comment.id, handleEditComment, isReplying, onAddReply]);

  return (
    <div className="comment-container">
      <div className="border p-2 rounded-lg border-gray-200 flex flex-col mb-4 w-full">
        <div className="flex items-center justify-between m-1">
          <span className="flex items-center">
            <Avatar
              image={comment.author.avatarUrl}
              label={comment.author.name}
            />
            <span className="text-base ml-2 text-ink-gray-5">{comment.author.name} commented</span>
            <span className="text-ink-gray-5 text-xs">&nbsp;· {comment.timestamp}</span>
          </span>
          <span className="flex flex-shrink-0">
            <div className="mt-2 flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} disabled={isReplying}>
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={isEditing}
                iconLeft={() => <ReplyIcon className="w-3 h-3" />}
                onClick={() => setIsReplying(!isReplying)}
              >
                Reply
              </Button>
              <button className="bg-transparent border-none p-1 text-gray-600 cursor-pointer ml-auto">
                ...
              </button>
            </div>
          </span>
        </div>
        <hr className="mt-1 mb-3.5 ml-9.5 border-t border-outline-gray-modals"/>
        <div className="flex items-start">
          <div className="flex-1">
            <div className="text-[15px] pl-10.5 text-gray-900 leading-relaxed whitespace-pre-wrap">
              {parseMentions(comment.text)}
            </div>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="ml-[48px] mt-3">
          <CommentForm buttonText="Reply" onSubmit={handleReplySubmit} />
        </div>
      )}

      {isEditing && (
        <div className="ml-[48px] mt-3">
          <CommentForm buttonText="Edit" onSubmit={handleReplySubmit} value={comment.text} />
        </div>
      )}

      {comment.replies &&
        comment.replies.length > 0 &&
        comment.replies.map((reply, index) => (
          <div className="activity grid grid-cols-[30px_minmax(auto,_1fr)] gap-2">
            <div
              className={`z-0 relative flex justify-center before:absolute before:left-[50%] before:-z-[1] before:top-0 before:border-l before:border-outline-gray-modals ${
                index != comment.replies.length ? "before:h-full" : "before:h-4"
              }`}
            >
              <div className="flex h-8 w-7 items-center justify-center bg-gray-100 rounded-full">
                <MessageSquareText className="text-ink-gray-5 w-4 h-4" />
              </div>
            </div>

            <Comment key={reply.id} comment={reply} onAddReply={onAddReply} handleEditComment={handleEditComment} />
          </div>
        ))}
    </div>
  );
}

export default Comment;
