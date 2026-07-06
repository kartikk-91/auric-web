'use client';

import { useEffect, useRef, useState } from 'react';
import { Feedback } from '@/types/feedback';
import SentimentBadge from './sentiment-badge';

interface FeedbackTableProps {
  data: Feedback[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectFeedback: (
    feedback: Feedback
  ) => void;
  selectedId?: string;
}

const ITEMS_PER_PAGE = 8;

export default function FeedbackTable({
  data,
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
  onSelectFeedback,
  selectedId,
}: FeedbackTableProps) {
  const tableRef =
    useRef<HTMLDivElement>(null);

  const [tableWidth, setTableWidth] =
    useState(0);

  useEffect(() => {
    if (!tableRef.current) return;

    const observer =
      new ResizeObserver(() => {
        if (tableRef.current) {
          setTableWidth(
            tableRef.current.offsetWidth
          );
        }
      });

    observer.observe(tableRef.current);

    setTableWidth(
      tableRef.current.offsetWidth
    );

    return () =>
      observer.disconnect();
  }, []);

  const showRating =
    tableWidth > 620;

  const showSummary =
    tableWidth > 850;

  const showReceived =
    tableWidth > 1050;

  const showActions =
    tableWidth > 1180;

  const getInitials = (
    name: string
  ) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('');

  const getInitialsColor = (
    name: string
  ) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-yellow-100 text-yellow-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
      'bg-orange-100 text-orange-700',
      'bg-teal-100 text-teal-700',
    ];

    return colors[
      name.charCodeAt(0) %
      colors.length
    ];
  };

  const getVisiblePages = () => {
    const delta = 1;

    const pages = [];

    const start = Math.max(
      1,
      currentPage - delta
    );

    const end = Math.min(
      totalPages,
      currentPage + delta
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const renderRating = (
    rating?: number
  ) => {
    if (!rating)
      return (
        <span className="text-gray-400">
          —
        </span>
      );

    return (
      <div className="flex items-center gap-1">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating
              ? 'text-yellow-400 fill-current'
              : 'text-gray-200'
              }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.889a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.889a1 1 0 00-1.176 0l-3.976 2.889c-.783.57-1.838-.197-1.539-1.118l1.52-4.674a1 1 0 00-.364-1.118L.077 8.101c-.783-.57-.38-1.81.588-1.81H5.58a1 1 0 00.95-.69L8.049.927z" />
          </svg>
        ))}
      </div>
    );
  };

  if (!data.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-5">

          <svg
            className="w-7 h-7 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>

        </div>

        <h3 className="text-lg font-semibold text-gray-900">
          No feedback found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing the filters or collect more customer feedback.
        </p>
      </div>
    );
  }



   return (
    <div
      ref={tableRef}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden min-w-0"
    >
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/70">
            <th className="text-left py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600">
              Customer
            </th>

            {showRating && (
              <th className="text-left py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600">
                Rating
              </th>
            )}

            <th className="text-left py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600">
              Sentiment
            </th>

            {showSummary && (
              <th className="text-left py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600">
                AI Summary
              </th>
            )}

            {showReceived && (
              <th className="text-left py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600 whitespace-nowrap">
                Submitted
              </th>
            )}

            {showActions && (
              <th className="text-right py-4 px-4 lg:px-6 text-sm font-semibold text-gray-600">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((feedback) => (
            <tr
              key={feedback.id}
              onClick={() =>
                onSelectFeedback(feedback)
              }
              className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedId === feedback.id
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              
              <td className="py-4 px-4 lg:px-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${getInitialsColor(
                      feedback.name
                    )}`}
                  >
                    {getInitials(
                      feedback.name
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {feedback.name}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {
                        feedback
                          .location
                          .formatted
                      }
                    </p>
                  </div>
                </div>
              </td>

              
              {showRating && (
                <td className="py-4 px-4 lg:px-6">
                  {renderRating(
                    feedback.analysis
                      .rating
                  )}
                </td>
              )}

              
              <td className="py-4 px-4 lg:px-6">
                <SentimentBadge
                  sentiment={
                    feedback
                      .analysis
                      .sentiment
                  }
                />
              </td>

              
              {showSummary && (
                <td className="py-4 px-4 lg:px-6 max-w-sm">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {feedback.analysis
                      .summary ||
                      "No AI summary available."}
                  </p>
                </td>
              )}

              
              {showReceived && (
                <td className="py-4 px-4 lg:px-6 text-sm text-gray-600 whitespace-nowrap">
                  {
                    feedback.received
                  }
                </td>
              )}

              
              {showActions && (
                <td className="py-4 px-4 lg:px-6 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFeedback(
                        feedback
                      );
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View →
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 px-5 border-t border-gray-200">

        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {(currentPage - 1) *
              ITEMS_PER_PAGE +
              1}
          </span>{" "}
          –
          <span className="font-medium text-gray-900">
            {Math.min(
              currentPage *
                ITEMS_PER_PAGE,
              totalItems
            )}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900">
            {totalItems}
          </span>{" "}
          responses
        </p>

        <div className="flex items-center gap-2">

          <button
            disabled={
              currentPage === 1
            }
            onClick={() =>
              onPageChange(
                currentPage - 1
              )
            }
            className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
          >
            ←
          </button>

          {getVisiblePages().map(
            (page) => (
              <button
                key={page}
                onClick={() =>
                  onPageChange(
                    page
                  )
                }
                className={`w-9 h-9 rounded-lg text-sm transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            disabled={
              currentPage ===
              totalPages
            }
            onClick={() =>
              onPageChange(
                currentPage + 1
              )
            }
            className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}