'use client';

import { useEffect, useMemo, useState } from 'react';

import FeedbackHeader from './feedback-header';
import FeedbackStats from './feedback-stats';
import FeedbackTable from './feedback-table';
import FeedbackDetailPanel from './feedback-detail-panel';

import { Feedback } from '@/types/feedback';

import { filterFeedbacks } from '@/utils/feedback-filter';
import {
  exportFeedbackCSV,
  exportFeedbackJSON,
} from '@/utils/feedback-export';

const ITEMS_PER_PAGE = 8;

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);

  const [
    selectedFeedback,
    setSelectedFeedback,
  ] =
    useState<Feedback | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

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
    const checkScreen = () =>
      setIsDesktop(
        window.innerWidth >= 1280
      );

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
    async function fetchFeedbacks() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          '/api/get/feedbacks'
        );

        if (!response.ok) {
          throw new Error(
            'Failed to fetch feedbacks.'
          );
        }

        const data: Feedback[] =
          await response.json();

        setFeedbacks(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong.'
        );
      } finally {
        setLoading(false);
      }
    }

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks =
    useMemo(
      () =>
        filterFeedbacks(feedbacks, {
          dateRange,
          sentiment:
            selectedSentiment,
          location:
            selectedLocation,
          ageRange,
        }),
      [
        feedbacks,
        dateRange,
        selectedSentiment,
        selectedLocation,
        ageRange,
      ]
    );

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

  const handleExportCSV = () =>
    exportFeedbackCSV(
      filteredFeedbacks
    );

  const handleExportJSON = () =>
    exportFeedbackJSON(
      filteredFeedbacks
    );

  const handleSelectFeedback = (
    feedback: Feedback
  ) => {
    setSelectedFeedback(feedback);

    if (!isDesktop) {
      setIsMobileModalOpen(true);
    }
  };
  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 animate-pulse">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-8">
          <div>
            <div className="h-9 w-44 bg-gray-200 rounded-lg mb-3" />
            <div className="h-5 w-72 bg-gray-100 rounded-lg" />
          </div>

          <div className="flex gap-3">
            <div className="h-11 w-40 bg-gray-200 rounded-xl" />
            <div className="h-11 w-28 bg-gray-200 rounded-xl" />
            <div className="h-11 w-28 bg-gray-200 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-20 bg-gray-300 rounded mb-3" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-6 border-b border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="h-4 w-36 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>
              </div>

              <div className="h-5 w-24 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-red-100 rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Failed to load feedback
          </h2>

          <p className="mt-2 text-gray-500">
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedSentiment={selectedSentiment}
          onSentimentChange={setSelectedSentiment}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          ageRange={ageRange}
          onAgeRangeChange={setAgeRange}
          onExportCSV={handleExportCSV}
          onExportJSON={handleExportJSON}
          totalFeedbacks={filteredFeedbacks.length}
        />

        <FeedbackStats
          data={filteredFeedbacks}
        />

        <div className="relative flex flex-col xl:flex-row gap-6">

          <div className="flex-1 min-w-0">
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