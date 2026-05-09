"use client";

import { useState } from "react";

export default function EditableHeader({
  title,
  setTitle,
  tagline,
  setTagline,
}: any) {
  const [editingTitle, setEditingTitle] =
    useState(false);

  const [
    editingTagline,
    setEditingTagline,
  ] = useState(false);

  return (
    <div className="mb-6 space-y-1 sm:mb-7">


      {editingTitle ? (
        <input
          autoFocus
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          onBlur={() =>
            setEditingTitle(
              false
            )
          }
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              setEditingTitle(
                false
              );
            }
          }}
          className="w-full border-b border-blue-400 bg-transparent pb-1 text-xl font-semibold text-gray-900 outline-none transition"
        />
      ) : (
        <h1
          onClick={() =>
            setEditingTitle(
              true
            )
          }
          className="cursor-text wrap-break-word text-xl font-semibold text-gray-900 transition hover:opacity-80"
        >
          {title ||
            "Untitled Form"}
        </h1>
      )}


      {editingTagline ? (
        <textarea
          autoFocus
          rows={2}
          value={tagline}
          onChange={(e) =>
            setTagline(
              e.target.value
            )
          }
          onBlur={() =>
            setEditingTagline(
              false
            )
          }
          className="w-full resize-none border-b border-blue-300 bg-transparent text-sm leading-relaxed text-gray-500 outline-none transition"
        />
      ) : (
        <p
          onClick={() =>
            setEditingTagline(
              true
            )
          }
          className="cursor-text wrap-break-word text-sm leading-relaxed text-gray-500 transition hover:opacity-80"
        >
          {tagline ||
            "Add a description..."}
        </p>
      )}
    </div>
  );
}