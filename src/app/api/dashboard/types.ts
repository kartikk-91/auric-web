export type ChangeType = "positive" | "negative";

export interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: ChangeType;
}

export interface Testimonial {
  author: string;
  quote: string;
  rating: number;
  location: string;
  date: string;
}

export interface DashboardData {
  userName: string;
  stats: StatCard[];
  ratingDistribution: Record<string, number>;
  sentimentDistribution: {
    Positive: number;
    Neutral: number;
    Negative: number;
  };
  ResponseByLocation: Record<string, number>;
  topPraised: Record<string, number>;
  topCriticized: Record<string, number>;
  totalFeedbacks: number;
  recentTestimonials: Testimonial[];
  formLink: string;
}

export interface DashboardApiResponse {
  success: true;
  data: DashboardData;
}

export interface DashboardApiError {
  success: false;
  error: string;
  code?: string;
}