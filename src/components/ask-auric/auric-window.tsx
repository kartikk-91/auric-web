"use client";

import { useEffect, useState } from "react";

import ChatWindow from "@/components/ask-auric/chat-window";
import Header from "@/components/ask-auric/header";
import Sidebar from "@/components/ask-auric/sidebar";

import { useAskAuric } from "@/hooks/use-ask-auric";

export default function AskAuricWindow() {
  const {
    chats,
    messages,

    activeChatId,
    setActiveChatId,

    sendingMessage,

    createChat,
    sendMessage,

    deleteChat,
    clearHistory,
  } = useAskAuric();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [sidebarOpen]);

  const handleNewChat =
    async () => {
      await createChat();
    };

  const handleSelectChat =
    (chatId: string) => {
      setActiveChatId(
        chatId
      );

      setSidebarOpen(
        false
      );
    };

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-white font-sans">
      <Header
        onOpenSidebar={() =>
          setSidebarOpen(
            true
          )
        }
      />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">

        <div className="hidden xl:flex h-full shrink-0">
          <Sidebar
            chats={chats}
            activeChatId={
              activeChatId
            }
            onSelectChat={
              handleSelectChat
            }
            onNewChat={
              handleNewChat
            }
            onDeleteChat={
              deleteChat
            }
            onClearHistory={
              clearHistory
            }
          />
        </div>


        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 xl:hidden"
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
          />
        )}


        <div
          className={`fixed right-0 top-0 z-50 h-dvh w-[85vw] max-w-[340px] transform bg-white transition-transform duration-300 ease-in-out xl:hidden ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <Sidebar
            chats={chats}
            activeChatId={
              activeChatId
            }
            onSelectChat={
              handleSelectChat
            }
            onNewChat={
              handleNewChat
            }
            onDeleteChat={
              deleteChat
            }
            onClearHistory={
              clearHistory
            }
          />
        </div>


        <main className="flex min-w-0 flex-1 overflow-hidden">
          <ChatWindow
            chatId={
              activeChatId
            }
            messages={
              messages
            }
            isTyping={
              sendingMessage
            }
            onSend={
              sendMessage
            }
          />
        </main>
      </div>
    </div>
  );
}