import React, { useState } from 'react';
interface CommentFormProps {
  onSubmit: (text: string) => void;
  buttonText: string;
}

function CommentForm({ onSubmit, buttonText }: CommentFormProps) {
  const [text, setText] = useState<string>('');
  const isButtonDisabled = text.length === 0;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isButtonDisabled){
        return;
    }
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        className="w-full min-h-[60px] p-2.5 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        placeholder="Add a comment..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
      />
      <button
        type="submit"
        className="self-end mt-2.5 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold cursor-pointer transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default CommentForm;