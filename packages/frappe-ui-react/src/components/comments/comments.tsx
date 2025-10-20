import { useState } from 'react';
import Comment from './comment';
import CommentForm from './commentForm';
import type { CommentData } from './types';

const CURRENT_USER = {
  name: 'Current User',
  avatarUrl: 'https://i.pravatar.cc/40?img=4',
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
}


function Comments({ initialComments = [] }: CommentsProp) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);

  const handleAddComment = (text: string): void => {
    const newComment: CommentData = {
      id: Date.now(),
      author: CURRENT_USER,
      timestamp: 'Just now',
      text: text,
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (parentId: number, text: string): void => {
    const newReply: CommentData = {
      id: Date.now(),
      author: CURRENT_USER,
      timestamp: 'Just now',
      text: text,
      replies: [],
    };

    setComments((currentComments) =>
      addReplyToTree(currentComments, parentId, newReply)
    );
  };

  return (

    <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-6 my-10">
      <h1 className="text-xl font-semibold mb-4">Comments</h1>

      <CommentForm buttonText="Comment" onSubmit={handleAddComment} />
      
      <hr className="border-t border-gray-100 my-6" />

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;