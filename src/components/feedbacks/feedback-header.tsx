'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface FeedbackHeaderProps {
  dateRange: string;
  onDateRangeChange: (
    range: string
  ) => void;

  selectedSentiment: string;
  onSentimentChange: (
    value: string
  ) => void;

  selectedLocation: string;
  onLocationChange: (
    value: string
  ) => void;

  ageRange: string;
  onAgeRangeChange: (
    value: string
  ) => void;

  onExportCSV: () => void;
  onExportJSON: () => void;

  totalFeedbacks: number;
}

const DATE_OPTIONS = [
  "Today",
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "All Time",
];

const SENTIMENT_OPTIONS = [
  { label: "All", value: "" },
  { label: "Positive", value: "Positive" },
  { label: "Neutral", value: "Neutral" },
  { label: "Negative", value: "Negative" },
];

const AGE_OPTIONS = [
  { label: "All", value: "" },
  { label: "18–25", value: "18-25" },
  { label: "26–35", value: "26-35" },
  { label: "36–50", value: "36-50" },
  { label: "50+", value: "50+" },
];

// Viewport margin the menu should never cross, in px.
const VIEWPORT_MARGIN = 16;
// Gap between the trigger button and the menu, in px (matches the old mt-2).
const MENU_GAP = 8;

interface MenuStyle {
  top: number;
  left: number;
  width: number;
}

/**
 * Measures a trigger button and returns a fixed-position style for its menu
 * that is clamped to the viewport, so the menu can never overflow off the
 * left or right edge of the screen no matter where the button sits.
 */
function computeMenuStyle(
  buttonEl: HTMLElement,
  desiredWidth: number
): MenuStyle {
  const rect = buttonEl.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  const width = Math.min(desiredWidth, viewportWidth - VIEWPORT_MARGIN * 2);

  // Default to right-aligning the menu with the button, like the original design.
  let left = rect.right - width;

  // Clamp so the menu never crosses either edge of the viewport.
  left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(left, viewportWidth - width - VIEWPORT_MARGIN)
  );

  const top = rect.bottom + MENU_GAP;

  return { top, left, width };
}

export default function FeedbackHeader({
  dateRange,
  onDateRangeChange,
  selectedSentiment,
  onSentimentChange,
  selectedLocation,
  onLocationChange,
  ageRange,
  onAgeRangeChange,
  onExportCSV,
  onExportJSON,
}: FeedbackHeaderProps) {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const [dateMenuStyle, setDateMenuStyle] = useState<MenuStyle | null>(null);
  const [filterMenuStyle, setFilterMenuStyle] = useState<MenuStyle | null>(null);
  const [exportMenuStyle, setExportMenuStyle] = useState<MenuStyle | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);

  const closeAll = () => {
    setIsDateOpen(false);
    setIsFilterOpen(false);
    setIsExportOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Recompute (and re-clamp) menu positions on open, resize, and scroll, so
  // menus never drift off-screen or get stranded after a viewport change.
  useLayoutEffect(() => {
    const recalculate = () => {
      if (isDateOpen && dateButtonRef.current) {
        setDateMenuStyle(computeMenuStyle(dateButtonRef.current, 192)); // w-48
      }
      if (isFilterOpen && filterButtonRef.current) {
        setFilterMenuStyle(computeMenuStyle(filterButtonRef.current, 320)); // w-80
      }
      if (isExportOpen && exportButtonRef.current) {
        setExportMenuStyle(computeMenuStyle(exportButtonRef.current, 208)); // w-52
      }
    };

    recalculate();

    if (isDateOpen || isFilterOpen || isExportOpen) {
      window.addEventListener("resize", recalculate);
      window.addEventListener("scroll", recalculate, true);
    }

    return () => {
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate, true);
    };
  }, [isDateOpen, isFilterOpen, isExportOpen]);

  const activeFilterCount = [
    selectedSentiment,
    selectedLocation,
    ageRange,
  ].filter(Boolean).length;

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Customer Feedback
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl leading-6">
            View customer responses, AI-generated insights and testimonials collected across your feedback forms.
          </p>
        </div>

        <div
          ref={dropdownRef}
          className="flex flex-wrap items-center gap-2.5 lg:flex-nowrap"
        >
          {/* Date range dropdown */}
          <div className="relative">
            <button
              ref={dateButtonRef}
              onClick={() => {
                setIsDateOpen(!isDateOpen);
                setIsFilterOpen(false);
                setIsExportOpen(false);
              }}
              className={`h-10 px-3.5 rounded-lg border text-sm font-medium flex items-center gap-2 transition-colors ${
                isDateOpen
                  ? "border-gray-300 bg-gray-50 text-gray-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>

              <span>{dateRange}</span>

              <svg
                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                  isDateOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDateOpen && dateMenuStyle && (
              <div
                style={{
                  position: "fixed",
                  top: dateMenuStyle.top,
                  left: dateMenuStyle.left,
                  width: dateMenuStyle.width,
                }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-900/5 overflow-hidden z-50 py-1"
              >
                {DATE_OPTIONS.map((option) => {
                  const active = option === dateRange;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        onDateRangeChange(option);
                        setIsDateOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 flex items-center justify-between text-sm text-left transition-colors ${
                        active
                          ? "text-blue-700 bg-blue-50/70 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{option}</span>

                      {active && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filters dropdown */}
          <div className="relative">
            <button
              ref={filterButtonRef}
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                setIsDateOpen(false);
                setIsExportOpen(false);
              }}
              className={`h-10 px-3.5 rounded-lg border text-sm font-medium flex items-center gap-2 transition-colors ${
                isFilterOpen
                  ? "border-gray-300 bg-gray-50 text-gray-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>

              <span>Filters</span>

              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-blue-600 text-white text-[11px] font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {isFilterOpen && filterMenuStyle && (
              <div
                style={{
                  position: "fixed",
                  top: filterMenuStyle.top,
                  left: filterMenuStyle.left,
                  width: filterMenuStyle.width,
                }}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-900/5 z-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Filter feedback
                  </h3>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        onSentimentChange("");
                        onLocationChange("");
                        onAgeRangeChange("");
                      }}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="px-5 py-4 space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                      Sentiment
                    </label>

                    <div className="flex flex-wrap gap-1.5">
                      {SENTIMENT_OPTIONS.map((option) => {
                        const active = option.value === selectedSentiment;

                        return (
                          <button
                            key={option.label}
                            onClick={() => onSentimentChange(option.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                              active
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                      Country / State
                    </label>

                    <div className="relative">
                      <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                        />
                      </svg>

                      <input
                        value={selectedLocation}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="Search country or state..."
                        className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2.5">
                      Age
                    </label>

                    <div className="flex flex-wrap gap-1.5">
                      {AGE_OPTIONS.map((option) => {
                        const active = option.value === ageRange;

                        return (
                          <button
                            key={option.label}
                            onClick={() => onAgeRangeChange(option.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                              active
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Export dropdown */}
          <div className="relative">
            <button
              ref={exportButtonRef}
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsDateOpen(false);
                setIsFilterOpen(false);
              }}
              className="h-10 px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg flex items-center gap-2 text-sm font-medium whitespace-nowrap"
            >
              Export Data

              <svg
                className={`w-3.5 h-3.5 transition-transform ${
                  isExportOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isExportOpen && exportMenuStyle && (
              <div
                style={{
                  position: "fixed",
                  top: exportMenuStyle.top,
                  left: exportMenuStyle.left,
                  width: exportMenuStyle.width,
                }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-900/5 overflow-hidden z-50 py-1"
              >
                <button
                  onClick={() => {
                    onExportCSV();
                    setIsExportOpen(false);
                  }}
                  className="w-full px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-left text-sm text-gray-700"
                >
                  <span>📄</span>
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => {
                    onExportJSON();
                    setIsExportOpen(false);
                  }}
                  className="w-full px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 text-left text-sm text-gray-700"
                >
                  <span>🗂</span>
                  <span>Export JSON</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}