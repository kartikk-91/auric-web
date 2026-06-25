"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EditableHeader({
  title,
  setTitle,
  tagline,
  setTagline,
  disabled,
}: any) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingTagline, setEditingTagline] = useState(false);

  return (
    <div className="mb-7 space-y-2">
      {/* Title */}
      <div className="group relative">
        {editingTitle ? (
          <input
            autoFocus
            value={title}
            disabled={disabled}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                setEditingTitle(false);
              }
            }}
            className="w-full border-b-2 border-blue-400 bg-transparent pb-1 text-xl font-semibold text-gray-900 outline-none placeholder-gray-300"
            placeholder="Untitled Form"
          />
        ) : (
          <button
            onClick={() => !disabled && setEditingTitle(true)}
            disabled={disabled}
            className="group/title flex w-full items-start gap-2 text-left disabled:cursor-default"
          >
            <h1 className="break-words text-xl font-semibold leading-snug text-gray-900 transition-colors group-hover/title:text-blue-600 disabled:group-hover/title:text-gray-900">
              {title || (
                <span className="text-gray-300">Untitled Form</span>
              )}
            </h1>
            {!disabled && (
              <Pencil className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300 opacity-0 transition group-hover/title:opacity-100" />
            )}
          </button>
        )}
      </div>

      {/* Tagline */}
      <div className="group/tagline relative">
        {editingTagline ? (
          <textarea
            autoFocus
            rows={2}
            value={tagline}
            disabled={disabled}
            onChange={(e) => setTagline(e.target.value)}
            onBlur={() => setEditingTagline(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setEditingTagline(false);
            }}
            className="w-full resize-none border-b border-blue-300 bg-transparent text-sm leading-relaxed text-gray-500 outline-none placeholder-gray-300"
            placeholder="Add a description…"
          />
        ) : (
          <button
            onClick={() => !disabled && setEditingTagline(true)}
            disabled={disabled}
            className="flex w-full items-start gap-2 text-left disabled:cursor-default"
          >
            <p className="break-words text-sm leading-relaxed text-gray-500 transition-colors hover:text-blue-500 disabled:hover:text-gray-500">
              {tagline || (
                <span className="text-gray-300">Add a description…</span>
              )}
            </p>
            {!disabled && (
              <Pencil className="mt-0.5 h-3 w-3 shrink-0 text-gray-300 opacity-0 transition group-hover/tagline:opacity-100" />
            )}
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="pt-1">
        <div className="h-px w-full bg-gray-100" />
      </div>
    </div>
  );
}