'use client';

import { useEffect, useRef, useState } from 'react';

import FeedbackHeader from './feedback-header';
import FeedbackStats from './feedback-stats';
import FeedbackTable from './feedback-table';
import FeedbackDetailPanel from './feedback-detail-panel';

import { Feedback } from '@/types/feedback';

const ITEMS_PER_PAGE = 8;
const LOCATION_DEBOUNCE_MS = 350;

interface FeedbackStatsData {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface FeedbackListResponse {
  data: Feedback[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  stats: FeedbackStatsData;
}

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<FeedbackStatsData>({
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const hasLoadedOnce = useRef(false);

  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [dateRange, setDateRange] = useState('All Time');
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [debouncedLocation, setDebouncedLocation] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1280);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedLocation(selectedLocation);
    }, LOCATION_DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [selectedLocation]);
  useEffect(() => {
    setCurrentPage(1);
  }, [dateRange, selectedSentiment, debouncedLocation, ageRange]);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchFeedbacks() {
      try {
        if (!hasLoadedOnce.current) {
          setIsInitialLoading(true);
        } else {
          setIsFetching(true);
        }
        setError(null);

        const params = new URLSearchParams({
          page: String(currentPage),
          pageSize: String(ITEMS_PER_PAGE),
          dateRange,
        });

        if (selectedSentiment) params.set('sentiment', selectedSentiment);
        if (debouncedLocation) params.set('location', debouncedLocation);
        if (ageRange) params.set('ageRange', ageRange);

        const response = await fetch(`/api/get/feedbacks?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks.');
        }

        const json: FeedbackListResponse = await response.json();

        setFeedbacks(json.data);
        setTotal(json.total);
        setTotalPages(json.totalPages);
        setStats(json.stats);
        hasLoadedOnce.current = true;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;

        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setIsInitialLoading(false);
        setIsFetching(false);
      }
    }

    fetchFeedbacks();

    return () => controller.abort();
  }, [currentPage, dateRange, selectedSentiment, debouncedLocation, ageRange]);
  const buildExportParams = () => {
    const params = new URLSearchParams({ dateRange });

    if (selectedSentiment) params.set('sentiment', selectedSentiment);
    if (debouncedLocation) params.set('location', debouncedLocation);
    if (ageRange) params.set('ageRange', ageRange);

    return params;
  };

  const triggerExport = async (format: 'csv' | 'json') => {
    if (isExporting) return;

    try {
      setIsExporting(true);

      const params = buildExportParams();
      params.set('format', format);

      const url = `/api/get/feedbacks/export?${params.toString()}`;
      const link = document.createElement('a');
      link.href = url;
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCSV = () => triggerExport('csv');
  const handleExportJSON = () => triggerExport('json');

  const handleSelectFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);

    if (!isDesktop) {
      setIsMobileModalOpen(true);
    }
  };

  if (isInitialLoading) {
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
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-4 w-28 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-20 bg-gray-300 rounded mb-3" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-6 border-b border-gray-100">
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
          <h2 className="text-xl font-semibold text-gray-900">Failed to load feedback</h2>
          <p className="mt-2 text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
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
          totalFeedbacks={total}
        />

        <div className="h-0.5 -mt-2 mb-4 rounded-full overflow-hidden bg-transparent">
          {isFetching && (
            <div className="h-full w-full bg-blue-100 relative overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-1/3 bg-blue-500 rounded-full animate-[loading-bar_1s_ease-in-out_infinite]" />
            </div>
          )}
        </div>

        <div
          className={`transition-opacity duration-150 ${
            isFetching ? 'opacity-60 pointer-events-none' : 'opacity-100'
          }`}
          aria-busy={isFetching}
        >
          <FeedbackStats data={stats} />

          <div className="relative flex flex-col xl:flex-row gap-6">

            <div className="flex-1 min-w-0">
              <FeedbackTable
                data={feedbacks}
                totalItems={total}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onSelectFeedback={handleSelectFeedback}
                selectedId={selectedFeedback?.id}
              />
            </div>

            {isDesktop && selectedFeedback && (
              <FeedbackDetailPanel
                feedback={selectedFeedback}
                onClose={() => setSelectedFeedback(null)}
              />
            )}
          </div>
        </div>
      </div>

      {!isDesktop && isMobileModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl sm:rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <FeedbackDetailPanel
              feedback={selectedFeedback}
              onClose={() => setIsMobileModalOpen(false)}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            left: -33%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </>
  );
}