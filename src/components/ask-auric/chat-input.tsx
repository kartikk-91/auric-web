"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white px-4 pt-3 pb-2">
      <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition">
<button className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0 mb-0.5">
          <Paperclip className="w-4 h-4" />
        </button>
<textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask anything about your feedback..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none min-h-[24px] max-h-[120px]"
          disabled={disabled}
        />
<button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
            value.trim() && !disabled
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        Auric can make mistakes. Please verify important information.
      </p>
    </div>
  );
}