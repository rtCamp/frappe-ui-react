import React, { useState } from 'react';
import CommentForm from './commentForm';
import type { CommentData } from './types';

interface CommentProps {
  comment: CommentData;
  onAddReply: (parentId: number, text: string) => void;
}

function parseMentions(text: string): React.ReactNode[] {
  const mentionRegex = /(@\w+\s\w+)/g;
  const parts = text.split(mentionRegex);

  return parts.map((part, index) =>
    mentionRegex.test(part) ? (
      <strong key={index} className="text-blue-600 font-semibold bg-blue-50 rounded px-0.5">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function Comment({ comment, onAddReply }: CommentProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleReplySubmit = (text: string): void => {
    onAddReply(comment.id, text);
    setIsReplying(false);
  };

  return (
    <div className="comment-container">
      <div className="flex items-start">
        <img
          src={comment.author.avatarUrl}
          alt={comment.author.name}
          className="w-9 h-9 rounded-full mr-3 flex-shrink-0"
        />
        <div className="flex-1">
          <div className="text-sm mb-1">
            <strong className="font-semibold mr-1">{comment.author.name}</strong>
            <span className="text-gray-500 text-xs">· {comment.timestamp}</span>
          </div>
          <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {parseMentions(comment.text)}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <button
              className="bg-transparent border-none px-2 py-1 text-gray-600 text-xs font-semibold rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </button>
            <button className="bg-transparent border-none px-2 py-1 text-gray-600 text-xs font-semibold rounded cursor-pointer hover:bg-gray-100">
              Edit
            </button>
            <button className="bg-transparent border-none p-1 text-gray-600 cursor-pointer ml-auto">
              ...
            </button>
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="ml-[48px] mt-3">
          <CommentForm buttonText="Reply" onSubmit={handleReplySubmit} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 pl-6 relative border-l-2 border-gray-200 mt-3 space-y-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;