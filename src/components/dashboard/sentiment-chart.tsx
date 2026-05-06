"use client";

import { useState, useEffect, useRef } from "react";

const DUMMY_DATA = {
    total: 1280,
    sentiments: [
        {
            key: "positive",
            label: "Positive",
            description: "Feelings of satisfaction and happiness",
            percent: 62,
            count: 794,
            color: "#4ade80",
            bgColor: "bg-green-50",
            iconColor: "text-green-500",
            stroke: "#4ade80",
            emoji: "😊",
        },
        {
            key: "neutral",
            label: "Neutral",
            description: "Mixed feelings or neutral opinions",
            percent: 25,
            count: 320,
            color: "#fbbf24",
            bgColor: "bg-yellow-50",
            iconColor: "text-yellow-400",
            stroke: "#fbbf24",
            emoji: "😐",
        },
        {
            key: "negative",
            label: "Negative",
            description: "Feelings of dissatisfaction or frustration",
            percent: 13,
            count: 166,
            color: "#f87171",
            bgColor: "bg-red-50",
            iconColor: "text-red-400",
            stroke: "#f87171",
            emoji: "😟",
        },
    ],
};
function DonutChart({
    data,
    hovered,
    onHover,
}: {
    data: typeof DUMMY_DATA.sentiments;
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
        const rad = ((angleDeg - 0) * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
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
        const o1 = polarToCartesian(cx, cy, outerR, startAngle);
        const o2 = polarToCartesian(cx, cy, outerR, endAngle);
        const i1 = polarToCartesian(cx, cy, innerR, endAngle);
        const i2 = polarToCartesian(cx, cy, innerR, startAngle);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        return `M ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${i2.x} ${i2.y} Z`;
    }

    const active = data.find((d) => d.key === hovered) ?? data[0];

    return (
        <div className="relative flex items-center justify-center">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="drop-shadow-sm"
            >
                {slices.map((s) => {
                    const isHovered = hovered === s.key;
                    const scale = isHovered ? 1.045 : 1;
                    return (
                        <path
                            key={s.key}
                            d={arcPath(cx, cy, outerR, innerR, s.startAngle, s.endAngle)}
                            fill={s.color}
                            opacity={hovered && !isHovered ? 0.45 : 1}
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: `${cx}px ${cy}px`,
                                transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
                                cursor: "pointer",
                                filter: isHovered
                                    ? `drop-shadow(0 4px 12px ${s.color}55)`
                                    : "none",
                            }}
                            onMouseEnter={() => onHover(s.key)}
                            onMouseLeave={() => onHover(null)}
                        />
                    );
                })}
<foreignObject x={cx - 44} y={cy - 44} width={88} height={88}>
                    <div
                        style={{ width: 88, height: 88 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center mb-0.5 transition-all duration-300 ${active.bgColor}`}
                        >
                            <span className="text-lg leading-none">{active.emoji}</span>
                        </div>
                        <span
                            className="text-xl font-bold leading-tight transition-all duration-300"
                            style={{ color: active.color }}
                        >
                            {active.percent}%
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium leading-tight">
                            {active.label}
                        </span>
                    </div>
                </foreignObject>
            </svg>
        </div>
    );
}
function useCountUp(target: number, duration = 900, trigger: boolean = true) {
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
    sentiment: (typeof DUMMY_DATA.sentiments)[0];
    isHovered: boolean;
    onHover: (key: string | null) => void;
    animate: boolean;
}) {
    const count = useCountUp(sentiment.count, 900, animate);
    const percent = useCountUp(sentiment.percent, 900, animate);

    return (
        <div
            className={`flex items-center gap-4 py-4 px-3 rounded-2xl cursor-pointer transition-all duration-200 ${isHovered ? "bg-gray-50 shadow-sm" : "hover:bg-gray-50/70"
                }`}
            onMouseEnter={() => onHover(sentiment.key)}
            onMouseLeave={() => onHover(null)}
        >
<div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 ${sentiment.bgColor} ${isHovered ? "scale-110" : ""}`}
            >
                <span className="text-xl">{sentiment.emoji}</span>
            </div>
<div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm leading-tight">
                    {sentiment.label}
                </p>
                <p className="text-gray-400 text-xs leading-snug mt-0.5">
                    {sentiment.description}
                </p>
            </div>
<div className="text-right shrink-0">
                <p
                    className="text-xl font-bold tabular-nums leading-tight"
                    style={{ color: isHovered ? sentiment.color : "#1e293b" }}
                >
                    {percent}%
                </p>
                <p className="text-xs text-gray-400 tabular-nums">{count.toLocaleString()}</p>
            </div>
        </div>
    );
}

export default function SentimentChart() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [animate, setAnimate] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const total = useCountUp(DUMMY_DATA.total, 1000, animate);

    return (

        <div
            ref={ref}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 w-full max-w-2xl"
            style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        >
<div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                        Sentiment Overview
                    </h2>
                    <button
                        title="Info"
                        className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-xs flex items-center justify-center hover:border-gray-400 hover:text-gray-500 transition-colors"
                    >
                        i
                    </button>
                </div>
                <button className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition-colors">
                    View all
                </button>
            </div>
<div className="flex flex-col sm:flex-row gap-6 items-center">
<div className="shrink-0">
                    <DonutChart
                        data={DUMMY_DATA.sentiments}
                        hovered={hovered}
                        onHover={setHovered}
                    />
                </div>
<div className="flex-1 w-full divide-y divide-gray-100">
                    {DUMMY_DATA.sentiments.map((s) => (
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
<div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                    Total feedback:{" "}
                    <span className="font-semibold text-gray-600 tabular-nums">
                        {total.toLocaleString()}
                    </span>
                </p>
            </div>
        </div>
    );
}