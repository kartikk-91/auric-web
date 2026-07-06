"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Chat = {
  chatId: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Source = {
  retriever: string;
  plan?: string;
  rows?: Record<string, unknown>[];
  error?: string;
};

export type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated?: boolean;
};

export type Message = {
  messageId: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[] | null;
  usage?: Usage | null;
  createdAt: string;
  isStreaming?: boolean;
  
  statusLabel?: string | null;
};
const API_BASE =
  process.env.NEXT_PUBLIC_AURIC_API_ENDPOINT ?? "http://127.0.0.1:8000";

const RETRIEVER_LABELS: Record<string, string> = {
  knowledge: "Searching knowledge base…",
  feedback: "Searching customer feedback…",
  sql: "Querying data…",
  internet: "Searching the web…",
};

async function streamChat(opts: {
  query: string;
  company_id: string;
  chat_id: string | null;
  signal: AbortSignal;
  onChatId: (id: string) => void;
  onStatus: (label: string) => void;
  onToken: (token: string) => void;
  onSources: (sources: Source[]) => void;
  onUsage: (usage: Usage) => void;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/auricbot/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        query: opts.query,
        company_id: opts.company_id,
        chat_id: opts.chat_id,
      }),
      signal: opts.signal,
    });
  } catch (err) {
    if ((err as Error)?.name === "AbortError") throw err;
    opts.onError("Could not reach the server. Check your connection and try again.");
    return;
  }

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "Unknown error");
    opts.onError(`Server error ${res.status}: ${text}`);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      if (!frame.trim()) continue;

      let eventType = "message";
      let dataStr = "";

      for (const line of frame.split("\n")) {
        if (line.startsWith("event:")) eventType = line.slice(6).trim();
        else if (line.startsWith("data:")) dataStr = line.slice(5).trim();
      }

      if (!dataStr) continue;

      let payload: Record<string, unknown>;
      try {
        payload = JSON.parse(dataStr);
      } catch {
        continue;
      }

      switch (eventType) {
        case "routing":
          if (payload.chat_id) opts.onChatId(payload.chat_id as string);
          opts.onStatus("Thinking…");
          break;
        case "retrieving": {
          const retriever = String(payload.retriever ?? "");
          opts.onStatus(RETRIEVER_LABELS[retriever] ?? `Searching ${retriever}…`);
          break;
        }
        case "retrieved":
          break;
        case "generating":
          opts.onStatus((payload.message as string) ?? "Generating answer…");
          break;
        case "answer":
          if (payload.token) opts.onToken(payload.token as string);
          break;
        case "usage":
          opts.onUsage(payload as unknown as Usage);
          break;
        case "sources":
          if (Array.isArray(payload.sources)) opts.onSources(payload.sources as Source[]);
          break;
        case "done":
          opts.onDone();
          return;
        case "error":
          opts.onError((payload.message as string) ?? "Stream error");
          return;
      }
    }
  }

  opts.onDone();
}

async function apiFetchChats(company_id: string): Promise<Chat[]> {
  const url = `${API_BASE}/auricbot/chats?company_id=${encodeURIComponent(company_id)}&limit=100`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch chats: ${res.status}`);
  }
  const data = await res.json();
  return (data as Record<string, unknown>[]).map((c) => ({
    chatId: (c.chatId ?? c.chat_id) as string,
    title: (c.title ?? null) as string | null,
    createdAt: (c.createdAt ?? c.created_at) as string,
    updatedAt: (c.updatedAt ?? c.updated_at) as string,
  }));
}

async function apiFetchMessages(chat_id: string, company_id: string): Promise<Message[]> {
  const url = `${API_BASE}/auricbot/chats/${encodeURIComponent(chat_id)}?company_id=${encodeURIComponent(company_id)}`;
  const res = await fetch(url);

  if (res.status === 404) return [];

  if (!res.ok) {
    throw new Error(`Failed to fetch messages: ${res.status}`);
  }

  const data = await res.json();
  const raw = (data.messages ?? []) as Record<string, unknown>[];
  return raw.map((m) => ({
    messageId: (m.messageId ?? m.message_id) as string,
    chatId: chat_id,
    role: m.role as "user" | "assistant",
    content: (m.content ?? "") as string,
    sources: (m.sources ?? null) as Source[] | null,
    createdAt: (m.createdAt ?? m.created_at) as string,
  }));
}

async function apiDeleteChat(chat_id: string, company_id: string): Promise<void> {
  const res = await fetch(
    `${API_BASE}/auricbot/chats/${encodeURIComponent(chat_id)}?company_id=${encodeURIComponent(company_id)}`,
    { method: "DELETE" },
  );
  if (!res.ok) throw new Error(`Failed to delete chat: ${res.status}`);
}

async function apiClearHistory(company_id: string): Promise<void> {
  const res = await fetch(
    `${API_BASE}/auricbot/chats?company_id=${encodeURIComponent(company_id)}`,
    { method: "DELETE" },
  );
  if (!res.ok) throw new Error(`Failed to clear history: ${res.status}`);
}

export function useAskAuric({ companyId }: { companyId: string | undefined | null }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatIdRaw] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  const [clearingHistory, setClearingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const didAutoSelect = useRef(false);
  const skipNextMessageLoadRef = useRef(false);

  const loadChats = useCallback(
    async (opts?: { autoSelectFirst?: boolean }) => {
      if (!companyId) return;
      try {
        setLoadingChats(true);
        setError(null);
        const data = await apiFetchChats(companyId);
        setChats(data);
        if (opts?.autoSelectFirst && !didAutoSelect.current && data.length > 0) {
          didAutoSelect.current = true;
          setActiveChatIdRaw(data[0].chatId);
        }
      } catch (err) {
        console.error("[AuricBot] loadChats error:", err);
        setError("Couldn't load your chat history. Pull to refresh or try again shortly.");
      } finally {
        setLoadingChats(false);
      }
    },
    [companyId],
  );

  const loadMessages = useCallback(
    async (chatId: string) => {
      if (!companyId || !chatId) return;
      try {
        setLoadingMessages(true);
        const data = await apiFetchMessages(chatId, companyId);
        setMessages(data);
      } catch (err) {
        console.error("[AuricBot] loadMessages error:", err);
        setError("Couldn't load this conversation.");
      } finally {
        setLoadingMessages(false);
      }
    },
    [companyId],
  );

  const setActiveChatId = useCallback((id: string) => {
    abortRef.current?.abort();
    setSendingMessage(false);
    setActiveChatIdRaw(id);
  }, []);

  const createChat = useCallback(() => {
    abortRef.current?.abort();
    setSendingMessage(false);
    setActiveChatIdRaw("");
    setMessages([]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      if (!companyId) {
        setError("Missing company context — please refresh the page.");
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setSendingMessage(true);
      setError(null);

      const startChatId = activeChatId;
      const now = new Date().toISOString();
      const tempUserId = `temp-user-${Date.now()}`;
      const tempAiId = `temp-ai-${Date.now() + 1}`;

      const userMsg: Message = {
        messageId: tempUserId,
        chatId: startChatId,
        role: "user",
        content: trimmed,
        createdAt: now,
      };

      const aiMsg: Message = {
        messageId: tempAiId,
        chatId: startChatId,
        role: "assistant",
        content: "",
        isStreaming: true,
        statusLabel: "Thinking…",
        createdAt: now,
      };

      setMessages((prev) => [...prev, userMsg, aiMsg]);

      const optimisticNewChat = !startChatId;

      try {
        await streamChat({
          query: trimmed,
          company_id: companyId,
          chat_id: startChatId || null,
          signal: controller.signal,

          onChatId: (id) => {
            if (id !== startChatId) {
              skipNextMessageLoadRef.current = true;
            }
            setActiveChatIdRaw(id);
            setMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempUserId || m.messageId === tempAiId
                  ? { ...m, chatId: id }
                  : m,
              ),
            );
            setChats((prev) => {
              if (prev.some((c) => c.chatId === id)) return prev;
              return [
                {
                  chatId: id,
                  title: optimisticNewChat ? trimmed.slice(0, 60) : null,
                  createdAt: now,
                  updatedAt: now,
                },
                ...prev,
              ];
            });
          },

          onStatus: (label) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempAiId && !m.content ? { ...m, statusLabel: label } : m,
              ),
            );
          },

          onToken: (token) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempAiId
                  ? { ...m, content: m.content + token, statusLabel: null }
                  : m,
              ),
            );
          },

          onSources: (sources) => {
            setMessages((prev) =>
              prev.map((m) => (m.messageId === tempAiId ? { ...m, sources } : m)),
            );
          },

          onUsage: (usage) => {
            setMessages((prev) =>
              prev.map((m) => (m.messageId === tempAiId ? { ...m, usage } : m)),
            );
          },

          onDone: () => {
            setMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempAiId
                  ? { ...m, isStreaming: false, statusLabel: null }
                  : m,
              ),
            );
            setSendingMessage(false);
            loadChats();
          },

          onError: (errMsg) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.messageId === tempAiId
                  ? {
                      ...m,
                      content: m.content || `⚠️ ${errMsg}`,
                      isStreaming: false,
                      statusLabel: null,
                    }
                  : m,
              ),
            );
            setSendingMessage(false);
          },
        });
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) =>
            m.messageId === tempAiId
              ? {
                  ...m,
                  content: "⚠️ Request was interrupted.",
                  isStreaming: false,
                  statusLabel: null,
                }
              : m,
          ),
        );
        setSendingMessage(false);
      }
    },
    [activeChatId, companyId, loadChats],
  );

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setSendingMessage(false);
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false, statusLabel: null } : m)),
    );
  }, []);

  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!companyId) return;
      setDeletingChatId(chatId);
      try {
        await apiDeleteChat(chatId, companyId);
        setChats((prev) => prev.filter((c) => c.chatId !== chatId));
        if (activeChatId === chatId) {
          abortRef.current?.abort();
          setSendingMessage(false);
          setActiveChatIdRaw("");
          setMessages([]);
        }
      } catch (err) {
        console.error("[AuricBot] deleteChat error:", err);
        setError("Couldn't delete that chat. Please try again.");
      } finally {
        setDeletingChatId(null);
      }
    },
    [activeChatId, companyId],
  );

  const clearHistory = useCallback(async () => {
    if (!companyId) return;
    setClearingHistory(true);
    try {
      await apiClearHistory(companyId);
      abortRef.current?.abort();
      setSendingMessage(false);
      setChats([]);
      setMessages([]);
      setActiveChatIdRaw("");
    } catch (err) {
      console.error("[AuricBot] clearHistory error:", err);
      setError("Couldn't clear chat history. Please try again.");
    } finally {
      setClearingHistory(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) loadChats({ autoSelectFirst: true });
  }, [companyId, loadChats]);

  useEffect(() => {
    if (activeChatId) {
      if (skipNextMessageLoadRef.current) {
        skipNextMessageLoadRef.current = false;
        return;
      }
      loadMessages(activeChatId);
    } else {
      setMessages([]);
    }
  }, [activeChatId, loadMessages]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
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
    refreshChats: loadChats,
  };
}