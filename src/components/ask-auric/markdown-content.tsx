"use client";

import React, { ElementType, useMemo } from "react";



type Token =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "code_block"; lang: string; code: string }
  | { type: "blockquote"; text: string }
  | { type: "hr" }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "paragraph"; text: string }
  | { type: "blank" };

function tokenize(md: string): Token[] {
  const tokens: Token[] = [];
  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      tokens.push({ type: "code_block", lang, code: codeLines.join("\n") });
      i++;
      continue;
    }
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      tokens.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3 | 4,
        text: headingMatch[2],
      });
      i++;
      continue;
    }
    if (/^[-*_]{3,}\s*$/.test(line)) {
      tokens.push({ type: "hr" });
      i++;
      continue;
    }
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].slice(1).trim());
        i++;
      }
      tokens.push({ type: "blockquote", text: quoteLines.join("\n") });
      continue;
    }
    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      tokens.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, "").trim());
        i++;
      }
      tokens.push({ type: "ol", items });
      continue;
    }
    if (line.includes("|") && i + 1 < lines.length && /^\|?[-| :]+\|?$/.test(lines[i + 1])) {
      const parseRow = (r: string) =>
        r
          .split("|")
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 || arr[0] !== "")
          .filter((_, idx, arr) => idx < arr.length - 1 || arr[arr.length - 1] !== "");

      const headers = parseRow(line);
      i += 2; 
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(parseRow(lines[i]));
        i++;
      }
      tokens.push({ type: "table", headers, rows });
      continue;
    }
    if (line.trim() === "") {
      tokens.push({ type: "blank" });
      i++;
      continue;
    }
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,4}\s/.test(lines[i]) &&
      !/^[-*+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !(lines[i].includes("|") && i + 1 < lines.length && /^\|?[-| :]+\|?$/.test(lines[i + 1]))
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      tokens.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return tokens;
}


function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={match.index} className="font-semibold text-gray-900">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={match.index}>{match[4]}</em>);
    } else if (match[5]) {
      parts.push(
        <code
          key={match.index}
          className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.8em] text-rose-600"
        >
          {match[6]}
        </code>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function RenderInline({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}

function RenderToken({ token, idx }: { token: Token; idx: number }) {
  switch (token.type) {
    case "heading": {
      const Tag = `h${token.level}` as ElementType;
      const sizeMap: Record<number, string> = {
        1: "text-xl font-bold text-gray-900 mt-5 mb-2",
        2: "text-lg font-semibold text-gray-800 mt-4 mb-1.5",
        3: "text-base font-semibold text-gray-800 mt-3 mb-1",
        4: "text-sm font-semibold text-gray-700 mt-2 mb-1",
      };
      return (
        <Tag className={sizeMap[token.level]}>
          <RenderInline text={token.text} />
        </Tag>
      );
    }

    case "code_block":
      return (
        <div className="my-3 overflow-hidden rounded-xl border border-gray-200 bg-gray-950">
          {token.lang && (
            <div className="border-b border-gray-800 bg-gray-900 px-4 py-1.5">
              <span className="font-mono text-[11px] font-medium text-gray-400">{token.lang}</span>
            </div>
          )}
          <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-green-300">
            <code>{token.code}</code>
          </pre>
        </div>
      );

    case "blockquote":
      return (
        <blockquote className="my-3 border-l-4 border-blue-400 bg-blue-50 py-2 pl-4 pr-3 text-sm italic text-gray-600">
          <RenderInline text={token.text} />
        </blockquote>
      );

    case "hr":
      return <hr className="my-4 border-gray-200" />;

    case "ul":
      return (
        <ul className="my-2 ml-4 space-y-1 list-none">
          {token.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span><RenderInline text={item} /></span>
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="my-2 ml-4 space-y-1 list-none">
          {token.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-gray-700">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-600">
                {i + 1}
              </span>
              <span><RenderInline text={item} /></span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="my-3 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                {token.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-gray-200 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    <RenderInline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {token.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="border-b border-gray-100 px-4 py-2.5 text-gray-700">
                      <RenderInline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "paragraph":
      return (
        <p className="my-1.5 text-sm leading-7 text-gray-700">
          <RenderInline text={token.text} />
        </p>
      );

    case "blank":
      return null;

    default:
      return null;
  }
}

interface MarkdownContentProps {
  content: string;
  isStreaming?: boolean;
}

export default function MarkdownContent({ content, isStreaming }: MarkdownContentProps) {
  const tokens = useMemo(() => tokenize(content), [content]);

  return (
    <div className="min-w-0">
      {tokens.map((token, i) => (
        <RenderToken key={i} token={token} idx={i} />
      ))}
      {isStreaming && (
        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue-500 align-middle" />
      )}
    </div>
  );
}