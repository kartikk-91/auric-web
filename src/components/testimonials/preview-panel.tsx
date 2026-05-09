"use client";

import { useState } from "react";
import TestimonialWall from "./testimonial-wall";

export default function PreviewPanel({
  config,
  testimonials,
}: any) {
  const [mode, setMode] =
    useState("desktop");

  return (
    <div className="min-w-0 flex-1">

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div className="min-w-0">
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">
            Live Preview
          </h2>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            This is how your testimonial wall
            will look.
          </p>
        </div>


        <div className="flex w-fit items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() =>
              setMode("desktop")
            }
            className={`flex items-center justify-center rounded-lg p-2 transition ${
              mode === "desktop"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Desktop"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
              />
              <line
                x1="8"
                y1="21"
                x2="16"
                y2="21"
              />
              <line
                x1="12"
                y1="17"
                x2="12"
                y2="21"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setMode("mobile")
            }
            className={`flex items-center justify-center rounded-lg p-2 transition ${
              mode === "mobile"
                ? "bg-gray-100 text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
            title="Mobile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect
                x="5"
                y="2"
                width="14"
                height="20"
                rx="2"
              />
              <circle
                cx="12"
                cy="18"
                r="1"
              />
            </svg>
          </button>
        </div>
      </div>


      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
        <div className="p-3 sm:p-4 lg:p-5">
          <div
            className={`mx-auto transition-all duration-300 ease-in-out ${
              mode === "mobile"
                ? "w-[320px] sm:w-[340px]"
                : "w-full"
            }`}
          >

            <div
              className={`transition-all duration-300 ${
                mode === "mobile"
                  ? "overflow-hidden rounded-[36px] border-8 border-gray-900 bg-black shadow-2xl"
                  : ""
              }`}
            >

              <div
                className={`${
                  mode === "mobile"
                    ? "h-[620px] overflow-y-auto bg-white"
                    : ""
                }`}
              >
                <TestimonialWall
                  config={config}
                  testimonials={
                    testimonials
                  }
                  previewMode={mode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}