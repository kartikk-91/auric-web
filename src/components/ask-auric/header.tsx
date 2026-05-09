"use client";

import {
  Menu,
  MessageSquare,
} from "lucide-react";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({
  onOpenSidebar,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-100 bg-white shrink-0">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between gap-3">

          <div className="flex items-start gap-3 min-w-0">

            <button
              onClick={onOpenSidebar}
              className="lg:hidden mt-0.5 shrink-0 rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50"
              aria-label="Open chat history"
            >
              <Menu className="h-5 w-5" />
            </button>


            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl sm:text-2xl font-semibold text-gray-900">
                  Ask Auric
                </h1>

                <span className="h-fit rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 shrink-0">
                  Beta
                </span>
              </div>

              <p className="mt-0.5 text-xs sm:text-sm text-gray-400 line-clamp-1">
                Get AI-powered insights about your feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}