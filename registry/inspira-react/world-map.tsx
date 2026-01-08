"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import DottedMap from "dotted-map";

interface Dot {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: Dot[];
  className?: string;
  lineColor?: string;
  mapColor?: string;
  mapBgColor?: string;
}

function projectPoint(lat: number, lng: number) {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
}

function createCurvedPath(dot: Dot): string {
  const start = projectPoint(dot.start.lat, dot.start.lng);
  const end = projectPoint(dot.end.lat, dot.end.lng);
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function WorldMap({
  dots = [],
  className,
  lineColor = "#0EA5E9",
  mapColor = "#4B5563",
  mapBgColor = "transparent",
}: WorldMapProps) {
  const svgMap = useMemo(() => {
    const DottedMapCtor = (DottedMap as any).default ?? DottedMap;
    const map = new DottedMapCtor({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: mapColor,
      shape: "circle",
      backgroundColor: mapBgColor,
    });
  }, [mapColor, mapBgColor]);

  return (
    <div
      className={cn(
        "relative aspect-[2/1] w-full rounded-lg bg-white font-sans dark:bg-black",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none size-full select-none [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 size-full select-none"
      >
        {/* Animated curved paths */}
        {dots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(dot)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: "easeOut",
              }}
            />
          </g>
        ))}

        <defs>
          <linearGradient
            id="path-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="white" stopOpacity={0} />
            <stop offset="5%" stopColor={lineColor} stopOpacity={1} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={1} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Dot markers with pulse animations */}
        {dots.map((dot, i) => {
          const startPt = projectPoint(dot.start.lat, dot.start.lng);
          const endPt = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              {/* Start point */}
              <g key={`start-${i}`}>
                <circle cx={startPt.x} cy={startPt.y} r={2} fill={lineColor} />
                <circle
                  cx={startPt.x}
                  cy={startPt.y}
                  r={2}
                  fill={lineColor}
                  opacity={0.5}
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              {/* End point */}
              <g key={`end-${i}`}>
                <circle cx={endPt.x} cy={endPt.y} r={2} fill={lineColor} />
                <circle
                  cx={endPt.x}
                  cy={endPt.y}
                  r={2}
                  fill={lineColor}
                  opacity={0.5}
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
