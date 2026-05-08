"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const COUNTRY_DATA: Record<
  string,
  { name: string; count: number; percent: number; flag: string; iso2: string }
> = {
  "840": {
    name: "United States",
    count: 128,
    percent: 28,
    flag: "🇺🇸",
    iso2: "US",
  },
  "356": {
    name: "India",
    count: 96,
    percent: 21,
    flag: "🇮🇳",
    iso2: "IN",
  },
  "826": {
    name: "United Kingdom",
    count: 64,
    percent: 14,
    flag: "🇬🇧",
    iso2: "GB",
  },
  "124": {
    name: "Canada",
    count: 48,
    percent: 10,
    flag: "🇨🇦",
    iso2: "CA",
  },
  "036": {
    name: "Australia",
    count: 32,
    percent: 7,
    flag: "🇦🇺",
    iso2: "AU",
  },
  "276": {
    name: "Germany",
    count: 18,
    percent: 4,
    flag: "🇩🇪",
    iso2: "DE",
  },
  "076": {
    name: "Brazil",
    count: 22,
    percent: 5,
    flag: "🇧🇷",
    iso2: "BR",
  },
  "250": {
    name: "France",
    count: 14,
    percent: 3,
    flag: "🇫🇷",
    iso2: "FR",
  },
  "392": {
    name: "Japan",
    count: 12,
    percent: 3,
    flag: "🇯🇵",
    iso2: "JP",
  },
  "710": {
    name: "South Africa",
    count: 8,
    percent: 2,
    flag: "🇿🇦",
    iso2: "ZA",
  },
};

const TOP_COUNTRIES = [
  { name: "United States", count: 128, percent: 28, flag: "🇺🇸" },
  { name: "India", count: 96, percent: 21, flag: "🇮🇳" },
  { name: "United Kingdom", count: 64, percent: 14, flag: "🇬🇧" },
  { name: "Canada", count: 48, percent: 10, flag: "🇨🇦" },
  { name: "Australia", count: 32, percent: 7, flag: "🇦🇺" },
  { name: "Others", count: 92, percent: 20, flag: "🌐" },
];

const colorScale = scaleLinear<string>()
  .domain([0, 20, 60, 128])
  .range(["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"]);

function useCountUp(target: number, duration = 800, trigger = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;

    const step = (ts: number) => {
      if (!start) start = ts;

      const p = Math.min((ts - start) / duration, 1);

      setVal(Math.floor(p * target));

      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, trigger, duration]);

  return val;
}

function CountryRow({
  item,
  index,
  animate,
  isHighlighted,
  onHover,
}: {
  item: (typeof TOP_COUNTRIES)[0];
  index: number;
  animate: boolean;
  isHighlighted: boolean;
  onHover: (name: string | null) => void;
}) {
  const count = useCountUp(item.count, 900, animate);
  const pct = useCountUp(item.percent, 900, animate);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-2 py-3 transition-all duration-200 ${
        isHighlighted ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="w-8 shrink-0 text-center text-2xl leading-none">
        {item.flag}
      </span>

      <span
        className={`flex-1 text-sm font-medium transition-colors ${
          isHighlighted ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {item.name}
      </span>

      <span className="w-10 text-right text-sm font-semibold tabular-nums text-gray-800">
        {count}
      </span>

      <span
        className={`w-10 text-right text-sm font-medium tabular-nums transition-colors ${
          isHighlighted ? "text-blue-500" : "text-gray-400"
        }`}
      >
        {pct}%
      </span>
    </div>
  );
}

export default function ResponsesByLocation() {
  const [tooltip, setTooltip] = useState<{
    name: string;
    count: number;
    percent: number;
    x: number;
    y: number;
  } | null>(null);

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const [animate, setAnimate] = useState(false);

  const [filter, setFilter] = useState("All Countries");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);

    return () => clearTimeout(t);
  }, []);

  const filterOptions = [
    "All Countries",
    "Top 5 Only",
    "Americas",
    "Europe",
    "Asia-Pacific",
  ];

  return (
    <div
      className="w-full"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-5 md:p-7">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                Responses by Location
              </h2>

              <button className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-400 transition-colors hover:border-gray-400">
                i
              </button>
            </div>

            <p className="mt-0.5 text-sm text-gray-400">
              See where your feedback is coming from.
            </p>
          </div>

          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <span className="text-base">🌐</span>
                {filter}
              </span>

              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-11 z-10 min-w-[180px] rounded-2xl border border-gray-100 bg-white py-1 shadow-lg">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      filter === opt
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-4 flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 to-blue-50/30 sm:min-h-[320px] md:min-h-[360px]">
            <ComposableMap
              projectionConfig={{ scale: 147, center: [10, 10] }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={4}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = geo.id as string;
                      const d = COUNTRY_DATA[id];

                      const isHovered = hoveredCountry === d?.name;

                      const fill = d
                        ? colorScale(d.count)
                        : "#e2e8f0";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isHovered ? "#1e40af" : fill}
                          stroke="#fff"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              outline: "none",
                              transition: "fill 0.2s",
                            },
                            hover: {
                              outline: "none",
                              fill: d ? "#1e40af" : "#cbd5e1",
                              cursor: d ? "pointer" : "default",
                            },
                            pressed: {
                              outline: "none",
                            },
                          }}
                          onMouseEnter={(evt) => {
                            if (d) {
                              const rect = (
                                evt.target as SVGElement
                              )
                                .closest("svg")
                                ?.getBoundingClientRect();

                              setTooltip({
                                name: d.name,
                                count: d.count,
                                percent: d.percent,
                                x: evt.clientX - (rect?.left ?? 0),
                                y: evt.clientY - (rect?.top ?? 0),
                              });

                              setHoveredCountry(d.name);
                            }
                          }}
                          onMouseLeave={() => {
                            setTooltip(null);
                            setHoveredCountry(null);
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {tooltip && (
              <div
                className="pointer-events-none absolute z-20 whitespace-nowrap rounded-xl bg-gray-900 px-3 py-2 text-xs text-white shadow-xl"
                style={{
                  left: tooltip.x + 12,
                  top: tooltip.y - 40,
                  transform: "translateX(-50%)",
                }}
              >
                <p className="font-semibold">{tooltip.name}</p>

                <p className="text-gray-300">
                  {tooltip.count} responses · {tooltip.percent}%
                </p>
              </div>
            )}

            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
              <div
                className="h-2.5 w-36 rounded-full sm:w-44"
                style={{
                  background:
                    "linear-gradient(to right, #dbeafe, #93c5fd, #3b82f6, #1d4ed8)",
                }}
              />

              <div className="mt-1 flex justify-between">
                {["1", "10", "50", "100+"].map((l) => (
                  <span
                    key={l}
                    className="text-[10px] font-medium text-gray-400"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4 lg:w-72">
            <p className="mb-1 px-2 text-sm font-semibold text-gray-700">
              Top Countries
            </p>

            <div className="divide-y divide-gray-100">
              {TOP_COUNTRIES.map((item, i) => (
                <CountryRow
                  key={item.name}
                  item={item}
                  index={i}
                  animate={animate}
                  isHighlighted={hoveredCountry === item.name}
                  onHover={setHoveredCountry}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50 px-3 py-3 sm:items-center sm:px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-100">
            <svg
              className="h-4 w-4 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            Responses from{" "}
            <span className="font-semibold text-gray-800">
              United States
            </span>{" "}
            increased by{" "}
            <span className="font-bold text-green-600">16%</span>{" "}
            compared to Apr 12 – May 11.
          </p>
        </div>
      </div>
    </div>
  );
}