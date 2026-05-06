// types/feedback.ts
export interface Feedback {
  id: number;
  name: string;
  location: string;
  age: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  received: string;
  receivedFull: string;
  feedback: string;
  additionalInfo: {
    source: string;
    formName: string;
    device: string;
    browser: string;
    ipAddress: string;
  };
}