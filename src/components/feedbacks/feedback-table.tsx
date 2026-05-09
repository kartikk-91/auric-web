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
  selectedId?: number;
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
        if (
          tableRef.current
        ) {
          setTableWidth(
            tableRef.current
              .offsetWidth
          );
        }
      });

    observer.observe(
      tableRef.current
    );

    setTableWidth(
      tableRef.current
        .offsetWidth
    );

    return () =>
      observer.disconnect();
  }, []);

  const showLocation =
    tableWidth > 600;

  const showAge =
    tableWidth > 760;

  const showReceived =
    tableWidth > 920;

  const showActions =
    tableWidth > 1100;

  const getInitials = (
    name: string
  ) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

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
    const range = [];

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
      range.push(i);
    }

    return range;
  };

  return (
    <div
      ref={tableRef}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden min-w-0"
    >
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-gray-200">

            <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
              Name
            </th>


            {showLocation && (
              <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
                Location
              </th>
            )}


            {showAge && (
              <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
                Age
              </th>
            )}


            <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
              Sentiment
            </th>


            {showReceived && (
              <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
                Received
              </th>
            )}


            {showActions && (
              <th className="text-left py-4 px-3 sm:px-4 lg:px-6 text-sm font-medium text-gray-600">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map(
            (feedback) => (
              <tr
                key={
                  feedback.id
                }
                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedId ===
                  feedback.id
                    ? 'bg-blue-50'
                    : ''
                }`}
                onClick={() =>
                  onSelectFeedback(
                    feedback
                  )
                }
              >

                <td className="py-4 px-3 sm:px-4 lg:px-6 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${getInitialsColor(
                        feedback.name
                      )}`}
                    >
                      {getInitials(
                        feedback.name
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-gray-900 font-medium truncate">
                        {
                          feedback.name
                        }
                      </p>

                      {!showLocation && (
                        <p className="text-xs text-gray-500 truncate">
                          {
                            feedback.location
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </td>


                {showLocation && (
                  <td className="py-4 px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center gap-2 text-gray-600 min-w-0">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={
                            2
                          }
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="text-sm truncate">
                        {
                          feedback.location
                        }
                      </span>
                    </div>
                  </td>
                )}


                {showAge && (
                  <td className="py-4 px-3 sm:px-4 lg:px-6 text-gray-900 whitespace-nowrap">
                    {
                      feedback.age
                    }
                  </td>
                )}


                <td className="py-4 px-3 sm:px-4 lg:px-6">
                  <SentimentBadge
                    sentiment={
                      feedback.sentiment
                    }
                  />
                </td>


                {showReceived && (
                  <td className="py-4 px-3 sm:px-4 lg:px-6 text-gray-600 text-sm whitespace-nowrap">
                    {
                      feedback.received
                    }
                  </td>
                )}


                {showActions && (
                  <td className="py-4 px-3 sm:px-4 lg:px-6">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>


      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4 px-4 lg:px-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing{' '}
          {(currentPage - 1) *
            ITEMS_PER_PAGE +
            1}{' '}
          to{' '}
          {Math.min(
            currentPage *
              ITEMS_PER_PAGE,
            totalItems
          )}{' '}
          of {totalItems}{' '}
          feedbacks
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onPageChange(
                currentPage - 1
              )
            }
            disabled={
              currentPage ===
              1
            }
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
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
                className={`w-8 h-8 rounded border text-sm ${
                  currentPage ===
                  page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              onPageChange(
                currentPage + 1
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}