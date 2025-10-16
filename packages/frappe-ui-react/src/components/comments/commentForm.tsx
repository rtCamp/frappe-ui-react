/**
 * External dependencies.
 */
import * as React from "react";
import { useState } from "react";
import { Send } from "lucide-react";
/**
 * Internal dependencies.
 */
import type { CommentFormProps } from "./types";
import { mergeClassNames } from "../../utils";
import { Spinner } from "../spinner";
import { Textarea } from "../textarea";
import { Button } from "../button";

const CommentForm = React.forwardRef<HTMLFormElement, CommentFormProps>(
  ({ onSubmit, isSubmitting = false, placeholder = "Write a comment...", className, ...props }, ref) => {
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim() && !isSubmitting) {
        onSubmit(content.trim());
        setContent("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !isSubmitting) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    return (
      <form ref={ref} onSubmit={handleSubmit} className={mergeClassNames("space-y-3", className)} {...props}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          extraClasses="min-h-20 resize-none"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Ctrl</kbd> +{" "}
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Enter</kbd> to submit
          </div>
          <Button type="submit" disabled={!content.trim() || isSubmitting} size="sm">
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

export default CommentForm;