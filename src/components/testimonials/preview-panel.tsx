"use client";

import { useState } from "react";
import TestimonialWall from "./testimonial-wall";

export default function PreviewPanel({ config, testimonials }:any) {
  const [mode, setMode] = useState("desktop");

  return (
    <div className="flex-1 min-w-0">
   
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-gray-900"> Live Preview</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            This is how your testimonial wall will look.
          </p>
        </div>
     
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
          <button
            onClick={() => setMode("desktop")}
            className={`p-1.5 rounded ${
              mode === "desktop"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            } transition`}
            title="Desktop"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
          <button
            onClick={() => setMode("mobile")}
            className={`p-1.5 rounded ${
              mode === "mobile"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            } transition`}
            title="Mobile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <circle cx="12" cy="18" r="1" />
            </svg>
          </button>
        </div>
      </div>

   
      <div
        className={`transition-all duration-300 mx-auto ${
          mode === "mobile" ? "max-w-sm" : "w-full"
        }`}
      >
        <TestimonialWall config={config} testimonials={testimonials} />
      </div>
    </div>
  );
}