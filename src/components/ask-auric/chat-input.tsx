"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { SendHorizontal, Square } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
}

export default function ChatInput({
  onSend,
  onStop,
  disabled,
  isStreaming,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || (disabled && !isStreaming)) return;
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

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-slate-200 bg-white px-3 sm:px-5 pt-3 pb-[max(14px,env(safe-area-inset-bottom))]">
      <div
        className={`
          flex items-end gap-2 rounded-xl border bg-slate-50 px-3 py-2 transition-shadow duration-150
          ${canSend || isStreaming
            ? "border-blue-400 ring-2 ring-blue-500/15 shadow-sm"
            : "border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/15"
          }
        `}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onInput={autoResize}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything about your feedback…"
          disabled={disabled && !isStreaming}
          className="
            min-h-[26px] max-h-[140px] flex-1 resize-none bg-transparent
            text-sm text-gray-800 placeholder:text-gray-400
            focus:outline-none leading-relaxed overflow-y-auto
            disabled:cursor-not-allowed disabled:opacity-60
          "
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-500 transition hover:bg-red-200 active:scale-95"
            title="Stop generating"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-150 ${
              canSend
                ? "bg-blue-600 text-white shadow-[0_8px_16px_-10px_rgba(37,99,235,0.75)] hover:bg-blue-700 active:scale-95"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            title="Send (Enter)"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-[11px] text-gray-400">
        Auric can make mistakes. Verify important information.
      </p>
    </div>
  );
}
