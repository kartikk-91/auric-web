import { Prisma } from "@/generated/prisma/client";


export interface ParsedFeedback {
  feedback: string;
  rating?: number;
  nps?: number;
  responses: {
    question: string;
    answer: string | number | string[];
    type: string;
  }[];
}

type Question = {
  type: string;
  question: string;
  answer: string | number | string[];
};

export function parseFeedbackData(
  data: Prisma.JsonValue
): ParsedFeedback {
  const parsed: ParsedFeedback = {
    feedback: "",
    rating: undefined,
    nps: undefined,
    responses: [],
  };

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return parsed;
  }

  Object.values(data as Record<string, Question>).forEach(
    (item) => {
      parsed.responses.push({
        question: item.question,
        answer: item.answer,
        type: item.type,
      });

      switch (item.type) {
        case "short-answer":
          if (!parsed.feedback) {
            parsed.feedback = String(item.answer);
          }
          break;

        case "rating":
          parsed.rating = Number(item.answer);
          break;

        case "nps":
          parsed.nps = Number(item.answer);
          break;
      }
    }
  );

  return parsed;
}