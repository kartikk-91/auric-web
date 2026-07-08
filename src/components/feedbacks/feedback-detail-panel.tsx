'use client';

import { Feedback } from "@/types/feedback";
import SentimentBadge from "./sentiment-badge";

interface FeedbackDetailPanelProps {
  feedback: Feedback;
  onClose: () => void;
}

export default function FeedbackDetailPanel({
  feedback,
  onClose,
}: FeedbackDetailPanelProps) {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("");

  const renderResponse = (answer: string | number | string[]) => {
    if (Array.isArray(answer)) {
      return (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {answer.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      );
    }

    return <p className="mt-2 text-sm text-gray-900">{answer}</p>;
  };

  const FeatureChip = ({
    value,
    positive = true,
  }: {
    value: string;
    positive?: boolean;
  }) => (
    <span
      className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${
        positive
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {value}
    </span>
  );
  const StarRating = ({ rating }: { rating?: number }) => {
    if (!rating) {
      return (
        <span className="text-xs sm:text-sm text-gray-400">No rating given</span>
      );
    }

    return (
      <div className="flex items-center gap-0.5" title={`${rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-200 fill-current"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.889a1 1 0 00-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.889a1 1 0 00-1.176 0l-3.976 2.889c-.783.57-1.838-.197-1.539-1.118l1.52-4.674a1 1 0 00-.364-1.118L.077 8.101c-.783-.57-.38-1.81.588-1.81H5.58a1 1 0 00.95-.69L8.049.927z" />
          </svg>
        ))}
        <span className="ml-1.5 text-xs sm:text-sm font-medium text-gray-700">
          {rating}/5
        </span>
      </div>
    );
  };

  return (
    <div className="w-full xl:w-[380px] xl:h-[700px] bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
   
      <div className="shrink-0 border-b border-gray-100 p-4 sm:p-5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm sm:text-base font-semibold shrink-0">
              {getInitials(feedback.name)}
            </div>

            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                {feedback.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {feedback.location.flag} {feedback.location.formatted} · {feedback.age}y
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-50"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4 flex-wrap">
          <SentimentBadge sentiment={feedback.analysis.sentiment} />
          <StarRating rating={feedback.analysis.rating} />
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
            AI Summary
          </h3>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 sm:p-4">
            <p className="text-sm leading-6 text-blue-900">
              {feedback.analysis.summary || "No summary available."}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
            Original Feedback
          </h3>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
            <p className="text-sm leading-6 text-gray-700">{feedback.feedback}</p>
          </div>
        </section>

        {feedback.analysis.testimonial && (
          <section>
            <h3 className="text-xs sm:text-sm font-semibold text-green-700 mb-2">
              ✨ Suggested Testimonial
            </h3>

            <div className="rounded-lg border border-green-100 bg-green-50 p-3 sm:p-4">
              <p className="text-sm italic leading-6 text-green-900">
                "{feedback.analysis.testimonial}"
              </p>
            </div>
          </section>
        )}

        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
            Praised Features
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {feedback.analysis.praisedFeatures.length ? (
              feedback.analysis.praisedFeatures.map((feature) => (
                <FeatureChip key={feature} value={feature} />
              ))
            ) : (
              <p className="text-gray-500 text-xs sm:text-sm">No highlighted strengths.</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
            Improvement Areas
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {feedback.analysis.criticizedFeatures.length ? (
              feedback.analysis.criticizedFeatures.map((feature) => (
                <FeatureChip key={feature} value={feature} positive={false} />
              ))
            ) : (
              <div className="rounded-md bg-green-50 text-green-700 px-3 py-1.5 text-xs sm:text-sm">
                🎉 No major concerns identified.
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">
            Customer Responses
          </h3>

          <div className="space-y-4">
            {feedback.responses.map((response, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">
                  {response.question}
                </p>

                {renderResponse(response.answer)}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3">
            Submission Details
          </h3>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900 truncate">{feedback.email}</span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Submitted</span>
              <span className="font-medium text-gray-900">{feedback.receivedFull}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}