export type FeedbackTheme = {
  id: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  percentage: number;
  count: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  themes?: FeedbackTheme[];
  timestamp: string;
};

export type ChatSession = {
  id: string;
  title: string;
  time: string;
  group: "Today" | "Yesterday" | "May 3";
  active?: boolean;
};

export const DUMMY_THEMES: FeedbackTheme[] = [
  {
    id: "1",
    icon: "😊",
    color: "bg-green-100 text-green-600",
    title: "Ease of use",
    description: "Users love how simple and intuitive Auric is to use.",
    percentage: 24,
    count: 82,
  },
  {
    id: "2",
    icon: "⏱",
    color: "bg-blue-100 text-blue-600",
    title: "Saves time",
    description: "Users highlight time savings in collecting and managing testimonials.",
    percentage: 18,
    count: 61,
  },
  {
    id: "3",
    icon: "💜",
    color: "bg-purple-100 text-purple-600",
    title: "Great support",
    description: "Fast and helpful support leaves a strong impression.",
    percentage: 14,
    count: 48,
  },
  {
    id: "4",
    icon: "⭐",
    color: "bg-yellow-100 text-yellow-600",
    title: "Feature requests",
    description: "Users suggest new features and improvements.",
    percentage: 12,
    count: 41,
  },
  {
    id: "5",
    icon: "⚠️",
    color: "bg-red-100 text-red-600",
    title: "Pricing",
    description: "Feedback related to pricing and plan comparisons.",
    percentage: 10,
    count: 35,
  },
];

export const CHAT_SESSIONS: ChatSession[] = [
  { id: "1", title: "Summary of feedback this month", time: "10:30 AM", group: "Today", active: true },
  { id: "2", title: "Top positive feedback themes", time: "9:15 AM", group: "Today" },
  { id: "3", title: "What users love most?", time: "8:45 AM", group: "Today" },
  { id: "4", title: "Common user pain points", time: "Yesterday", group: "Yesterday" },
  { id: "5", title: "Feature requests overview", time: "Yesterday", group: "Yesterday" },
  { id: "6", title: "Support related feedback", time: "May 3", group: "May 3" },
  { id: "7", title: "Compare ratings over time", time: "May 3", group: "May 3" },
];

export const SUGGESTED_QUESTIONS = [
  "What are the top themes users are talking about in their feedback?",
  "Show me negative feedback trends",
  "Which features get the most praise?",
  "Summarize feedback from last week",
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hi Kartik! 👋\nI'm Auric, your AI assistant. Ask me anything about your feedback.",
    timestamp: "",
  },
  {
    id: "q1",
    role: "user",
    content: "What are the top themes users are talking about in their feedback?",
    timestamp: "10:30 AM",
  },
  {
    id: "a1",
    role: "assistant",
    content: "Here are the top themes users are talking about in their feedback:",
    themes: DUMMY_THEMES,
    timestamp: "10:30 AM",
  },
];

export const BOT_RESPONSES: Record<string, ChatMessage> = {
  default: {
    id: "",
    role: "assistant",
    content: "I found some insights based on your feedback data. Here are the top themes users are talking about:",
    themes: DUMMY_THEMES,
    timestamp: "",
  },
  pain: {
    id: "",
    role: "assistant",
    content: "Here are the most common pain points users have reported:",
    themes: [
      { id: "p1", icon: "😤", color: "bg-red-100 text-red-600", title: "Slow load times", description: "Users report pages taking too long to load.", percentage: 22, count: 74 },
      { id: "p2", icon: "🔒", color: "bg-orange-100 text-orange-600", title: "Login issues", description: "Users struggle with authentication and session expiry.", percentage: 17, count: 58 },
      { id: "p3", icon: "📱", color: "bg-yellow-100 text-yellow-600", title: "Mobile experience", description: "Mobile layout feels cramped and hard to navigate.", percentage: 13, count: 44 },
    ],
    timestamp: "",
  },
};