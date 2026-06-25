export type Sentiment =
  | "Positive"
  | "Neutral"
  | "Negative";

export type ProcessingStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export interface FeedbackResponse {
  question: string;
  answer: string | number | string[];
  type: string;
}

export interface Feedback {
  // Feedback
  id: string;
  formId: string;

  name: string;
  email: string;

  age: number;

  feedback: string;

  createdAt: string;

  received: string;
  receivedFull: string;

  processingStatus: ProcessingStatus;

  location: {
    country: string;
    state: string;
    formatted: string;
    flag?: string;
  };

  analysis: {
    sentiment: Sentiment;
    sentimentScore: number;

    rating?: number;

    summary: string;
    testimonial: string;

    praisedFeatures: string[];
    criticizedFeatures: string[];

    confidence: number;
  };

  responses: FeedbackResponse[];
}