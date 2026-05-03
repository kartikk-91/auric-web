"use client";

import { useState } from "react";

export default function EditableHeader({
  title,
  setTitle,
  tagline,
  setTagline,
}: any) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingTagline, setEditingTagline] = useState(false);

  return (
    <div className="mb-8 space-y-1">
      {editingTitle ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setEditingTitle(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setEditingTitle(false);
          }}
          className="text-xl font-semibold text-gray-900 bg-transparent border-b border-blue-400 outline-none w-full transition"
        />
      ) : (
        <h1
          onClick={() => setEditingTitle(true)}
          className="text-xl font-semibold text-gray-900 cursor-text hover:opacity-80 transition"
        >
          {title || "Untitled Form"}
        </h1>
      )}

      {editingTagline ? (
        <textarea
          autoFocus
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          onBlur={() => setEditingTagline(false)}
          className="text-sm text-gray-500 bg-transparent border-b border-blue-300 outline-none w-full resize-none transition"
        />
      ) : (
        <p
          onClick={() => setEditingTagline(true)}
          className="text-sm text-gray-500 cursor-text hover:opacity-80 transition"
        >
          {tagline || "Add a description..."}
        </p>
      )}
    </div>
  );
}