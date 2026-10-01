"use client";

import { useEffect, useMemo, useRef } from "react";
import ChatBubble from "./chat-bubble";
import SuggestedQuestions from "./suggested-questions";
import ChatInput from "./chat-input";
import { AlertCircle } from "lucide-react";

import Image from "next/image";
import { Message } from "@/hooks/use-ask-auric";

interface ChatWindowProps {
  chatId: string;
  messages: Message[];
  isTyping: boolean;
  isStreaming: boolean;
  loadingMessages: boolean;
  error?: string | null;
  onSend: (message: string) => Promise<void>;
  onStop?: () => void;
}

function MessageSkeleton({ align }: { align: "left" | "right" }) {
  if (align === "right") {
    return (
      <div className="mb-4 flex justify-end">
        <div className="h-10 w-48 rounded-[20px] rounded-br-md bg-gray-200 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-2 flex-1 max-w-sm">
        <div className="h-4 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-4 w-4/5 rounded-lg bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/5 rounded-lg bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

export default function ChatWindow({
  chatId,
  messages,
  isTyping,
  isStreaming,
  loadingMessages,
  error,
  onSend,
  onStop,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasUserMessages = useMemo(
    () => messages.some((m) => m.role === "user"),
    [messages],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/40">
      {error && (
        <div className="shrink-0 flex items-center gap-2 border-b border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-5 sm:px-5">
        <div className="mx-auto w-full max-w-3xl">
          {loadingMessages ? (
            <>
              <MessageSkeleton align="right" />
              <MessageSkeleton align="left" />
              <MessageSkeleton align="right" />
              <MessageSkeleton align="left" />
            </>
          ) : (
            <>
              
              {messages.length === 0 && (
                <div className="mb-6 flex items-start gap-3 animate-in fade-in duration-300">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                    <Image src="/emblem-transparent.png" alt="Auric" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="rounded-[20px] rounded-tl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800">
                      {chatId ? "Welcome back 👋" : "Welcome to Ask Auric 👋"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Ask anything about your customer feedback — sentiment, trends, or pain points.
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatBubble
                  key={message.messageId}
                  message={{
                    messageId: message.messageId,
                    role: message.role,
                    content: message.content,
                    sources: message.sources,
                    citations: message.citations,
                    usage: message.usage,
                    createdAt: message.createdAt,
                    isStreaming: message.isStreaming,
                    statusLabel: message.statusLabel,
                  }}
                />
              ))}
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      
      {!loadingMessages && !hasUserMessages && (
        <div className="shrink-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="mx-auto w-full max-w-3xl">
            <SuggestedQuestions onSelect={onSend} />
          </div>
        </div>
      )}

      
      <div className="shrink-0 bg-white">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput
            onSend={onSend}
            onStop={onStop}
            disabled={isTyping && !isStreaming}
            isStreaming={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
