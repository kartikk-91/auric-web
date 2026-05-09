'use client';

import { useEffect, useRef, useState } from 'react';

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
}

const DATE_OPTIONS = [
  'Today',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'All Time',
];

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
  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const [
    isExportOpen,
    setIsExportOpen,
  ] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsFilterOpen(false);
        setIsExportOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
            Feedback
          </h1>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
            View and analyze
            all feedback
            collected from
            your forms and
            sources.
          </p>
        </div>


        <div
          className="flex flex-wrap items-center gap-3 lg:flex-nowrap"
          ref={dropdownRef}
        >

          <select
            value={dateRange}
            onChange={(e) =>
              onDateRangeChange(
                e.target.value
              )
            }
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 outline-none cursor-pointer"
          >
            {DATE_OPTIONS.map(
              (option) => (
                <option
                  key={option}
                  value={
                    option
                  }
                >
                  {option}
                </option>
              )
            )}
          </select>


          <div className="relative">
            <button
              onClick={() => {
                setIsFilterOpen(
                  !isFilterOpen
                );
                setIsExportOpen(
                  false
                );
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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

              <span>
                Filter
              </span>
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Filters
                </h3>

                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sentiment
                    </label>

                    <select
                      value={
                        selectedSentiment
                      }
                      onChange={(
                        e
                      ) =>
                        onSentimentChange(
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    >
                      <option value="">
                        All
                      </option>
                      <option value="Positive">
                        Positive
                      </option>
                      <option value="Neutral">
                        Neutral
                      </option>
                      <option value="Negative">
                        Negative
                      </option>
                    </select>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>

                    <input
                      value={
                        selectedLocation
                      }
                      onChange={(
                        e
                      ) =>
                        onLocationChange(
                          e
                            .target
                            .value
                        )
                      }
                      placeholder="Search location..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>

                    <select
                      value={
                        ageRange
                      }
                      onChange={(
                        e
                      ) =>
                        onAgeRangeChange(
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    >
                      <option value="">
                        All
                      </option>
                      <option value="18-25">
                        18-25
                      </option>
                      <option value="26-35">
                        26-35
                      </option>
                      <option value="36-50">
                        36-50
                      </option>
                      <option value="50+">
                        50+
                      </option>
                    </select>
                  </div>


                  <button
                    onClick={() => {
                      onSentimentChange(
                        ''
                      );
                      onLocationChange(
                        ''
                      );
                      onAgeRangeChange(
                        ''
                      );
                    }}
                    className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>


          <div className="relative">
            <button
              onClick={() => {
                setIsExportOpen(
                  !isExportOpen
                );
                setIsFilterOpen(
                  false
                );
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
            >
              Export
            </button>

            {isExportOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                <button
                  onClick={() => {
                    onExportCSV();
                    setIsExportOpen(
                      false
                    );
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50"
                >
                  Export CSV
                </button>

                <button
                  onClick={() => {
                    onExportJSON();
                    setIsExportOpen(
                      false
                    );
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50"
                >
                  Export JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}