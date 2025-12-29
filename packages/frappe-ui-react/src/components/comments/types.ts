export interface User {
  name: string;
  avatarUrl: string;
}

export interface CommentData {
  id: number;
  author: User;
  timestamp: string;
  text: string;
  replies: CommentData[];
}