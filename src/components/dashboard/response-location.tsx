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
  "840": { name: "United States", count: 128, percent: 28, flag: "🇺🇸", iso2: "US" },
  "356": { name: "India", count: 96, percent: 21, flag: "🇮🇳", iso2: "IN" },
  "826": { name: "United Kingdom", count: 64, percent: 14, flag: "🇬🇧", iso2: "GB" },
  "124": { name: "Canada", count: 48, percent: 10, flag: "🇨🇦", iso2: "CA" },
  "036": { name: "Australia", count: 32, percent: 7, flag: "🇦🇺", iso2: "AU" },
  "276": { name: "Germany", count: 18, percent: 4, flag: "🇩🇪", iso2: "DE" },
  "076": { name: "Brazil", count: 22, percent: 5, flag: "🇧🇷", iso2: "BR" },
  "250": { name: "France", count: 14, percent: 3, flag: "🇫🇷", iso2: "FR" },
  "392": { name: "Japan", count: 12, percent: 3, flag: "🇯🇵", iso2: "JP" },
  "710": { name: "South Africa", count: 8, percent: 2, flag: "🇿🇦", iso2: "ZA" },
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
      className={`flex items-center gap-3 py-3 px-2 rounded-xl cursor-pointer transition-all duration-200 ${
        isHighlighted ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="text-2xl leading-none w-8 text-center shrink-0">
        {item.flag}
      </span>
      <span
        className={`flex-1 text-sm font-medium transition-colors ${
          isHighlighted ? "text-blue-700" : "text-gray-700"
        }`}
      >
        {item.name}
      </span>
      <span className="text-sm font-semibold text-gray-800 tabular-nums w-10 text-right">
        {count}
      </span>
      <span
        className={`text-sm tabular-nums w-10 text-right font-medium transition-colors ${
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

  const filterOptions = ["All Countries", "Top 5 Only", "Americas", "Europe", "Asia-Pacific"];

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <div className="bg-white h-screen rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 w-full max-w-5xl">
        
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Responses by Location
              </h2>
              <button className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-xs flex items-center justify-center hover:border-gray-400 transition-colors">
                i
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-0.5">
              See where your feedback is coming from.
            </p>
          </div>
<div className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <span className="text-base">🌐</span>
              {filter}
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-11 bg-white border border-gray-100 rounded-2xl shadow-lg py-1 z-10 min-w-[180px]">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setFilter(opt); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      filter === opt
                        ? "text-blue-600 bg-blue-50 font-semibold"
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
<div className="flex flex-col lg:flex-row gap-6 mt-4 relative">
<div className="flex-1 relative rounded-2xl overflow-hidden bg-linear-to-br from-slate-50 to-blue-50/30 min-h-[360px]">
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
                            default: { outline: "none", transition: "fill 0.2s" },
                            hover: {
                              outline: "none",
                              fill: d ? "#1e40af" : "#cbd5e1",
                              cursor: d ? "pointer" : "default",
                            },
                            pressed: { outline: "none" },
                          }}
                          onMouseEnter={(evt) => {
                            if (d) {
                              const rect = (evt.target as SVGElement)
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
                className="absolute pointer-events-none bg-gray-900 text-white text-xs rounded-xl px-3 py-2 shadow-xl z-20 whitespace-nowrap"
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
<div className="absolute bottom-4 left-4">
              <div
                className="h-2.5 w-44 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #dbeafe, #93c5fd, #3b82f6, #1d4ed8)",
                }}
              />
              <div className="flex justify-between mt-1">
                {["1", "10", "50", "100+"].map((l) => (
                  <span key={l} className="text-[10px] text-gray-400 font-medium">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
<div className="lg:w-72 bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-1 px-2">
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
<div className="mt-5 flex items-center gap-3 bg-green-50 rounded-2xl px-4 py-3 border border-green-100">
          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Responses from <span className="font-semibold text-gray-800">United States</span> increased by{" "}
            <span className="font-bold text-green-600">16%</span> compared to Apr 12 – May 11.
          </p>
        </div>
      </div>
    </div>
  );
}