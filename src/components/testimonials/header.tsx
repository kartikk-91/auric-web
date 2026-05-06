"use client";

export default function Header({ onPublish }:any) {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Testimonial Wall Builder
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Create a beautiful testimonial wall and share it anywhere.
        </p>
      </div>
      <button
        onClick={onPublish}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors duration-150 shadow-sm"
      >
        Publish Wall
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </button>
    </header>
  );
}