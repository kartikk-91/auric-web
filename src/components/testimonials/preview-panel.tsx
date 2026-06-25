"use client";

import { useState } from "react";
import TestimonialWall from "./testimonial-wall";

export default function PreviewPanel({
  config,
  testimonials,
}: {
  config: any;
  testimonials: any[];
}) {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="min-w-0 flex-1">
      {/* Preview header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="hidden lg:block min-w-0">
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">Live Preview</h2>
          <p className="mt-0.5 text-xs text-gray-400 sm:text-sm">
            This is how your testimonial wall will look.
          </p>
        </div>

        {/* Device toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm ml-auto">
          <button
            onClick={() => setMode("desktop")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              mode === "desktop"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Desktop preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setMode("mobile")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              mode === "mobile"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Mobile preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" />
            </svg>
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Browser chrome wrapper */}
      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-300" />
            <span className="h-3 w-3 rounded-full bg-yellow-300" />
            <span className="h-3 w-3 rounded-full bg-green-300" />
          </div>
          <div className="mx-2 flex flex-1 items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-gray-400 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-xs text-gray-400 truncate">yourwebsite.com/testimonials</span>
          </div>
        </div>

        {/* Preview content */}
        <div className="p-3 sm:p-4 lg:p-5 bg-gray-50/50">
          <div
            className={`mx-auto transition-all duration-300 ease-in-out ${
              mode === "mobile" ? "w-[320px] sm:w-[340px]" : "w-full"
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                mode === "mobile"
                  ? "overflow-hidden rounded-[36px] border-[10px] border-gray-900 shadow-2xl"
                  : ""
              }`}
            >
              {/* Notch for mobile */}
              {mode === "mobile" && (
                <div className="flex justify-center bg-gray-900 pb-1">
                  <div className="h-5 w-24 rounded-b-2xl bg-gray-800" />
                </div>
              )}
              <div
                className={`${
                  mode === "mobile"
                    ? "h-[600px] overflow-y-auto bg-white"
                    : ""
                }`}
              >
                <TestimonialWall
                  config={config}
                  testimonials={testimonials}
                  previewMode={mode}
                />
              </div>
              {/* Home bar for mobile */}
              {mode === "mobile" && (
                <div className="flex justify-center bg-white py-2">
                  <div className="h-1 w-24 rounded-full bg-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}