"use client";

import { Info } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboard } from "@/providers/dashboard-provider";

export default function RatingDistribution() {
  const { dashboardData } = useDashboard();

  const distribution =
    dashboardData?.ratingDistribution || {};

  const data = [
    { rating: "1★", value: distribution["1"] || 0 },
    { rating: "2★", value: distribution["2"] || 0 },
    { rating: "3★", value: distribution["3"] || 0 },
    { rating: "4★", value: distribution["4"] || 0 },
    { rating: "5★", value: distribution["5"] || 0 },
  ];

  return (
    <div className="rounded-lg border bg-white p-4 sm:p-5 md:p-6 h-full flex flex-col">
  <div className="mb-4 flex items-center gap-2 shrink-0">
    <h3 className="text-sm font-semibold text-gray-900">
      Rating Distribution
    </h3>

    <Info className="h-4 w-4 text-gray-400" />
  </div>

 
  <div className="flex-1 min-h-[250px]">
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="rating"
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
        />

        <Tooltip />

        <Bar
          dataKey="value"
          radius={[8, 8, 0, 0]}
          fill="#2563eb"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
  );
}