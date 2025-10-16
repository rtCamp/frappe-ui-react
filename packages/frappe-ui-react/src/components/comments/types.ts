export interface Comment {
  name: string;
  userImageUrl: string;
  userName: string;
  content: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  canEdit?: boolean;
  canDelete?: boolean;
  owner?: string;
}

export interface CommentItemProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
  onUpdate?: (commentId: string, newContent: string) => void;
  onShare?: (commentId: string) => void;
  isEditing?: boolean;
  onEditModeChange?: (commentId: string, isEditing: boolean) => void;
  className?: string;
  mentionClassName?: string;
}

export interface CommentsListProps {
  comments: Comment[];
  onDelete?: (commentId: string) => void;
  onUpdate?: (commentId: string, newContent: string) => void;
  onShare?: (commentId: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  maxHeight?: string;
  mentionClassName?: string;
}

export interface CommentFormProps {
  onSubmit: (content: string) => void | Promise<void>;
  isSubmitting?: boolean;
  placeholder?: string;
  className?: string;
}