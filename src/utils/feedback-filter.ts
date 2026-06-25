import { Feedback } from "@/types/feedback";

interface FilterOptions {
  dateRange: string;
  sentiment: string;
  location: string;
  ageRange: string;
}

export function filterFeedbacks(
  feedbacks: Feedback[],
  {
    dateRange,
    sentiment,
    location,
    ageRange,
  }: FilterOptions
) {
  let filtered = [...feedbacks];

  // Date Filter
  if (dateRange !== "All Time") {
    const now = new Date();

    const days =
      {
        Today: 1,
        "Last 7 Days": 7,
        "Last 30 Days": 30,
        "Last 90 Days": 90,
      }[dateRange] ?? Number.MAX_SAFE_INTEGER;

    filtered = filtered.filter((feedback) => {
      const created = new Date(feedback.createdAt);

      if (isNaN(created.getTime())) {
        return true;
      }

      const diff =
        (now.getTime() - created.getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= days;
    });
  }

  // Sentiment
  if (sentiment) {
    filtered = filtered.filter(
      (feedback) =>
        feedback.analysis.sentiment === sentiment
    );
  }

  // Location
  if (location.trim()) {
    const search = location.toLowerCase();

    filtered = filtered.filter((feedback) => {
      return (
        feedback.location.formatted
          .toLowerCase()
          .includes(search) ||
        feedback.location.country
          .toLowerCase()
          .includes(search) ||
        feedback.location.state
          .toLowerCase()
          .includes(search)
      );
    });
  }

  // Age
  if (ageRange) {
    filtered = filtered.filter((feedback) => {
      switch (ageRange) {
        case "18-25":
          return (
            feedback.age >= 18 &&
            feedback.age <= 25
          );

        case "26-35":
          return (
            feedback.age >= 26 &&
            feedback.age <= 35
          );

        case "36-50":
          return (
            feedback.age >= 36 &&
            feedback.age <= 50
          );

        case "50+":
          return feedback.age >= 50;

        default:
          return true;
      }
    });
  }

  return filtered;
}