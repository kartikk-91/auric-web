"use client";

import { useEffect, useRef, useState } from "react";
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

// Minimum horizontal drag distance before we treat it as a deliberate swipe.
const OPEN_THRESHOLD_PX = 30;
const CLOSE_THRESHOLD_PX = 50;

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

  // --- Always land on "new chat" on load, never auto-resume the last chat ---
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    if (activeChatId) {
      setActiveChatId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Dynamic viewport height, resilient to mobile browser chrome ---
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${vh}px`);
    };

    setAppHeight();

    window.visualViewport?.addEventListener("resize", setAppHeight);
    window.addEventListener("resize", setAppHeight);
    window.addEventListener("orientationchange", setAppHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", setAppHeight);
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  // --- Swipe-to-open handle ---
  // We deliberately don't watch the bare screen edge for a swipe: on iOS/
  // Android that's the same zone the browser/OS reserves for its own
  // "swipe back" gesture, so touches starting there are frequently stolen
  // before our JS ever sees them (this is why the earlier edge-swipe
  // implementation silently did nothing). Instead we give people a small,
  // always-visible pull-tab a few pixels in from the true edge. It's tap-
  // able on its own (guaranteed way to open) and also drag-to-open, and
  // because it's a real element (not raw viewport edge) it doesn't fight
  // with the native gesture.
  //
  // Native (non-passive) listeners are used here instead of React's
  // onTouch* props: React registers touch handlers as passive by default,
  // which silently no-ops preventDefault() and lets the browser treat the
  // drag as a scroll/navigation gesture instead of handing it to us.
  const openTabRef = useRef<HTMLButtonElement>(null);
  const openDragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = openTabRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      openDragStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!openDragStart.current) return;
      const t = e.touches[0];
      const dx = t.clientX - openDragStart.current.x;
      const dy = t.clientY - openDragStart.current.y;

      if (Math.abs(dy) > Math.abs(dx)) return; // mostly vertical, ignore

      if (dx < 0) {
        // Stop the browser from also interpreting this as a back gesture.
        e.preventDefault();
      }

      if (dx < -OPEN_THRESHOLD_PX) {
        setSidebarOpen(true);
        openDragStart.current = null;
      }
    };

    const onTouchEnd = () => {
      openDragStart.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // --- Swipe-to-close for the open drawer ---
  // Safe to bind to the raw drawer panel because it's already-open app UI,
  // not the system edge, so there's no native gesture to fight with.
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeDragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = drawerRef.current;
    if (!el || !sidebarOpen) return;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      closeDragStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!closeDragStart.current) return;
      const t = e.touches[0];
      const dx = t.clientX - closeDragStart.current.x;
      const dy = t.clientY - closeDragStart.current.y;

      if (Math.abs(dy) > Math.abs(dx)) return;

      if (dx > 0) {
        e.preventDefault();
      }

      if (dx > CLOSE_THRESHOLD_PX) {
        setSidebarOpen(false);
        closeDragStart.current = null;
      }
    };

    const onTouchEnd = () => {
      closeDragStart.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
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
      <div
        className="flex items-center justify-center bg-white px-6 text-center"
        style={{ height: "var(--app-height, 100dvh)" }}
      >
        <div>
          <p className="text-sm font-medium text-gray-700">Couldn&apos;t load your account</p>
          <p className="mt-1 text-sm text-gray-400">Please refresh the page, or sign in again.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-0 flex-col overflow-hidden bg-white font-sans"
      style={{ height: "var(--app-height, 100dvh)" }}
    >
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

        {/* Pull tab: tap or drag left to open the drawer on mobile/tablet */}
        {!sidebarOpen && (
          <button
            ref={openTabRef}
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open chat history"
            className="fixed right-0 top-1/2 z-40 -translate-y-1/2 flex h-16 w-6 items-center justify-center rounded-l-xl border border-r-0 border-gray-200 bg-white/95 shadow-md transition-colors active:bg-gray-50 xl:hidden"
          >
            <span className="h-8 w-1 rounded-full bg-gray-300" />
          </button>
        )}

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 xl:hidden backdrop-blur-[1px] animate-in fade-in duration-200"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          ref={drawerRef}
          className={`fixed right-0 top-0 z-50 w-[85vw] max-w-[320px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ height: "var(--app-height, 100dvh)" }}
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