"use client";

import { useState } from "react";
import { CHAT_SESSIONS, ChatSession } from "@/lib/data";
import { SquarePen, Search, Trash2 } from "lucide-react";

interface SidebarProps {
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const GROUPS: ChatSession["group"][] = ["Today", "Yesterday", "May 3"];

export default function Sidebar({ activeChatId, onSelectChat, onNewChat }: SidebarProps) {
  const [search, setSearch] = useState("");

  const filtered = CHAT_SESSIONS.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
<div className="p-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">Chat History</h2>
        <button
          onClick={onNewChat}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="New chat"
        >
          <SquarePen className="w-4 h-4" />
        </button>
      </div>
<div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-400 transition"
          />
        </div>
      </div>
<div className="flex-1 overflow-y-auto px-2 pb-4">
        {GROUPS.map((group) => {
          const sessions = filtered.filter((s) => s.group === group);
          if (!sessions.length) return null;
          return (
            <div key={group} className="mb-2">
              <p className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group}
              </p>
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectChat(session.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-0.5 transition-colors group relative ${
                    activeChatId === session.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm font-medium line-clamp-1 pr-4">
                    {session.title}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5 block">
                    {session.time}
                  </span>
                  {activeChatId === session.id && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>
<div className="p-3 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 className="w-4 h-4" />
          Clear history
        </button>
      </div>
    </aside>
  );
}