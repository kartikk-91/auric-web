'use client';

import { useEffect, useMemo, useState } from 'react';
import FeedbackHeader from './feedback-header';
import FeedbackStats from './feedback-stats';
import FeedbackTable from './feedback-table';
import FeedbackDetailPanel from './feedback-detail-panel';
import { Feedback } from '@/types/feedback';

const ITEMS_PER_PAGE = 8;

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);

  const [
    selectedFeedback,
    setSelectedFeedback,
  ] = useState<Feedback | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(
      null
    );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [
    isMobileModalOpen,
    setIsMobileModalOpen,
  ] = useState(false);

  const [isDesktop, setIsDesktop] =
    useState(false);


  const [dateRange, setDateRange] =
    useState('All Time');

  const [
    selectedSentiment,
    setSelectedSentiment,
  ] = useState('');

  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState('');

  const [ageRange, setAgeRange] =
    useState('');


  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(
        window.innerWidth >=
        1280
      );
    };

    checkScreen();

    window.addEventListener(
      'resize',
      checkScreen
    );

    return () =>
      window.removeEventListener(
        'resize',
        checkScreen
      );
  }, []);


  useEffect(() => {
    const fetchFeedbacks =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const response =
            await fetch(
              '/api/get/feedbacks'
            );

          if (
            !response.ok
          ) {
            throw new Error(
              'Failed to fetch feedbacks'
            );
          }

          const data =
            await response.json();

          setFeedbacks(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'Something went wrong'
          );
        } finally {
          setLoading(false);
        }
      };

    fetchFeedbacks();
  }, []);


  const filteredFeedbacks =
    useMemo(() => {
      let filtered =
        [...feedbacks];


      if (
        dateRange !==
        'All Time'
      ) {
        const now =
          new Date();

        const days =
          {
            Today: 1,
            'Last 7 Days': 7,
            'Last 30 Days': 30,
            'Last 90 Days': 90,
          }[
          dateRange
          ] ?? 99999;

        filtered =
          filtered.filter(
            (
              feedback
            ) => {
              const parsedDate =
                new Date(
                  feedback.receivedFull
                );

              if (
                isNaN(
                  parsedDate.getTime()
                )
              ) {
                return true;
              }

              const diffInDays =
                (
                  now.getTime() -
                  parsedDate.getTime()
                ) /
                (1000 *
                  60 *
                  60 *
                  24);

              return (
                diffInDays <=
                days
              );
            }
          );
      }


      if (
        selectedSentiment
      ) {
        filtered =
          filtered.filter(
            (
              feedback
            ) =>
              feedback.sentiment ===
              selectedSentiment
          );
      }


      if (
        selectedLocation.trim()
      ) {
        filtered =
          filtered.filter(
            (
              feedback
            ) =>
              feedback.location
                .toLowerCase()
                .includes(
                  selectedLocation.toLowerCase()
                )
          );
      }


      if (
        ageRange
      ) {
        filtered =
          filtered.filter(
            (
              feedback
            ) => {
              const age =
                feedback.age;

              switch (
              ageRange
              ) {
                case '18-25':
                  return (
                    age >=
                    18 &&
                    age <=
                    25
                  );

                case '26-35':
                  return (
                    age >=
                    26 &&
                    age <=
                    35
                  );

                case '36-50':
                  return (
                    age >=
                    36 &&
                    age <=
                    50
                  );

                case '50+':
                  return (
                    age >=
                    50
                  );

                default:
                  return true;
              }
            }
          );
      }

      return filtered;
    }, [
      feedbacks,
      dateRange,
      selectedSentiment,
      selectedLocation,
      ageRange,
    ]);


  const handleExportCSV =
    () => {
      const rows =
        filteredFeedbacks.map(
          (
            feedback
          ) => ({
            Name:
              feedback.name,
            Location:
              feedback.location,
            Age:
              feedback.age,
            Sentiment:
              feedback.sentiment,
            Received:
              feedback.received,
            Feedback:
              feedback.feedback,
          })
        );

      const headers =
        Object.keys(
          rows[0] || {}
        );

      const csv =
        [
          headers.join(','),
          ...rows.map(
            (row) =>
              headers
                .map(
                  (
                    header
                  ) =>
                    `"${String(
                      row[
                      header as keyof typeof row
                      ]
                    ).replace(
                      /"/g,
                      '""'
                    )}"`
                )
                .join(',')
          ),
        ].join('\n');

      const blob =
        new Blob(
          [csv],
          {
            type: 'text/csv;charset=utf-8;',
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          'a'
        );

      link.href =
        url;

      link.download =
        'feedbacks.csv';

      link.click();

      URL.revokeObjectURL(
        url
      );
    };


  const handleExportJSON =
    () => {
      const blob =
        new Blob(
          [
            JSON.stringify(
              filteredFeedbacks,
              null,
              2
            ),
          ],
          {
            type: 'application/json',
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          'a'
        );

      link.href =
        url;

      link.download =
        'feedbacks.json';

      link.click();

      URL.revokeObjectURL(
        url
      );
    };


  useEffect(() => {
    setCurrentPage(1);
  }, [
    dateRange,
    selectedSentiment,
    selectedLocation,
    ageRange,
  ]);

  const totalPages =
    Math.ceil(
      filteredFeedbacks.length /
      ITEMS_PER_PAGE
    );

  const paginatedFeedbacks =
    filteredFeedbacks.slice(
      (currentPage - 1) *
      ITEMS_PER_PAGE,
      currentPage *
      ITEMS_PER_PAGE
    );

  const handleSelectFeedback =
    (
      feedback: Feedback
    ) => {
      setSelectedFeedback(
        feedback
      );

      if (
        !isDesktop
      ) {
        setIsMobileModalOpen(
          true
        );
      }
    };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 animate-pulse">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
          <div>
            <div className="h-9 w-44 bg-gray-200 rounded-lg mb-3" />
            <div className="h-5 w-[320px] bg-gray-100 rounded-lg max-w-full" />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="h-11 w-40 bg-gray-200 rounded-xl" />
            <div className="h-11 w-28 bg-gray-200 rounded-xl" />
            <div className="h-11 w-28 bg-gray-200 rounded-xl" />
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {Array.from({
            length: 4,
          }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
                  <div className="h-8 w-16 bg-gray-300 rounded" />
                </div>

                <div className="w-12 h-12 rounded-xl bg-gray-200" />
              </div>

              <div className="h-4 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>


        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-5">
            <div className="h-5 w-52 bg-gray-200 rounded" />
          </div>

          <div className="divide-y divide-gray-100">
            {Array.from({
              length: 8,
            }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />

                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                  </div>
                </div>

                <div className="hidden md:block h-6 w-24 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="bg-white border border-red-100 rounded-2xl p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load
            feedback
          </h2>

          <p className="text-gray-500 mb-6">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-0 py-6 lg:py-8">
        <FeedbackHeader
          dateRange={
            dateRange
          }
          onDateRangeChange={
            setDateRange
          }
          selectedSentiment={
            selectedSentiment
          }
          onSentimentChange={
            setSelectedSentiment
          }
          selectedLocation={
            selectedLocation
          }
          onLocationChange={
            setSelectedLocation
          }
          ageRange={
            ageRange
          }
          onAgeRangeChange={
            setAgeRange
          }
          onExportCSV={
            handleExportCSV
          }
          onExportJSON={
            handleExportJSON
          }
        />

        <FeedbackStats
          data={
            filteredFeedbacks
          }
        />

        <div className="relative flex flex-col xl:flex-row gap-6">
          <div className="min-w-0 flex-1">
            <FeedbackTable
              data={
                paginatedFeedbacks
              }
              totalItems={
                filteredFeedbacks.length
              }
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              onPageChange={
                setCurrentPage
              }
              onSelectFeedback={
                handleSelectFeedback
              }
              selectedId={
                selectedFeedback?.id
              }
            />
          </div>

          {isDesktop &&
            selectedFeedback && (
              <FeedbackDetailPanel
                feedback={
                  selectedFeedback
                }
                onClose={() =>
                  setSelectedFeedback(
                    null
                  )
                }
              />
            )}
        </div>
      </div>

      {!isDesktop &&
        isMobileModalOpen &&
        selectedFeedback && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-3xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <FeedbackDetailPanel
                feedback={
                  selectedFeedback
                }
                onClose={() =>
                  setIsMobileModalOpen(
                    false
                  )
                }
              />
            </div>
          </div>
        )}
    </>
  );
}