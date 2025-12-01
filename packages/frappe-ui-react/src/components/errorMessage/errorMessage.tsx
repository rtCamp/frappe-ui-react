import React, { useMemo } from "react";

import type { ErrorMessageProps, MessageError } from "./types";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const errorMessage = useMemo(() => {
    if (!message) {
      return "";
    }

    if (message instanceof Error) {
      return (message as MessageError).messages || message.message;
    }

    return message;
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div
      className="whitespace-pre-line text-sm text-ink-red-4"
      role="alert"
      dangerouslySetInnerHTML={{ __html: errorMessage }}
    />
  );
};

export default ErrorMessage;
