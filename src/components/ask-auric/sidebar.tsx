"use client";

import { useMemo, useState } from "react";

import {
  Search,
  SquarePen,
  Trash2,
} from "lucide-react";

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

type Chat = {
  chatId: string;
  c_id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    messages: number;
  };
};

interface SidebarProps {
  chats?: Chat[];
  activeChatId: string;

  onSelectChat: (
    id: string
  ) => void;

  onNewChat: () => void;

  onDeleteChat: (
    chatId: string
  ) => Promise<void>;

  onClearHistory: () => Promise<void>;
}

function groupChatsByDate(
  chats: Chat[] = []
) {
  const today =
    new Date();

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() -
    1
  );

  const grouped: Record<
    string,
    Chat[]
  > = {};

  chats.forEach(
    (chat) => {
      const date =
        new Date(
          chat.updatedAt
        );

      let label =
        date.toLocaleDateString(
          "en-US",
          {
            month:
              "short",
            day: "numeric",
          }
        );

      if (
        date.toDateString() ===
        today.toDateString()
      ) {
        label =
          "Today";
      } else if (
        date.toDateString() ===
        yesterday.toDateString()
      ) {
        label =
          "Yesterday";
      }

      if (
        !grouped[
        label
        ]
      ) {
        grouped[
          label
        ] = [];
      }

      grouped[
        label
      ].push(chat);
    }
  );

  return grouped;
}

export default function Sidebar({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClearHistory,
}: SidebarProps) {
  const [search, setSearch] =
    useState("");

  const [
    chatToDelete,
    setChatToDelete,
  ] = useState<string | null>(
    null
  );

  const [
    clearDialogOpen,
    setClearDialogOpen,
  ] = useState(false);

  const filteredChats = useMemo(() => {
    if (!Array.isArray(chats)) {
      return [];
    }

    return chats.filter((chat) =>
      chat.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, chats]);

  const groupedChats =
    groupChatsByDate(
      filteredChats
    );

  return (
    <>
      <aside className="flex h-full w-full flex-col border-r border-gray-100 bg-white xl:w-72">

        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="text-sm font-semibold text-gray-700">
            Chat History
          </h2>

          <button
            onClick={
              onNewChat
            }
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <SquarePen className="h-4 w-4" />
          </button>
        </div>


        <div className="border-b border-gray-100 px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              value={search}
              onChange={(
                e
              ) =>
                setSearch(
                  e.target
                    .value
                )
              }
              placeholder="Search chats..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>


        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3">
          {Object.entries(
            groupedChats
          ).length ===
            0 ? (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-gray-400">
              No chats yet
            </div>
          ) : (
            Object.entries(
              groupedChats
            ).map(
              ([
                group,
                groupChats,
              ]) => (
                <div
                  key={group}
                  className="mb-5"
                >
                  <p className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {group}
                  </p>

                  <div className="space-y-1">
                    {groupChats.map(
                      (
                        chat
                      ) => (
                        <div
                          key={
                            chat.chatId
                          }
                          className={`group relative rounded-xl ${activeChatId ===
                            chat.chatId
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                            }`}
                        >
                          <button
                            onClick={() =>
                              onSelectChat(
                                chat.chatId
                              )
                            }
                            className="w-full px-3 py-3 text-left"
                          >
                            <p className="truncate text-sm font-medium">
                              {chat.title ||
                                "Untitled Chat"}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {chat
                                ._count
                                ?.messages ??
                                0}{" "}
                              messages
                            </p>
                          </button>

                          <button
                            onClick={() =>
                              setChatToDelete(
                                chat.chatId
                              )
                            }
                            className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 group-hover:block"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>


        {chats.length >
          0 && (
            <div className="border-t border-gray-100 p-3">
              <button
                onClick={() =>
                  setClearDialogOpen(
                    true
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-red-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
                Clear history
              </button>
            </div>
          )}
      </aside>


      <AlertDialog
        open={
          !!chatToDelete
        }
        onOpenChange={() =>
          setChatToDelete(
            null
          )
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete chat?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This conversation
              will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={() =>
                chatToDelete &&
                onDeleteChat(
                  chatToDelete
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog
        open={
          clearDialogOpen
        }
        onOpenChange={
          setClearDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Clear chat
              history?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This will remove all
              Ask Auric
              conversations
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                onClearHistory
              }
            >
              Clear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}