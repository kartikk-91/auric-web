"use client";

import {
  useState,
  KeyboardEvent,
  useRef,
} from "react";

import {
  Paperclip,
  SendHorizontal,
} from "lucide-react";

interface ChatInputProps {
  onSend: (
    message: string
  ) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
}: ChatInputProps) {
  const [value, setValue] =
    useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(
      null
    );

  const handleSend = () => {
    const trimmed =
      value.trim();

    if (
      !trimmed ||
      disabled
    )
      return;

    onSend(trimmed);

    setValue("");

    if (
      textareaRef.current
    ) {
      textareaRef.current.style.height =
        "auto";
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {


    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = () => {
    const el =
      textareaRef.current;

    if (!el) return;

    el.style.height =
      "auto";

    el.style.height = `${Math.min(
      el.scrollHeight,
      120
    )}px`;
  };

  return (
    <div className="border-t border-gray-100 bg-white px-3 sm:px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div
        className="
          flex items-end gap-2
          rounded-2xl border border-gray-200
          bg-gray-50
          px-3 py-2
          transition
          focus-within:border-blue-400
          focus-within:ring-2
          focus-within:ring-blue-500/20
        "
      >

        <button
          type="button"
          className="mb-0.5 shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <Paperclip className="h-4 w-4" />
        </button>


        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(
              e.target.value
            );
          }}
          onInput={autoResize}
          onKeyDown={
            handleKeyDown
          }
          rows={1}
          placeholder="Ask anything about your feedback..."
          disabled={disabled}
          className="
            min-h-[24px]
            max-h-[120px]
            flex-1 resize-none
            bg-transparent
            text-sm text-gray-700
            placeholder:text-gray-400
            focus:outline-none
            leading-relaxed
            overflow-y-auto
          "
        />


        <button
          type="button"
          onClick={
            handleSend
          }
          disabled={
            !value.trim() ||
            disabled
          }
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
            value.trim() &&
            !disabled
              ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[0.97]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2 text-center text-[11px] sm:text-xs text-gray-400">
        Auric can make mistakes. Please verify important information.
      </p>
    </div>
  );
}