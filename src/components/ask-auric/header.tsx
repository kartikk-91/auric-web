"use client";

import { MessageSquare } from "lucide-react";

interface HeaderProps {
  onNewChat: () => void;
}

export default function Header({ onNewChat }: HeaderProps) {


  return (
    <header className="w-full px-8 pt-4 pb-4 bg-white space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Ask Auric
            </h1>
            <span className="text-[10px] h-fit font-semibold tracking-widest text-gray-400 uppercase border border-gray-200 px-1.5 py-0.5 rounded">
              Beta
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">
            Get AI-powered insights about your feedback.
          </p>
        </div>
<div className="flex items-center gap-2">
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-5 h-5" />
            New Chat
          </button>
        </div>
      </div>
    </header>
  );
}