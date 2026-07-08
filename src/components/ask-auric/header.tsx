"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="w-full shrink-0 border-b border-gray-100 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenSidebar}
            className="xl:hidden shrink-0 rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 active:scale-95"
            aria-label="Open chat history"
          >
            <Menu className="h-4 w-4" />
          </button>

          
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
              <Image
                src="/emblem-transparent.png"
                alt="Auric"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900 leading-none">Ask Auric</h1>

              </div>
              <p className="mt-0.5 text-xs text-gray-400 truncate">
                AI-powered insights from your feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}