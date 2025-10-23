import React, { useCallback, useState } from 'react';
import TextEditor from '../textEditor';
interface CommentFormProps {
  onSubmit: (text: string) => void;
  buttonText: string;
  value?: string;
}

function CommentForm({ onSubmit, buttonText, value }: CommentFormProps) {
  const [text, setText] = useState<string>(value || '');
  const isButtonDisabled = text.length === 0;

  const handleSubmit = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    if (isButtonDisabled){
        return;
    }
    onSubmit(text);
    setText('');
  }, [isButtonDisabled, onSubmit, text]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <TextEditor
        className="w-full min-h-[60px] rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        placeholder="Add a comment..."
        value={text}
        onChange={(value) =>{
          console.log(value.slice(3, -4))
          setText(value.slice(3, -4))
        }
        }
      />
      <button
        type="submit"
        className="self-end my-2.5 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default CommentForm;