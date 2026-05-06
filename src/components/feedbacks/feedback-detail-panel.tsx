// components/FeedbackDetailPanel.tsx
'use client';

import { Feedback } from "@/types/feedback";
import SentimentBadge from "./sentiment-badge";



interface FeedbackDetailPanelProps {
  feedback: Feedback;
  onClose: () => void;
}

export default function FeedbackDetailPanel({ feedback, onClose }: FeedbackDetailPanelProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="absolute top-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl h-full rounded-r-xl">
      <div className="p-6">
    
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-lg font-medium">
              {getInitials(feedback.name)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{feedback.location}</span>
                <span>•</span>
                <span>{feedback.age} years old</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SentimentBadge sentiment={feedback.sentiment} />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>


        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Feedback</h4>
          <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
        </div>

  
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Received</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{feedback.receivedFull}</span>
          </div>
        </div>


        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Additional Info</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Source</span>
              <span className="text-gray-900">{feedback.additionalInfo.source}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Form Name</span>
              <span className="text-gray-900">{feedback.additionalInfo.formName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Device</span>
              <span className="text-gray-900">{feedback.additionalInfo.device}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Browser</span>
              <span className="text-gray-900">{feedback.additionalInfo.browser}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">IP Address</span>
              <span className="text-gray-900">{feedback.additionalInfo.ipAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}