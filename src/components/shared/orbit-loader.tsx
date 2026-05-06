"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type IconItem = {
  id: number;
  angle: number;
  color: string;
  border: string;
  dot: string;
  dotAngle: number;
  icon: React.ReactNode;
};

const icons: IconItem[] = [
  {
    id: 1,
    angle: 315,
    color: "bg-green-50",
    border: "border-green-100",
    dot: "bg-green-500",
    dotAngle: 270,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polyline
          points="3,17 9,11 13,15 21,7"
          stroke="#22c55e"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="15,7 21,7 21,13"
          stroke="#22c55e"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    angle: 30,
    color: "bg-indigo-50",
    border: "border-indigo-100",
    dot: "bg-indigo-600",
    dotAngle: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 3,
    angle: 90,
    color: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-violet-500",
    dotAngle: 70,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    angle: 155,
    color: "bg-yellow-50",
    border: "border-yellow-100",
    dot: "bg-yellow-400",
    dotAngle: 130,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 5,
    angle: 210,
    color: "bg-purple-50",
    border: "border-purple-100",
    dot: "bg-blue-400",
    dotAngle: 185,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect
          x="3"
          y="12"
          width="4"
          height="9"
          rx="1"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="7"
          width="4"
          height="14"
          rx="1"
          stroke="#7c3aed"
          strokeWidth="2"
        />
        <rect
          x="17"
          y="4"
          width="4"
          height="17"
          rx="1"
          stroke="#7c3aed"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 6,
    angle: 255,
    color: "bg-blue-50",
    border: "border-blue-100",
    dot: "bg-green-500",
    dotAngle: 240,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="9"
          y="3"
          width="6"
          height="4"
          rx="1"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <line
          x1="9"
          y1="12"
          x2="15"
          y2="12"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="16"
          x2="13"
          y2="16"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;

  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

const dotColorMap: Record<string, string> = {
  "bg-green-500": "#22c55e",
  "bg-indigo-600": "#4f46e5",
  "bg-violet-500": "#8b5cf6",
  "bg-yellow-400": "#facc15",
  "bg-blue-400": "#60a5fa",
  "bg-green-500-2": "#22c55e",
};

export default function OrbitLoader() {
  const [rotation, setRotation] = useState<number>(0);
  const [pulse, setPulse] = useState<boolean>(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const speed = 0.025;

    function animate(ts: number) {
      if (start === null) {
        start = ts;
      }

      const elapsed = ts - start;

      setRotation((elapsed * speed) % 360);

      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const cx = 200;
  const cy = 200;
  const orbitR = 130;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 400, height: 400 }}
      >
        
        <svg
          width="400"
          height="400"
          className="absolute inset-0"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "200px 200px",
          }}
        >
        
          {[40, 70, 100, 130].map((r, i) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={`rgba(139,120,221,${0.07 + i * 0.03})`}
              strokeWidth="1"
            />
          ))}

        
          <circle
            cx={cx}
            cy={cy}
            r={orbitR}
            fill="none"
            stroke="rgba(139,120,221,0.18)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

         
          {icons.map((item) => {
            const pos = polarToCartesian(
              cx,
              cy,
              orbitR,
              item.dotAngle
            );

            return (
              <circle
                key={`dot-${item.id}`}
                cx={pos.x}
                cy={pos.y}
                r="5"
                style={{
                  fill: dotColorMap[item.dot],
                }}
              />
            );
          })}
        </svg>

       
        {icons.map((item) => {
          const pos = polarToCartesian(
            cx,
            cy,
            orbitR,
            item.angle + rotation
          );

          return (
            <div
              key={item.id}
              className={`absolute flex items-center justify-center w-12 h-12 rounded-2xl border shadow-sm ${item.color} ${item.border}`}
              style={{
                left: pos.x - 24,
                top: pos.y - 24,
                boxShadow: "0 2px 12px rgba(99,102,241,0.10)",
                transition: "box-shadow 0.2s",
              }}
            >
              {item.icon}
            </div>
          );
        })}

      
        <div
          className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl"
          style={{
            boxShadow: `0 0 0 ${
              pulse ? 18 : 10
            }px rgba(139,120,221,0.08), 0 4px 32px rgba(99,102,241,0.18)`,
            transition: "box-shadow 0.5s",
          }}
        >
          <Image
            src={'/emblem-transparent.png'}
            alt="auric"
            width={36}
            height={36}
          />
        </div>
      </div>
    </div>
  );
}