"use client";

import {
  MessageSquare,
  Star,
  Brain,
  TrendingUp
} from "lucide-react";

import StatCard from "./stat-card";
import CustomerSignal from "./customer-signal";
import RecentTestimonials from "./recent-testimonials";
import RatingDistribution from "./rating-distribution";
import SentimentChart from "./sentiment-chart";
import ResponsesByLocation from "./response-location";

import {useDashboard} from "@/providers/dashboard-provider";

export default function DashboardContent() {
  const { dashboardData } =
    useDashboard();

  const stats =
    dashboardData?.stats ||
    [];

  return (
    <div className="min-h-screen h-fit md:h-screen bg-gray-50 p-6 md:overflow-y-scroll">
      <div className="max-w-7xl h-fit mx-auto space-y-6">
        <div className="h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={
              stats[0]?.title ||
              "Testimonials"
            }
            value={
              stats[0]?.value ||
              "0"
            }
            change={`${stats[0]?.change || "0%"} vs last 30 days`}
            icon={
              <MessageSquare className="w-5 h-5 text-blue-500" />
            }
            iconBgColor="bg-blue-50"
          />

          <StatCard
            title={
              stats[1]?.title ||
              "Avg. Rating"
            }
            value={
              stats[1]?.value ||
              "0"
            }
            change={`${stats[1]?.change || "0%"} vs last 30 days`}
            icon={
              <Star className="w-5 h-5 text-yellow-500" />
            }
            iconBgColor="bg-yellow-50"
          />

          <StatCard
            title={
              stats[2]?.title ||
              "Avg. Sentiment"
            }
            value={
              stats[2]?.value ||
              "0%"
            }
            change={`${stats[2]?.change || "0%"} vs last 30 days`}
            icon={
              <Brain className="w-5 h-5 text-purple-500" />
            }
            iconBgColor="bg-purple-50"
          />

          <StatCard
            title={
              stats[3]?.title ||
              "Auric Score"
            }
            value={
              stats[3]?.value ||
              "0"
            }
            change={`${stats[3]?.change || "0%"} vs last 30 days`}
            icon={
              <TrendingUp className="w-5 h-5 text-green-500" />
            }
            iconBgColor="bg-green-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-fit">
          <RatingDistribution />
          <CustomerSignal />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTestimonials />
          <SentimentChart />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ResponsesByLocation />
        </div>

        <div className="h-24 w-full" />
      </div>
    </div>
  );
}