"use client";

import { useRef } from "react";
import SvgDrawOnScroll from "./svg-draw-on-scroll";

const ROUTE =
  "M 60 20 C 60 90, 340 80, 330 160 S 70 230, 80 310 S 330 370, 320 450 S 120 520, 200 580";

const STOPS = [
  { label: "Trailhead · 0 km", top: "2%", left: "4%" },
  { label: "Lake Sorapis · 6.2 km", top: "26%", right: "2%" },
  { label: "Forcella Marcuoira · 11 km", top: "50%", left: "2%" },
  { label: "Summit hut · 18.4 km", top: "94%", left: "56%" },
];

export default function SvgDrawOnScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[560px] w-full overflow-y-auto overscroll-contain"
      ref={scrollRef}
    >
      <div className="mx-auto flex h-[380px] max-w-md flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
          Day 3 · Dolomites
        </p>
        <h3 className="mt-2 font-semibold text-3xl text-foreground">
          The long way to the hut
        </h3>
        <p className="mt-3 text-muted-foreground text-sm">Scroll to walk the route ↓</p>
      </div>

      <div className="relative mx-auto h-[640px] w-full max-w-md">
        <SvgDrawOnScroll
          className="h-full w-full text-foreground"
          container={scrollRef}
          marker={
            <span className="block size-4 rounded-full border-2 border-background bg-[oklch(0.72_0.2_352.53)] shadow-[0_0_0_6px_color-mix(in_oklab,oklch(0.72_0.2_352.53)_30%,transparent)]" />
          }
          offset={["start 0.85", "end 0.75"]}
          path={ROUTE}
          strokeWidth={3}
          viewBox="0 0 400 600"
        />
        {STOPS.map((stop) => (
          <span
            className="absolute rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground"
            key={stop.label}
            style={{ left: stop.left, right: stop.right, top: stop.top }}
          >
            {stop.label}
          </span>
        ))}
      </div>

      <div className="flex h-[360px] items-center justify-center text-muted-foreground text-sm">
        18.4 km · 1,240 m elevation gain · 7h 10m
      </div>
    </div>
  );
}
