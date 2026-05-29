"use client";

import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/providers/dashboard-provider";

function DonutChart({
  data,
  hovered,
  onHover,
}: {
  data: any[];
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
    const startAngle =
      cumulative * 3.6 - 90;

    const endAngle =
      (cumulative +
        d.percent) *
        3.6 -
      90 -
      gap;

    cumulative +=
      d.percent;

    return {
      ...d,
      startAngle,
      endAngle,
    };
  });

  function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angleDeg: number
  ) {
    const rad =
      (angleDeg *
        Math.PI) /
      180;

    return {
      x:
        cx +
        r *
          Math.cos(
            rad
          ),
      y:
        cy +
        r *
          Math.sin(
            rad
          ),
    };
  }

  function arcPath(
    cx: number,
    cy: number,
    outerR: number,
    innerR: number,
    startAngle: number,
    endAngle: number
  ) {
    const o1 =
      polarToCartesian(
        cx,
        cy,
        outerR,
        startAngle
      );

    const o2 =
      polarToCartesian(
        cx,
        cy,
        outerR,
        endAngle
      );

    const i1 =
      polarToCartesian(
        cx,
        cy,
        innerR,
        endAngle
      );

    const i2 =
      polarToCartesian(
        cx,
        cy,
        innerR,
        startAngle
      );

    const largeArc =
      endAngle -
        startAngle >
      180
        ? 1
        : 0;

    return `M ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${i2.x} ${i2.y} Z`;
  }

  const active =
    data.find(
      (d) =>
        d.key ===
        hovered
    ) || data[0];

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="h-[190px] w-[190px] drop-shadow-sm sm:h-[220px] sm:w-[220px]"
      >
        {slices.map(
          (s) => {
            const isHovered =
              hovered ===
              s.key;

            const scale =
              isHovered
                ? 1.045
                : 1;

            return (
              <path
                key={
                  s.key
                }
                d={arcPath(
                  cx,
                  cy,
                  outerR,
                  innerR,
                  s.startAngle,
                  s.endAngle
                )}
                fill={
                  s.color
                }
                opacity={
                  hovered &&
                  !isHovered
                    ? 0.45
                    : 1
                }
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: `${cx}px ${cy}px`,
                  transition:
                    "all 0.22s cubic-bezier(.4,0,.2,1)",
                  cursor:
                    "pointer",
                }}
                onMouseEnter={() =>
                  onHover(
                    s.key
                  )
                }
                onMouseLeave={() =>
                  onHover(
                    null
                  )
                }
              />
            );
          }
        )}

        <foreignObject
          x={cx - 44}
          y={cy - 44}
          width={88}
          height={88}
        >
          <div className="flex h-[88px] w-[88px] flex-col items-center justify-center">
            <div
              className={`mb-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${active.bgColor}`}
            >
              <span className="text-lg">
                {
                  active.emoji
                }
              </span>
            </div>

            <span
              className="text-xl font-bold"
              style={{
                color:
                  active.color,
              }}
            >
              {
                active.percent
              }
              %
            </span>

            <span className="text-[10px] text-gray-400">
              {
                active.label
              }
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

function useCountUp(
  target: number,
  duration = 900,
  trigger = true
) {
  const [val, setVal] =
    useState(0);

  useEffect(() => {
    if (!trigger)
      return;

    let start:
      | number
      | null =
      null;

    const step = (
      timestamp: number
    ) => {
      if (!start)
        start =
          timestamp;

      const progress =
        Math.min(
          (timestamp -
            start) /
            duration,
          1
        );

      setVal(
        Math.floor(
          progress *
            target
        )
      );

      if (
        progress <
        1
      ) {
        requestAnimationFrame(
          step
        );
      }
    };

    requestAnimationFrame(
      step
    );
  }, [
    target,
    trigger,
    duration,
  ]);

  return val;
}

function SentimentRow({
  sentiment,
  isHovered,
  onHover,
  animate,
}: any) {
  const count =
    useCountUp(
      sentiment.count,
      900,
      animate
    );

  const percent =
    useCountUp(
      sentiment.percent,
      900,
      animate
    );

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl px-2 py-3 transition-all duration-200 sm:gap-4 sm:px-3 sm:py-4 ${
        isHovered
          ? "bg-gray-50 shadow-sm"
          : "hover:bg-gray-50/70"
      }`}
      onMouseEnter={() =>
        onHover(
          sentiment.key
        )
      }
      onMouseLeave={() =>
        onHover(
          null
        )
      }
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl sm:h-11 sm:w-11 ${sentiment.bgColor}`}
      >
        <span className="text-lg sm:text-xl">
          {
            sentiment.emoji
          }
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800">
          {
            sentiment.label
          }
        </p>

        <p className="mt-0.5 text-xs text-gray-400">
          {
            sentiment.description
          }
        </p>
      </div>

      <div className="text-right">
        <p
          className="text-lg font-bold sm:text-xl"
          style={{
            color:
              isHovered
                ? sentiment.color
                : "#1e293b",
          }}
        >
          {percent}%
        </p>

        <p className="text-xs text-gray-400">
          {count.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function SentimentChart() {
  const {
    dashboardData,
  } =
    useDashboard();

  const [hovered, setHovered] =
    useState<string | null>(
      null
    );

  const [animate, setAnimate] =
    useState(false);

  const ref =
    useRef<HTMLDivElement>(
      null
    );

  useEffect(() => {
    const timer =
      setTimeout(
        () =>
          setAnimate(
            true
          ),
        200
      );

    return () =>
      clearTimeout(
        timer
      );
  }, []);

  const distribution =
    dashboardData?.sentimentDistribution ||
    {};

  const total =
    Object.values(
      distribution
    ).reduce(
      (
        acc: number,
        curr: any
      ) =>
        acc +
        curr,
      0
    );

  const sentiments = [
    {
      key: "positive",
      label:
        "Positive",
      description:
        "Feelings of satisfaction and happiness",
      count:
        distribution[
          "Positive"
        ] || 0,
      color:
        "#4ade80",
      bgColor:
        "bg-green-50",
      emoji: "😊",
    },
    {
      key: "neutral",
      label:
        "Neutral",
      description:
        "Mixed feelings or neutral opinions",
      count:
        distribution[
          "Neutral"
        ] || 0,
      color:
        "#fbbf24",
      bgColor:
        "bg-yellow-50",
      emoji: "😐",
    },
    {
      key: "negative",
      label:
        "Negative",
      description:
        "Feelings of dissatisfaction or frustration",
      count:
        distribution[
          "Negative"
        ] || 0,
      color:
        "#f87171",
      bgColor:
        "bg-red-50",
      emoji: "😟",
    },
  ].map((s) => ({
    ...s,
    percent:
      total === 0
        ? 0
        : Math.round(
            (s.count /
              total) *
              100
          ),
  }));

  const animatedTotal =
    useCountUp(
      total,
      1000,
      animate
    );

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-5 md:p-7"
    >
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
            Sentiment Overview
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <DonutChart
            data={
              sentiments
            }
            hovered={
              hovered
            }
            onHover={
              setHovered
            }
          />
        </div>

        <div className="w-full flex-1 divide-y divide-gray-100">
          {sentiments.map(
            (s) => (
              <SentimentRow
                key={
                  s.key
                }
                sentiment={
                  s
                }
                isHovered={
                  hovered ===
                  s.key
                }
                onHover={
                  setHovered
                }
                animate={
                  animate
                }
              />
            )
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-400">
          Total feedback:{" "}
          <span className="font-semibold text-gray-600">
            {animatedTotal.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}