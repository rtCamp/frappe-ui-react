/**
 * External dependencies.
 */
import * as React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
/**
 * Internal dependencies.
 */
import { mergeClassNames } from "../../utils";
import { Button } from "../button";
import { Spinner } from "../spinner";
import TextEditor from "../textEditor";
import type { CommentFormProps } from "./types";

export interface User {
  id: string;
  value: string;
}

interface CommentFormSimpleProps extends CommentFormProps {
  onFetchUsers?: (query: string) => Promise<User[]> | User[];
  enableMentions?: boolean;
  mentionClassName?: string;
}

const CommentFormSimple = React.forwardRef<HTMLFormElement, CommentFormSimpleProps>(
  (
    {
      onSubmit,
      isSubmitting = false,
      placeholder = "Write a comment...",
      className,
      ...props
    },
    ref
  ) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim() && !isSubmitting) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";

        if (plainText.trim()) {
          try {
            await onSubmit(content.trim());
            setContent("");
          } catch (error) {
            console.error("Error submitting comment:", error);
          }
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !isSubmitting) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const hasContent = () => {
      if (!content) return false;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      return plainText.trim().length > 0;
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={mergeClassNames("space-y-3", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div className="border rounded-lg overflow-hidden focus-within:border-foreground/50 focus-within:ring-1 focus-within:ring-foreground/50">
          <TextEditor
            value={content}
            onChange={setContent}
            placeholder={placeholder}
            hideToolbar={true}
            className="border-0 focus:ring-0 focus:border-0 [&_.ql-editor]:min-h-20 [&_.ql-editor]:p-3 [&_.ql-container]:border-0"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm max-md:text-xs text-muted-foreground">
            Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Ctrl</kbd> +{" "}
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Enter</kbd> to submit
          </div>
          <Button type="submit" disabled={!hasContent() || isSubmitting} size="sm">
            {isSubmitting ? (
              <>
                <Spinner className="mr-1 h-3 w-3" />
                Comment
              </>
            ) : (
              <>
                <Send className="mr-1 h-3 w-3" />
                Comment
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }
);

export default CommentFormSimple;