"use client";

import { useEffect, useState } from "react";
import ChatWindow from "./chat-window";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAskAuric } from "@/hooks/use-ask-auric";


interface AskAuricWindowProps {
  /**
   * Pass the company_id from your session/auth context.
   * e.g. <AskAuricWindow companyId={session.user.companyId} />
   */
  companyId: string | undefined | null;
}

export default function AskAuricWindow({ companyId }: AskAuricWindowProps) {
  const {
    chats,
    messages,
    activeChatId,
    setActiveChatId,
    loadingChats,
    loadingMessages,
    sendingMessage,
    deletingChatId,
    clearingHistory,
    error,
    createChat,
    sendMessage,
    stopStreaming,
    deleteChat,
    clearHistory,
  } = useAskAuric({ companyId });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isStreaming = messages.some((m) => m.role === "assistant" && m.isStreaming);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleNewChat = () => {
    createChat();
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
  };

  if (!companyId) {
    return (
      <div className="flex h-dvh items-center justify-center bg-white px-6 text-center">
        <div>
          <p className="text-sm font-medium text-gray-700">Couldn&apos;t load your account</p>
          <p className="mt-1 text-sm text-gray-400">Please refresh the page, or sign in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-white font-sans">
      <Header onOpenSidebar={() => setSidebarOpen(true)} />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        
        <div className="hidden xl:flex h-full shrink-0">
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            loadingChats={loadingChats}
            deletingChatId={deletingChatId}
            clearingHistory={clearingHistory}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={deleteChat}
            onClearHistory={clearHistory}
          />
        </div>

        
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 xl:hidden backdrop-blur-[1px] animate-in fade-in duration-200"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        
        <div
          className={`fixed right-0 top-0 z-50 h-dvh w-[85vw] max-w-[320px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            loadingChats={loadingChats}
            deletingChatId={deletingChatId}
            clearingHistory={clearingHistory}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={deleteChat}
            onClearHistory={clearHistory}
          />
        </div>

        
        <main className="flex min-w-0 flex-1 overflow-hidden">
          <ChatWindow
            chatId={activeChatId}
            messages={messages}
            isTyping={sendingMessage}
            isStreaming={isStreaming}
            loadingMessages={loadingMessages}
            error={error}
            onSend={sendMessage}
            onStop={stopStreaming}
          />
        </main>
      </div>
    </div>
  );
}