"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import ChatBubble from "./chat-bubble";
import SuggestedQuestions from "./suggested-questions";
import ChatInput from "./chat-input";

type Message = {
  messageId: string;
  chatId: string;
  role: string;
  content: string;
  metadata?: unknown;
  createdAt: Date;
};

interface ChatWindowProps {
  chatId: string;

  messages: Message[];

  isTyping: boolean;

  onSend: (
    message: string
  ) => Promise<void>;
}

export default function ChatWindow({
  chatId,
  messages,
  isTyping,
  onSend,
}: ChatWindowProps) {
  const bottomRef =
    useRef<HTMLDivElement>(
      null
    );

  const hasUserMessages =
    useMemo(() => {
      return messages.some(
        (m) =>
          m.role ===
          "user"
      );
    }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [
    messages,
  ]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gray-50/50">

      {!chatId ? (
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-gray-900">
              Ask Auric
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start a new
              conversation to
              analyze customer
              feedback, discover
              insights, and
              understand trends.
            </p>

            <button
              onClick={() =>
                onSend(
                  "What are the major customer pain points?"
                )
              }
              className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Try example
              question
            </button>
          </div>
        </div>
      ) : (
        <>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 pt-5 sm:px-5">
            <div className="mx-auto w-full max-w-4xl">

              {messages.length ===
                0 && (
                <div className="mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
                      <span className="text-sm font-semibold text-blue-600">
                        A
                      </span>
                    </div>

                    <div className="rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm font-medium text-gray-800">
                        Welcome to
                        Ask Auric 👋
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Ask anything
                        about your
                        customer
                        feedback,
                        sentiment,
                        trends or
                        insights.
                      </p>
                    </div>
                  </div>
                </div>
              )}


              {messages.map(
                (
                  message
                ) => (
                  <ChatBubble
                    key={
                      message.messageId
                    }
                    message={{
                      id:
                        message.messageId,
                      role:
                        message.role as
                          | "user"
                          | "assistant",
                      content:
                        message.content,
                      timestamp:
                        new Date(
                          message.createdAt
                        ).toLocaleTimeString(
                          [],
                          {
                            hour:
                              "2-digit",
                            minute:
                              "2-digit",
                          }
                        ),
                    }}
                  />
                )
              )}

              <div
                ref={
                  bottomRef
                }
              />
            </div>
          </div>


          {!hasUserMessages && (
            <div className="shrink-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
              <div className="mx-auto w-full max-w-4xl">
                <SuggestedQuestions
                  onSelect={
                    onSend
                  }
                />
              </div>
            </div>
          )}


          <div className="shrink-0 bg-white">
            <div className="mx-auto w-full max-w-4xl">
              <ChatInput
                onSend={
                  onSend
                }
                disabled={
                  isTyping
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}