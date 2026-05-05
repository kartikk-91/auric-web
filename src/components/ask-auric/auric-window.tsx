"use client";

import ChatWindow from "@/components/ask-auric/chat-window";
import Header from "@/components/ask-auric/header";
import Sidebar from "@/components/ask-auric/sidebar";
import { useState } from "react";


export default function AskAuricWindow() {
  const [activeChatId, setActiveChatId] = useState("1");
  const [chatWindowKey, setChatWindowKey] = useState(0);

  const handleNewChat = () => {
    setActiveChatId("");
    setChatWindowKey((k) => k + 1);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setChatWindowKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      <Header onNewChat={handleNewChat} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
        />
        <main className="flex-1 flex overflow-hidden">
          <ChatWindow key={chatWindowKey} chatId={activeChatId} />
        </main>
      </div>
    </div>
  );
}