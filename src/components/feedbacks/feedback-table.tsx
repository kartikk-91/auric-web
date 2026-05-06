// components/FeedbackTable.tsx

import { Feedback } from "@/types/feedback";
import SentimentBadge from "./sentiment-badge";


interface FeedbackTableProps {
  data: Feedback[];
  onSelectFeedback: (feedback: Feedback) => void;
  selectedId?: number;
}

export default function FeedbackTable({ data, onSelectFeedback, selectedId }: FeedbackTableProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getInitialsColor = (name: string) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-yellow-100 text-yellow-700',
      'bg-green-100 text-green-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
      'bg-orange-100 text-orange-700',
      'bg-teal-100 text-teal-700'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Name</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Location</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Age</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Sentiment</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Received</th>
            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 8).map((feedback) => (
            <tr 
              key={feedback.id} 
              className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedId === feedback.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => onSelectFeedback(feedback)}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getInitialsColor(feedback.name)}`}>
                    {getInitials(feedback.name)}
                  </div>
                  <span className="text-gray-900">{feedback.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{feedback.location}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-900">{feedback.age}</td>
              <td className="py-4 px-6">
                <SentimentBadge sentiment={feedback.sentiment} />
              </td>
              <td className="py-4 px-6 text-gray-600 text-sm">{feedback.received}</td>
              <td className="py-4 px-6">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex items-center justify-between py-4 px-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">Showing 1 to 8 of 342 feedbacks</p>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">43</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}