"use client";

import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { useDashboard } from "@/providers/dashboard-provider";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ISO2_TO_NUMERIC: Record<string, string> = {
  US: "840",
  IN: "356",
  GB: "826",
  CA: "124",
  AU: "036",
  DE: "276",
  BR: "076",
  FR: "250",
  JP: "392",
  ZA: "710",
};

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
}: any) {
  const count = useCountUp(item.count, 900, animate);
  const pct = useCountUp(item.percent, 900, animate);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-2 py-3 transition-all duration-200 ${isHighlighted ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
      onMouseEnter={() => onHover(item.name)}
      onMouseLeave={() => onHover(null)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="w-8 shrink-0 text-center text-2xl leading-none">
        {item.flag}
      </span>

      <span
        className={`flex-1 text-sm font-medium transition-colors ${isHighlighted ? "text-blue-700" : "text-gray-700"
          }`}
      >
        {item.name}
      </span>

      <span className="w-10 text-right text-sm font-semibold tabular-nums text-gray-800">
        {count}
      </span>

      <span
        className={`w-10 text-right text-sm font-medium tabular-nums transition-colors ${isHighlighted ? "text-blue-500" : "text-gray-400"
          }`}
      >
        {pct}%
      </span>
    </div>
  );
}

export default function ResponsesByLocation() {
  const { dashboardData } = useDashboard();

  const [tooltip, setTooltip] = useState<{
    name: string;
    count: number;
    percent: number;
    x: number;
    y: number;
  } | null>(null);

  const [hoveredCountry, setHoveredCountry] =
    useState<string | null>(null);

  const [animate, setAnimate] = useState(false);





  useEffect(() => {
    const t = setTimeout(
      () => setAnimate(true),
      300
    );

    return () => clearTimeout(t);
  }, []);

  const responseData =
    dashboardData?.ResponseByLocation || {};

  const totalResponses = Object.values(
    responseData
  ).reduce(
    (acc: number, curr: any) =>
      acc + curr.count,
    0
  );

  const COUNTRY_DATA: Record<
    string,
    {
      name: string;
      count: number;
      percent: number;
      flag: string;
      iso2: string;
    }
  > = {};

  Object.entries(responseData).forEach(
    ([iso2, value]: any) => {
      const numericId =
        ISO2_TO_NUMERIC[iso2];

      if (!numericId) return;

      COUNTRY_DATA[numericId] = {
        name: value.country,
        count: value.count,
        percent:
          totalResponses === 0
            ? 0
            : Math.round(
              (value.count /
                totalResponses) *
              100
            ),
        flag: value.flag,
        iso2,
      };
    }
  );

  const TOP_COUNTRIES = Object.values(
    COUNTRY_DATA
  )
    .sort(
      (a, b) =>
        b.count - a.count
    )
    .slice(0, 6);



  return (
    <div
      className="w-full"
      style={{
        fontFamily:
          "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-5 md:p-7">
        <div className="mb-4">
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
        <div className="relative mt-4 flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="relative min-h-[260px] flex-1 overflow-hidden rounded-2xl bg-linear-to-br from-slate-50 to-blue-50/30 sm:min-h-[320px] md:min-h-[360px]">
            <ComposableMap
              projectionConfig={{
                scale: 147,
                center: [10, 10],
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <ZoomableGroup
                zoom={1}
                minZoom={0.8}
                maxZoom={4}
              >
                <Geographies geography={GEO_URL}>
                  {({
                    geographies,
                  }) =>
                    geographies.map(
                      (geo) => {
                        const id =
                          geo.id as string;

                        const d =
                          COUNTRY_DATA[
                          id
                          ];

                        const isHovered =
                          hoveredCountry ===
                          d?.name;

                        const fill =
                          d
                            ? colorScale(
                              d.count
                            )
                            : "#e2e8f0";

                        return (
                          <Geography
                            key={
                              geo.rsmKey
                            }
                            geography={
                              geo
                            }
                            fill={
                              isHovered
                                ? "#1e40af"
                                : fill
                            }
                            stroke="#fff"
                            strokeWidth={
                              0.5
                            }
                            style={{
                              default:
                              {
                                outline:
                                  "none",
                                transition:
                                  "fill 0.2s",
                              },
                              hover:
                              {
                                outline:
                                  "none",
                                fill:
                                  d
                                    ? "#1e40af"
                                    : "#cbd5e1",
                                cursor:
                                  d
                                    ? "pointer"
                                    : "default",
                              },
                              pressed:
                              {
                                outline:
                                  "none",
                              },
                            }}
                            onMouseEnter={(
                              evt
                            ) => {
                              if (
                                d
                              ) {
                                const rect =
                                  (
                                    evt.target as SVGElement
                                  )
                                    .closest(
                                      "svg"
                                    )
                                    ?.getBoundingClientRect();

                                setTooltip(
                                  {
                                    name:
                                      d.name,
                                    count:
                                      d.count,
                                    percent:
                                      d.percent,
                                    x:
                                      evt.clientX -
                                      (rect?.left ??
                                        0),
                                    y:
                                      evt.clientY -
                                      (rect?.top ??
                                        0),
                                  }
                                );

                                setHoveredCountry(
                                  d.name
                                );
                              }
                            }}
                            onMouseLeave={() => {
                              setTooltip(
                                null
                              );

                              setHoveredCountry(
                                null
                              );
                            }}
                          />
                        );
                      }
                    )
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {tooltip && (
              <div
                className="pointer-events-none absolute z-20 whitespace-nowrap rounded-xl bg-gray-900 px-3 py-2 text-xs text-white shadow-xl"
                style={{
                  left:
                    tooltip.x +
                    12,
                  top:
                    tooltip.y -
                    40,
                  transform:
                    "translateX(-50%)",
                }}
              >
                <p className="font-semibold">
                  {tooltip.name}
                </p>

                <p className="text-gray-300">
                  {
                    tooltip.count
                  }{" "}
                  responses ·{" "}
                  {
                    tooltip.percent
                  }
                  %
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
                {[
                  "1",
                  "10",
                  "50",
                  "100+",
                ].map(
                  (l) => (
                    <span
                      key={l}
                      className="text-[10px] font-medium text-gray-400"
                    >
                      {l}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-gray-100 bg-gray-50/70 p-3 sm:p-4 lg:w-72">
            <p className="mb-1 px-2 text-sm font-semibold text-gray-700">
              Top Countries
            </p>

            <div className="divide-y divide-gray-100">
              {TOP_COUNTRIES.map(
                (
                  item,
                  i
                ) => (
                  <CountryRow
                    key={
                      item.name
                    }
                    item={item}
                    index={i}
                    animate={
                      animate
                    }
                    isHighlighted={
                      hoveredCountry ===
                      item.name
                    }
                    onHover={
                      setHoveredCountry
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}