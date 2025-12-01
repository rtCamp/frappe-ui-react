export interface MessageError extends Error {
  messages?: string;
}

export interface ErrorMessageProps {
  message?: string | MessageError | null;
}
