"use client";

import { useMemo, useState } from "react";
import { Loader2, Search, SquarePen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Chat } from "@/hooks/use-ask-auric";


interface SidebarProps {
  chats: Chat[];
  activeChatId: string;
  loadingChats: boolean;
  deletingChatId?: string | null;
  clearingHistory?: boolean;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => Promise<void>;
  onClearHistory: () => Promise<void>;
}

function groupChatsByDate(chats: Chat[]) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const grouped: Record<string, Chat[]> = {};

  for (const chat of chats) {
    const date = new Date(chat.updatedAt);
    let label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (date.toDateString() === today.toDateString()) label = "Today";
    else if (date.toDateString() === yesterday.toDateString()) label = "Yesterday";

    (grouped[label] ??= []).push(chat);
  }

  return grouped;
}

function SkeletonRow({ width }: { width: string }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl px-3 py-3">
      <div className={`h-3.5 rounded-md bg-gray-100 animate-pulse`} style={{ width }} />
      <div className="h-2.5 w-16 rounded bg-gray-100 animate-pulse" />
    </div>
  );
}

export default function Sidebar({
  chats,
  activeChatId,
  loadingChats,
  deletingChatId,
  clearingHistory,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClearHistory,
}: SidebarProps) {
  const [search, setSearch] = useState("");
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const filtered = useMemo(
    () =>
      chats.filter((c) =>
        (c.title ?? "").toLowerCase().includes(search.toLowerCase()),
      ),
    [chats, search],
  );

  const grouped = groupChatsByDate(filtered);

  const handleConfirmDelete = async () => {
    if (!chatToDelete) return;
    const id = chatToDelete;
    await onDeleteChat(id);
    setChatToDelete(null);
  };

  const handleConfirmClear = async () => {
    await onClearHistory();
    setClearDialogOpen(false);
  };

  return (
    <>
      <aside className="flex h-full w-full flex-col border-r border-gray-100 bg-white xl:w-72">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-700">Chat History</h2>
          <button
            onClick={onNewChat}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 active:scale-95"
            title="New chat"
          >
            <SquarePen className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* List */}
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
          {loadingChats ? (
            <div>
              <div className="px-2 py-2 mb-2">
                <div className="h-2.5 w-12 rounded bg-gray-100 animate-pulse" />
              </div>
              <SkeletonRow width="80%" />
              <SkeletonRow width="65%" />
              <SkeletonRow width="72%" />
              <div className="px-2 py-2 my-2">
                <div className="h-2.5 w-16 rounded bg-gray-100 animate-pulse" />
              </div>
              <SkeletonRow width="55%" />
              <SkeletonRow width="70%" />
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="flex h-full items-center justify-center px-4 text-center">
              <p className="text-sm text-gray-400">
                {search ? "No chats match your search." : "No chats yet. Start a new conversation!"}
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([group, groupChats]) => (
              <div key={group} className="mb-5 animate-in fade-in duration-200">
                <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  {group}
                </p>
                <div className="space-y-0.5">
                  {groupChats.map((chat) => {
                    const isDeleting = deletingChatId === chat.chatId;
                    return (
                      <div
                        key={chat.chatId}
                        className={`group relative rounded-xl transition-colors ${
                          activeChatId === chat.chatId
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        } ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        <button
                          onClick={() => onSelectChat(chat.chatId)}
                          disabled={isDeleting}
                          className="w-full px-3 py-2.5 text-left"
                        >
                          <p
                            className={`truncate text-sm pr-6 ${
                              activeChatId === chat.chatId
                                ? "font-semibold text-blue-700"
                                : "font-medium text-gray-700"
                            }`}
                          >
                            {chat.title ?? "New Chat"}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-400">
                            {new Date(chat.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </button>

                        {isDeleting ? (
                          <Loader2 className="absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-gray-400" />
                        ) : (
                          <button
                            onClick={() => setChatToDelete(chat.chatId)}
                            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500 group-hover:block transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {!loadingChats && chats.length > 0 && (
          <div className="border-t border-gray-100 p-3">
            <button
              onClick={() => setClearDialogOpen(true)}
              disabled={clearingHistory}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-red-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
            >
              {clearingHistory ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Clear history
            </button>
          </div>
        )}
      </aside>

      {/* Delete single chat dialog */}
      <AlertDialog open={!!chatToDelete} onOpenChange={(open) => !open && setChatToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This conversation will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setChatToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear all dialog */}
      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all history?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove all Ask Auric conversations. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setClearDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmClear}>Clear all</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}