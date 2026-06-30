"use client";

import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/providers/dashboard-provider";

interface SentimentSlice {
  key: string;
  label: string;
  description: string;
  count: number;
  percent: number;
  color: string;
  bgColor: string;
  emoji: string;
}

function DonutChart({
  data,
  hovered,
  onHover,
}: {
  data: SentimentSlice[];
  hovered: string | null;
  onHover: (key: string | null) => void;
}) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 90;
  const innerR = 58;
  const gap = 2.5;

  let cumulative = 0;

  const slices = data.map((d) => {
    const startAngle = cumulative * 3.6 - 90;
    const endAngle = (cumulative + d.percent) * 3.6 - 90 - gap;
    cumulative += d.percent;
    return { ...d, startAngle, endAngle };
  });

  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number
  ) {
    const o1 = polarToCartesian(cx, cy, outerR, startAngle);
    const o2 = polarToCartesian(cx, cy, outerR, endAngle);
    const i1 = polarToCartesian(cx, cy, innerR, endAngle);
    const i2 = polarToCartesian(cx, cy, innerR, startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${i2.x} ${i2.y} Z`;
  }

  const active = data.find((d) => d.key === hovered) || data[0];

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="h-[170px] w-[170px] sm:h-[200px] sm:w-[200px]"
      >
        {slices.map((s) => {
          const isHovered = hovered === s.key;
          const scale = isHovered ? 1.04 : 1;

          return (
            <path
              key={s.key}
              d={arcPath(
                cx,
                cy,
                outerR,
                innerR,
                s.startAngle,
                s.endAngle
              )}
              fill={s.color}
              opacity={hovered && !isHovered ? 0.4 : 1}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: `${cx}px ${cy}px`,
                transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
                cursor: "pointer",
              }}
              onMouseEnter={() => onHover(s.key)}
              onMouseLeave={() => onHover(null)}
            />
          );
        })}

        <foreignObject x={cx - 44} y={cy - 44} width={88} height={88}>
          <div className="flex h-[88px] w-[88px] flex-col items-center justify-center">
            <div
              className={`mb-0.5 flex h-9 w-9 items-center justify-center rounded-lg ${active.bgColor}`}
            >
              <span className="text-lg">{active.emoji}</span>
            </div>

            <span
              className="text-xl font-bold"
              style={{ color: active.color }}
            >
              {active.percent}%
            </span>

            <span className="text-[10px] text-gray-400">{active.label}</span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function useCountUp(target: number, duration = 900, trigger = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, trigger, duration]);

  return val;
}

function SentimentRow({
  sentiment,
  isHovered,
  onHover,
  animate,
}: {
  sentiment: SentimentSlice;
  isHovered: boolean;
  onHover: (key: string | null) => void;
  animate: boolean;
}) {
  const count = useCountUp(sentiment.count, 900, animate);
  const percent = useCountUp(sentiment.percent, 900, animate);

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl px-1.5 py-2.5 transition-colors duration-200 sm:gap-4 sm:px-3 sm:py-3 ${
        isHovered ? "bg-gray-50" : "hover:bg-gray-50/70"
      }`}
      onMouseEnter={() => onHover(sentiment.key)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${sentiment.bgColor}`}
      >
        <span className="text-base sm:text-xl">{sentiment.emoji}</span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
          {sentiment.label}
        </p>
        <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">
          {sentiment.description}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p
          className="text-sm font-bold tabular-nums sm:text-lg"
          style={{ color: isHovered ? sentiment.color : "#111827" }}
        >
          {percent}%
        </p>
        <p className="text-[11px] tabular-nums text-gray-400 sm:text-xs">
          {count.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function SentimentChart() {
  const { dashboardData } = useDashboard();

  const [hovered, setHovered] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const distribution: Record<string, number> =
    dashboardData?.sentimentDistribution || {};

  const total = Object.values(distribution).reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  const sentiments: SentimentSlice[] = [
    {
      key: "positive",
      label: "Positive",
      description: "Satisfaction and happiness",
      count: distribution["Positive"] || 0,
      color: "#3b82f6",
      bgColor: "bg-blue-50",
      emoji: "😊",
    },
    {
      key: "neutral",
      label: "Neutral",
      description: "Mixed or neutral opinions",
      count: distribution["Neutral"] || 0,
      color: "#93c5fd",
      bgColor: "bg-blue-50",
      emoji: "😐",
    },
    {
      key: "negative",
      label: "Negative",
      description: "Dissatisfaction or frustration",
      count: distribution["Negative"] || 0,
      color: "#cbd5e1",
      bgColor: "bg-slate-50",
      emoji: "😟",
    },
  ].map((s) => ({
    ...s,
    percent: total === 0 ? 0 : Math.round((s.count / total) * 100),
  }));

  const animatedTotal = useCountUp(total, 1000, animate);

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6"
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h3 className="text-sm font-semibold text-gray-900">
          Sentiment Overview
        </h3>
      </div>

      <div className="flex flex-1 flex-col gap-6 min-w-0 xl:flex-row xl:items-center">
        <div className="flex justify-center xl:justify-start xl:shrink-0">
          <DonutChart data={sentiments} hovered={hovered} onHover={setHovered} />
        </div>

        <div className="w-full min-w-0 flex-1 divide-y divide-gray-100">
          {sentiments.map((s) => (
            <SentimentRow
              key={s.key}
              sentiment={s}
              isHovered={hovered === s.key}
              onHover={setHovered}
              animate={animate}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400 sm:text-sm">
          Total feedback:{" "}
          <span className="font-semibold text-gray-700">
            {animatedTotal.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}