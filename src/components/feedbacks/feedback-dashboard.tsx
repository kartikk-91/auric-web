
'use client';

import { useState } from 'react';
import FeedbackHeader from './feedback-header';
import FeedbackStats from './feedback-stats';
import { feedbackData } from '@/data/feedback-data';
import FeedbackTable from './feedback-table';
import FeedbackDetailPanel from './feedback-detail-panel';
import { Feedback } from '@/types/feedback';


export default function FeedbackDashboard() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <FeedbackHeader />
      <FeedbackStats data={feedbackData} />
      <div className="relative">
        <FeedbackTable
          data={feedbackData} 
          onSelectFeedback={setSelectedFeedback}
          selectedId={selectedFeedback?.id}
        />
        {selectedFeedback && (
          <FeedbackDetailPanel 
            feedback={selectedFeedback} 
            onClose={() => setSelectedFeedback(null)}
          />
        )}
      </div>
    </div>
  );
}