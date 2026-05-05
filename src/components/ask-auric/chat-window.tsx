"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage, INITIAL_MESSAGES, BOT_RESPONSES, CHAT_SESSIONS } from "@/lib/data";
import ChatBubble from "./chat-bubble";
import TypingIndicator from "./typing-indicator";
import SuggestedQuestions from "./suggested-questions";
import ChatInput from "./chat-input";


interface ChatWindowProps {
  chatId: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentChat = CHAT_SESSIONS.find((s) => s.id === chatId);

  useEffect(() => {
    setMessages(INITIAL_MESSAGES);
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const responseKey = lowerText.includes("pain") || lowerText.includes("problem") ? "pain" : "default";
      const template = BOT_RESPONSES[responseKey];

      const botMsg: ChatMessage = {
        ...template,
        id: `a-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 1400);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-50/50">
{currentChat && (
        <div className="px-5 py-2.5 border-b border-gray-100 bg-white">
          <p className="text-sm font-medium text-gray-700">{currentChat.title}</p>
        </div>
      )}
<div className="flex-1 overflow-y-auto px-5 pt-5 pb-2">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
{messages.filter((m) => m.role === "user").length === 0 && (
        <SuggestedQuestions onSelect={handleSend} />
      )}
<ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
}