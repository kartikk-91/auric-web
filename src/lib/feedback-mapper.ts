import { Prisma } from "@/generated/prisma/client";
import { parseFeedbackData } from "@/lib/feedback-parser";
import type { Feedback, Sentiment } from "@/types/feedback";
export type FeedbackWithRelations = {
  f_id: string;
  formId: string;
  name: string;
  email: string;
  age: number;
  data: unknown;
  state: string;
  country: string;
  createdAt: Date;
  processingStatus: Feedback["processingStatus"];
  result: {
    country?: string | null;
    state?: string | null;
    formattedLocation?: string | null;
    countryFlag?: string | null;
    sentiment?: string | null;
    sentimentScore?: number | null;
    rating?: number | null;
    summary?: string | null;
    testimonial?: string | null;
    praisedFeatures?: unknown;
    criticizedFeatures?: unknown;
    confidence?: number | null;
  } | null;
};

export function capitalizeSentiment(sentiment?: string | null): Sentiment {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "Positive";
    case "negative":
      return "Negative";
    default:
      return "Neutral";
  }
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} week${diff >= 14 ? "s" : ""} ago`;
  if (diff < 365) return `${Math.floor(diff / 30)} month${diff >= 60 ? "s" : ""} ago`;
  return `${Math.floor(diff / 365)} year${diff >= 730 ? "s" : ""} ago`;
}

export function mapFeedbackRecord(feedback: FeedbackWithRelations): Feedback {
  const parsed = parseFeedbackData(feedback.data as Prisma.JsonValue);

  return {
    id: feedback.f_id,
    formId: feedback.formId,
    name: feedback.name,
    email: feedback.email,
    age: feedback.age,
    feedback: parsed.feedback,
    responses: parsed.responses,
    createdAt: feedback.createdAt.toISOString(),
    received: getRelativeTime(feedback.createdAt),
    receivedFull: feedback.createdAt.toLocaleString(),
    processingStatus: feedback.processingStatus,

    location: {
      country: feedback.result?.country ?? feedback.country,
      state: feedback.result?.state ?? feedback.state,
      formatted:
        feedback.result?.formattedLocation ?? `${feedback.state}, ${feedback.country}`,
      flag: feedback.result?.countryFlag ?? undefined,
    },

    analysis: {
      sentiment: capitalizeSentiment(feedback.result?.sentiment),
      sentimentScore: feedback.result?.sentimentScore ?? 0,
      rating: feedback.result?.rating ?? parsed.rating,
      summary: feedback.result?.summary ?? "",
      testimonial: feedback.result?.testimonial ?? "",
      praisedFeatures: Array.isArray(feedback.result?.praisedFeatures)
        ? (feedback.result?.praisedFeatures as string[])
        : [],
      criticizedFeatures: Array.isArray(feedback.result?.criticizedFeatures)
        ? (feedback.result?.criticizedFeatures as string[])
        : [],
      confidence: feedback.result?.confidence ?? 0,
    },
  };
}