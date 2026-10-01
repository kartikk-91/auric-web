"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, Database, ExternalLink, FileText, Gauge } from "lucide-react";

import MarkdownContent from "./markdown-content";
import { Citation, Source, Usage } from "@/hooks/use-ask-auric";

export type ChatMessageData = {
  messageId: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[] | null;
  citations?: Citation[] | null;
  usage?: Usage | null;
  createdAt: string;
  isStreaming?: boolean;
  statusLabel?: string | null;
};

interface ChatBubbleProps {
  message: ChatMessageData;
}

function AuricAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm">
      <Image
        src="/emblem-transparent.png"
        alt="Auric"
        width={20}
        height={20}
        className="object-contain"
      />
    </div>
  );
}

function SourcesPanel({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);
  if (!sources.length) return null;

  return (
    <div className="mt-3 border-t border-gray-100 pt-2">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Database className="h-3 w-3" />
        {sources.length} source{sources.length !== 1 ? "s" : ""}
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {open && (
        <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
          {sources.map((src, i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <FileText className="h-3 w-3 text-blue-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
                  {src.retriever}
                </span>
                {src.error && (
                  <span className="ml-auto text-[10px] text-red-400">Error: {src.error}</span>
                )}
              </div>

              {src.plan != null && (
                <pre className="mt-1 overflow-x-auto rounded bg-gray-100 px-2 py-1.5 font-mono text-[11px] leading-relaxed text-gray-600">
                  {typeof src.plan === "string"
                    ? src.plan
                    : JSON.stringify(src.plan, null, 2)}
                </pre>
              )}

              {src.rows && src.rows.length > 0 && (
                <div className="mt-2 overflow-x-auto rounded border border-gray-200 bg-white">
                  <table className="w-full text-[11px]">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(src.rows[0]).map((k) => (
                          <th
                            key={k}
                            className="border-b border-gray-100 px-3 py-1.5 text-left font-semibold text-gray-500 uppercase tracking-wide"
                          >
                            {k}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {src.rows.slice(0, 10).map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "" : "bg-gray-50/50"}>
                          {Object.values(row).map((v, ci) => (
                            <td key={ci} className="border-b border-gray-50 px-3 py-1.5 text-gray-700">
                              {String(v)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {src.rows.length > 10 && (
                    <p className="px-3 py-1.5 text-[10px] text-gray-400">
                      +{src.rows.length - 10} more rows
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsageBadge({ usage }: { usage: Usage }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
      <Gauge className="h-2.5 w-2.5" />
      {usage.total_tokens.toLocaleString()} tokens
      {usage.estimated ? " (est.)" : ""}
    </span>
  );
}

function StatusLine({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-1 px-0.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
      </span>
      <span className="text-sm text-gray-500 animate-pulse">{label}</span>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1.5 px-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";
  const isEmpty = message.content === "" || message.content === "__typing__";

  const timeLabel = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isUser) {
    return (
      <div className="mb-4 flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-200">
        <div className="max-w-[82%] sm:max-w-[70%] lg:max-w-[60%]">
          <div className="rounded-[20px] rounded-br-md bg-blue-600 px-4 py-3 text-white shadow-sm">
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          </div>
          <p className="mt-1 text-right text-[10px] text-gray-400">{timeLabel}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <AuricAvatar />

      <div className="min-w-0 flex-1 max-w-full sm:max-w-[88%] lg:max-w-[80%]">
        <div className="rounded-[20px] rounded-tl-md border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-150">
          {isEmpty ? (
            message.statusLabel ? (
              <StatusLine label={message.statusLabel} />
            ) : (
              <TypingDots />
            )
          ) : (
            <>
              <MarkdownContent
                content={message.content}
                isStreaming={message.isStreaming}
              />

              {message.citations && message.citations.length > 0 && !message.isStreaming && (
                <CitationPanel citations={message.citations ?? []} />
              )}
            </>
          )}
        </div>

        {!message.isStreaming && message.content && message.content !== "__typing__" && (
          <div className="ml-2 mt-1 flex items-center gap-2">
            <p className="text-[10px] text-gray-400">{timeLabel}</p>
            {message.usage && (
              <>
                <span className="text-gray-300">·</span>
                <UsageBadge usage={message.usage} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CitationPanel({ citations }: { citations: Citation[] }) {
  const [open, setOpen] = useState(false);
  if (!citations.length) return null;

  return (
    <div className="mt-3 border-t border-gray-100 pt-2">
      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 hover:text-gray-600">
        <FileText className="h-3 w-3" />
        {citations.length} citation{citations.length === 1 ? "" : "s"}
        {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>
      {open && <div className="mt-2 space-y-2">
        {citations.map((citation) => <article key={citation.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
          <div className="flex items-start justify-between gap-2"><div><span className="mr-1 font-semibold text-blue-600">[{citation.id}]</span>{citation.title}</div><span className="shrink-0 uppercase text-[10px] font-medium tracking-wide text-gray-400">{citation.type}</span></div>
          {citation.type === "knowledge" && citation.page != null && <p className="mt-1">Page {citation.page}</p>}
          {citation.type === "feedback" && <p className="mt-1">{[citation.state, citation.rating != null ? `${citation.rating}/5` : null, citation.sentiment].filter(Boolean).join(" · ")}</p>}
          {citation.type === "sql" && <p className="mt-1">{[citation.table, citation.rows_analyzed != null ? `${citation.rows_analyzed} rows analyzed` : null].filter(Boolean).join(" · ")}</p>}
          {citation.excerpt && <p className="mt-1.5 line-clamp-3 text-gray-500">{citation.excerpt}</p>}
          {citation.type === "internet" && citation.url && <a href={citation.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:underline">Open source <ExternalLink className="h-3 w-3" /></a>}
        </article>)}
      </div>}
    </div>
  );
}
